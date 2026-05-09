import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

  const hasAccess = await assertAccess(session.user.id)
  if (!hasAccess) return NextResponse.json({ error: "Pro feature" }, { status: 402 })

  const body = await req.json()
  const action = body.action ?? "analyze"

  // ── Analyze profile ────────────────────────────────────────────────────────
  if (action === "analyze") {
    const { headline, about, experience } = body as {
      headline: string
      about: string
      experience?: string
    }

    if (!headline?.trim() && !about?.trim()) {
      return NextResponse.json({ error: "Headline or about section required" }, { status: 400 })
    }

    const profileText = [
      headline ? `Headline: ${headline}` : "",
      about ? `About: ${about}` : "",
      experience ? `Experience: ${experience}` : "",
    ].filter(Boolean).join("\n\n")

    try {
      const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 800,
        messages: [{
          role: "user",
          content: `You are an expert LinkedIn profile optimizer and recruiter. Analyze this LinkedIn profile and return ONLY valid JSON (no markdown):
{
  "score": <integer 0-100, based on: headline specificity, about section quality, measurable achievements, keyword richness, recruiter appeal>,
  "strengths": ["specific strength 1", "specific strength 2"],
  "gaps": ["specific gap 1", "specific gap 2", "specific gap 3"],
  "recruiterPov": "2-3 sentence honest recruiter perspective on this profile",
  "optimizedFor": ["detected skill/keyword 1", "detected skill/keyword 2"]
}

Profile:
${profileText.slice(0, 3000)}`,
        }],
      })

      const raw = msg.content[0].type === "text" ? msg.content[0].text.trim() : "{}"
      const start = raw.indexOf("{")
      const end = raw.lastIndexOf("}") + 1

      let parsed: Record<string, unknown> = {}
      try {
        parsed = JSON.parse(start >= 0 ? raw.slice(start, end) : "{}")
      } catch {
        parsed = {}
      }

      return NextResponse.json({
        score: typeof parsed.score === "number" ? parsed.score : 50,
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        gaps: Array.isArray(parsed.gaps) ? parsed.gaps : [],
        recruiterPov: typeof parsed.recruiterPov === "string" ? parsed.recruiterPov : "",
        optimizedFor: Array.isArray(parsed.optimizedFor) ? parsed.optimizedFor : [],
      })
    } catch {
      return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
    }
  }

  // ── Improve section ────────────────────────────────────────────────────────
  if (action === "improve") {
    const { headline, about, experience, type } = body as {
      headline: string
      about: string
      experience?: string
      type: "headline" | "about" | "impact" | "recruiter"
    }

    if (!type) return NextResponse.json({ error: "type required" }, { status: 400 })

    const profileContext = [
      headline ? `Headline: ${headline}` : "",
      about ? `About: ${about}` : "",
      experience ? `Experience: ${experience}` : "",
    ].filter(Boolean).join("\n\n")

    const prompts: Record<string, { prompt: string; section: "headline" | "about"; delta: string }> = {
      headline: {
        prompt: `Rewrite this LinkedIn headline to be more specific, achievement-oriented, and recruiter-friendly. Make it stand out with concrete role + value proposition. Return ONLY the improved headline (1 line, no quotes, no explanation).\n\nCurrent profile:\n${profileContext.slice(0, 2000)}`,
        section: "headline",
        delta: "Stronger positioning (+18% impact)",
      },
      about: {
        prompt: `Rewrite this LinkedIn About section to be more compelling and story-driven. Open with a strong hook, highlight key achievements, and close with a clear call to action. Keep it professional but human. Return ONLY the improved About text (no quotes, no explanation).\n\nCurrent profile:\n${profileContext.slice(0, 2000)}`,
        section: "about",
        delta: "More compelling story and hook",
      },
      impact: {
        prompt: `Rewrite the LinkedIn About section to add measurable impact language. Replace vague statements with concrete metrics and outcomes (e.g. "grew revenue by 40%", "led team of 8", "reduced churn by 22%"). If exact numbers aren't available, use realistic estimates. Return ONLY the improved About text (no quotes, no explanation).\n\nCurrent profile:\n${profileContext.slice(0, 2000)}`,
        section: "about",
        delta: "Quantified achievements added",
      },
      recruiter: {
        prompt: `Rewrite the LinkedIn About section to be more recruiter-friendly. Optimize for LinkedIn search with strong keywords, clear positioning, and an immediate value statement in the first line. Remove filler phrases. Make every sentence count. Return ONLY the improved About text (no quotes, no explanation).\n\nCurrent profile:\n${profileContext.slice(0, 2000)}`,
        section: "about",
        delta: "More recruiter-friendly headline",
      },
    }

    const config = prompts[type]
    if (!config) return NextResponse.json({ error: "Unknown improvement type" }, { status: 400 })

    try {
      const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        messages: [{ role: "user", content: config.prompt }],
      })

      const improved = msg.content[0].type === "text" ? msg.content[0].text.trim() : ""

      return NextResponse.json({
        improved,
        section: config.section,
        delta: config.delta,
      })
    } catch {
      return NextResponse.json({ error: "Improvement failed" }, { status: 500 })
    }
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 })
}
