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

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 })

  const hasAccess = await assertAccess(session.user.id)
  if (!hasAccess) return Response.json({ error: "pro_required" }, { status: 402 })

  const { action, data } = await req.json()

  try {
    if (action === "rewrite-summary") {
      const { summary, role } = data as { summary: string; role: string }
      const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{
          role: "user",
          content: `Rewrite this professional summary to be punchy, specific, and ATS-optimized for a ${role || "professional"} role. Keep it 2–3 sentences. Lead with their strongest quality or a concrete achievement. No "results-driven", no "I am", no corporate clichés. Return ONLY the rewritten text, nothing else.\n\nOriginal: ${summary}`,
        }],
      })
      const result = msg.content[0].type === "text" ? msg.content[0].text.trim() : ""
      return Response.json({ result })
    }

    if (action === "improve-bullet") {
      const { bullet, role } = data as { bullet: string; role: string }
      const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 120,
        messages: [{
          role: "user",
          content: `Improve this resume bullet point for a ${role || "professional"} role. Start with a strong action verb. Add quantified impact if you can infer it. Keep it under 15 words. Return ONLY the improved bullet, nothing else.\n\nOriginal: ${bullet}`,
        }],
      })
      const result = msg.content[0].type === "text" ? msg.content[0].text.trim() : ""
      return Response.json({ result })
    }

    return Response.json({ error: "Unknown action" }, { status: 400 })
  } catch (err) {
    console.error("[ai-assist]", err)
    return Response.json({ error: "AI request failed" }, { status: 500 })
  }
}
