import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { generateCoverLetter } from "@/lib/claude"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── Helpers ──────────────────────────────────────────────────────────────────

function computeMatchScore(cvText: string, jdText: string): number {
  const STOP = new Set(["with","that","this","have","from","they","will","your","been","than","more","were","what","when","also","into","each","which","their","there","these","those","would","about","after","other","could","where","every","through","within","between","during","because","without","before","following","should","using","must","able","make","work","across","some","very","well","good","team","role"])
  const jdWords = jdText.toLowerCase().match(/\b[a-z]{4,}\b/g) ?? []
  const cvLower = cvText.toLowerCase()
  const unique = [...new Set(jdWords)].filter(w => !STOP.has(w))
  if (unique.length === 0) return 68
  const matched = unique.filter(w => cvLower.includes(w))
  return Math.min(94, Math.max(48, Math.round(48 + (matched.length / unique.length) * 46)))
}

async function generateAnalysis(cvText: string, jdText: string) {
  try {
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 700,
      messages: [{
        role: "user",
        content: `Analyze this candidate's CV against the job description. Return ONLY valid JSON (no markdown, no explanation):
{
  "strengths": ["specific strength from CV matching JD", "another strength"],
  "gaps": ["specific gap or missing requirement", "another gap"],
  "recruiterPov": "2-3 sentence paragraph from a recruiter's perspective: what stands out, what's missing, and what would increase their chances. Be honest, professional, and specific to the actual CV and JD.",
  "optimizedFor": ["skill1", "skill2", "skill3", "skill4"]
}

Rules:
- strengths: 2-4 bullets, specific and evidence-based from the CV
- gaps: 2-3 bullets, specific things missing relative to the JD
- recruiterPov: honest, direct, professional — reference actual details from both documents
- optimizedFor: 3-4 key skills/requirements from the JD

CV:\n${cvText.slice(0, 2500)}\n\nJob Description:\n${jdText.slice(0, 2500)}`,
      }],
    })
    const raw = msg.content[0].type === "text" ? msg.content[0].text.trim() : "{}"
    const start = raw.indexOf("{")
    const end = raw.lastIndexOf("}") + 1
    return JSON.parse(start >= 0 ? raw.slice(start, end) : "{}")
  } catch {
    return { strengths: [], gaps: [], recruiterPov: "", optimizedFor: [] }
  }
}

async function assertAccess(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { plan: true, role: true, trialEndsAt: true },
  })
  if (!user) return false
  const isAdmin = user.role === "admin"
  const isPro = user.plan === "pro"
  const isTrial = user.plan === "trial"
  const trialExpired = isTrial && user.trialEndsAt && new Date(user.trialEndsAt) < new Date()
  return isAdmin || isPro || (isTrial && !trialExpired)
}

// ─── Route ────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const action = body.action ?? "generate"

  // ── Extract insights (no plan gate — free users see the hook)
  if (action === "extract") {
    const { jobDescription } = body as { jobDescription: string }
    if (!jobDescription?.trim()) return NextResponse.json({ error: "Job description required" }, { status: 400 })
    try {
      const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 250,
        messages: [{
          role: "user",
          content: `Extract from this job description: company name, job title, and top 5 key technical/professional skills. Return ONLY valid JSON: {"company":"...","role":"...","skills":["...","...","...","...","..."]}. Use empty string if not found. Prefer specific skills over generic ones.\n\n${jobDescription.slice(0, 3000)}`,
        }],
      })
      const raw = msg.content[0].type === "text" ? msg.content[0].text.trim() : "{}"
      const start = raw.indexOf("{"); const end = raw.lastIndexOf("}") + 1
      const insights = JSON.parse(start >= 0 ? raw.slice(start, end) : "{}")
      return NextResponse.json({ insights: { company: "", role: "", skills: [], ...insights } })
    } catch {
      return NextResponse.json({ insights: { company: "", role: "", skills: [] } })
    }
  }

  // ── Generate letter + analysis (plan gated)
  if (action === "generate") {
    const { jobDescription, analysisId, company, role: jobRole } = body as { jobDescription: string; analysisId?: string; company?: string; role?: string }
    if (!jobDescription?.trim()) return NextResponse.json({ error: "Job description required" }, { status: 400 })

    const hasAccess = await assertAccess(session.user.id)
    if (!hasAccess) return NextResponse.json({ error: "Pro feature" }, { status: 402 })

    const analysis = await prisma.analysis.findFirst({
      where: analysisId
        ? { id: analysisId, userId: session.user.id }
        : { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: { cvText: true },
    })
    const cvText = analysis?.cvText ?? ""
    if (!cvText) return NextResponse.json({ error: "No CV found — please run an analysis first" }, { status: 400 })

    // Run letter generation + analysis in parallel for speed
    const [letter, letterAnalysis] = await Promise.all([
      generateCoverLetter(cvText, jobDescription, session.user.name ?? ""),
      generateAnalysis(cvText, jobDescription),
    ])

    const matchScore = computeMatchScore(cvText, jobDescription)

    // Auto-save cover letter (fire-and-forget)
    const { randomBytes } = await import("crypto")
    const clId = randomBytes(12).toString("base64url")
    const clTitle = [jobRole, company].filter(Boolean).join(" @ ") || "Cover Letter"
    prisma.coverLetter.create({
      data: { id: clId, userId: session.user.id, title: clTitle, company: company ?? "", role: jobRole ?? "", content: letter },
    }).catch(() => {})

    return NextResponse.json({
      letter,
      matchScore,
      strengths: letterAnalysis.strengths ?? [],
      gaps: letterAnalysis.gaps ?? [],
      recruiterPov: letterAnalysis.recruiterPov ?? "",
      optimizedFor: letterAnalysis.optimizedFor ?? [],
    })
  }

  // ── Improve letter (plan gated)
  if (action === "improve") {
    const { letter, type, jobDescription } = body as { letter: string; type: string; jobDescription?: string }
    if (!letter?.trim() || !type) return NextResponse.json({ error: "Letter and type required" }, { status: 400 })

    const hasAccess = await assertAccess(session.user.id)
    if (!hasAccess) return NextResponse.json({ error: "Pro feature" }, { status: 402 })

    const jdContext = jobDescription ? `\n\nJob Description:\n${jobDescription.slice(0, 1500)}` : ""

    const prompts: Record<string, string> = {
      match: `Rewrite this cover letter to better match the job requirements. Naturally weave in more of the key skills, qualifications and keywords from the job description. Keep the same length and structure.${jdContext}\n\nReturn ONLY the improved letter, no commentary.`,
      impact: `Rewrite this cover letter to add specific, quantified achievements. Replace vague statements with concrete metrics and outcomes (e.g. "increased conversion by 23%", "led team of 12", "reduced costs by £50k"). If exact numbers aren't available, use realistic estimates that sound credible. Return ONLY the improved letter.`,
      tailored: `Rewrite this cover letter to feel specifically written for this company — not a generic template. Reference the company's domain, industry challenges, or likely mission. Make every paragraph feel intentional and researched.${jdContext}\n\nReturn ONLY the improved letter.`,
      recruiter: `Rewrite this cover letter to immediately grab a recruiter's attention. Make the opening line impossible to skip. Lead with the single strongest qualification. Articulate clear value in the first paragraph. Remove filler, weak phrases ("I believe", "I think I could"), and generic statements. Return ONLY the improved letter.`,
    }

    const prompt = prompts[type]
    if (!prompt) return NextResponse.json({ error: "Unknown improvement type" }, { status: 400 })

    try {
      const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 800,
        messages: [{ role: "user", content: `${prompt}\n\nLetter:\n${letter}` }],
      })
      const improved = msg.content[0].type === "text" ? msg.content[0].text.trim() : letter
      return NextResponse.json({ letter: improved })
    } catch {
      return NextResponse.json({ error: "Improvement failed" }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 })
}
