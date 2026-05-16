import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

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

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const hasAccess = await assertAccess(session.user.id)
  if (!hasAccess) return NextResponse.json({ error: "Pro feature" }, { status: 402 })

  const body = await req.json()
  const action = body.action ?? "analyze"

  // ── Analyze profile ──────────────────────────────────────────────────────────
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
      headline ? `HEADLINE:\n${headline}` : "",
      about ? `ABOUT SECTION:\n${about}` : "",
      experience ? `EXPERIENCE:\n${experience}` : "",
    ].filter(Boolean).join("\n\n")

    try {
      const msg = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1800,
        messages: [{
          role: "user",
          content: `You are a senior LinkedIn recruiter and career coach who has reviewed thousands of profiles. Analyze this LinkedIn profile deeply and return ONLY valid JSON (no markdown, no explanation outside the JSON).

Scoring criteria:
- Headline (0-100): specificity, role clarity, value proposition, keywords
- About (0-100): hook strength, story arc, achievements, call to action, length
- Experience (0-100): impact language, metrics, progression, relevance (score 50 if not provided)
- Overall: weighted average with your expert judgment

Return this exact JSON shape:
{
  "score": <integer 0-100, overall profile strength>,
  "sectionScores": {
    "headline": <integer 0-100>,
    "about": <integer 0-100>,
    "experience": <integer 0-100, or 50 if not provided>
  },
  "strengths": [<2-3 specific, concrete strengths — not generic praise>],
  "gaps": [<3-4 specific gaps — each must name the exact problem AND why it hurts them>],
  "quickWins": [<3 short, specific things they can fix TODAY — actionable, specific>],
  "recruiterPov": "<3-4 sentences: what a recruiter thinks in the first 10 seconds — be brutally honest but constructive>",
  "keywordsFound": [<5-8 strong keywords/skills already in the profile>],
  "keywordsMissing": [<4-6 high-value keywords missing from this profile that recruiters search for, based on the role context>],
  "searchabilityScore": <integer 0-100, how discoverable is this profile in LinkedIn search>,
  "targetRoles": [<2-3 roles this profile is best positioned for, based on content>],
  "headlineRewrite": "<one improved headline (max 220 chars) — specific, keyword-rich, with clear value prop>"
}

Profile to analyze:
${profileText.slice(0, 4000)}`,
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

      const sectionScores = (parsed.sectionScores as Record<string, number>) ?? {}

      return NextResponse.json({
        score: typeof parsed.score === "number" ? parsed.score : 50,
        sectionScores: {
          headline: typeof sectionScores.headline === "number" ? sectionScores.headline : 50,
          about: typeof sectionScores.about === "number" ? sectionScores.about : 50,
          experience: typeof sectionScores.experience === "number" ? sectionScores.experience : 50,
        },
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        gaps: Array.isArray(parsed.gaps) ? parsed.gaps : [],
        quickWins: Array.isArray(parsed.quickWins) ? parsed.quickWins : [],
        recruiterPov: typeof parsed.recruiterPov === "string" ? parsed.recruiterPov : "",
        keywordsFound: Array.isArray(parsed.keywordsFound) ? parsed.keywordsFound : [],
        keywordsMissing: Array.isArray(parsed.keywordsMissing) ? parsed.keywordsMissing : [],
        searchabilityScore: typeof parsed.searchabilityScore === "number" ? parsed.searchabilityScore : 50,
        targetRoles: Array.isArray(parsed.targetRoles) ? parsed.targetRoles : [],
        headlineRewrite: typeof parsed.headlineRewrite === "string" ? parsed.headlineRewrite : "",
      })
    } catch {
      return NextResponse.json({ error: "Analysis failed" }, { status: 500 })
    }
  }

  // ── Improve section ──────────────────────────────────────────────────────────
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
        prompt: `You are a LinkedIn expert. Rewrite this headline to be specific, keyword-rich, and immediately compelling to recruiters.

Rules:
- Max 220 characters
- Lead with the role or seniority level
- Add 1-2 concrete value props or skills
- No buzzwords like "passionate" or "results-driven"
- No hashtags
- Return ONLY the rewritten headline, nothing else

Current profile:
${profileContext.slice(0, 2500)}`,
        section: "headline",
        delta: "More specific, keyword-rich positioning",
      },
      about: {
        prompt: `You are a LinkedIn expert. Rewrite this About section to be compelling, specific, and story-driven.

Rules:
- Open with a strong 1-2 sentence hook (the problem you solve or your unique value)
- Include 2-3 concrete achievements with metrics where possible
- Use short paragraphs (3-4 lines max each)
- End with a clear call to action (open to opportunities / what you're looking for)
- 200-350 words
- Professional but human tone — not corporate jargon
- Return ONLY the rewritten About text, nothing else

Current profile:
${profileContext.slice(0, 2500)}`,
        section: "about",
        delta: "Stronger hook, story, and CTA",
      },
      impact: {
        prompt: `You are a LinkedIn expert. Rewrite this About section to maximize measurable impact and achievements.

Rules:
- Replace every vague statement with a specific metric or outcome
- Use formats like: "grew X by Y%", "led team of N", "saved $X", "reduced churn by Y%"
- If exact numbers aren't in the profile, use realistic conservative estimates with "~" prefix
- Keep the overall length similar to the original
- Return ONLY the rewritten About text, nothing else

Current profile:
${profileContext.slice(0, 2500)}`,
        section: "about",
        delta: "Quantified achievements throughout",
      },
      recruiter: {
        prompt: `You are a senior recruiter. Rewrite this About section to be maximally recruiter-friendly.

Rules:
- First line must be a clear value statement (role + specialty + years)
- Add high-value industry keywords naturally throughout
- Remove all filler phrases ("I am passionate about...", "I believe in...", etc.)
- Each sentence must signal something specific about your value
- Keep 200-300 words
- Return ONLY the rewritten About text, nothing else

Current profile:
${profileContext.slice(0, 2500)}`,
        section: "about",
        delta: "Optimized for recruiter search & first impression",
      },
    }

    const config = prompts[type]
    if (!config) return NextResponse.json({ error: "Unknown improvement type" }, { status: 400 })

    try {
      const msg = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 800,
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
