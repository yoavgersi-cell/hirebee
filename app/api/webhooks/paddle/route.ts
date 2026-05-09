import { createHmac, timingSafeEqual } from "crypto"
import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"
import { sendTrialStartedEmail } from "@/lib/email"

function verifySignature(rawBody: string, signature: string, secret: string): boolean {
  const parts = Object.fromEntries(signature.split(";").map((p) => p.split("=")))
  const ts = parts["ts"]
  const h1 = parts["h1"]
  if (!ts || !h1) return false
  const hmac = createHmac("sha256", secret)
  hmac.update(`${ts}:${rawBody}`)
  const computed = hmac.digest("hex")
  try {
    return timingSafeEqual(Buffer.from(computed), Buffer.from(h1))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const signature = req.headers.get("paddle-signature") ?? ""

  if (!verifySignature(rawBody, signature, process.env.PADDLE_WEBHOOK_SECRET!)) {
    return new Response("Invalid signature", { status: 401 })
  }

  let event: { event_type: string; data: Record<string, unknown> }
  try {
    event = JSON.parse(rawBody)
  } catch (err) {
    console.error("[paddle webhook] JSON parse error:", err)
    return new Response("Bad request", { status: 400 })
  }

  const { event_type, data } = event
  const userId = data?.custom_data ? (data.custom_data as Record<string, string>).userId : undefined

  console.log("[paddle webhook]", event_type, { userId, status: data?.status })

  if (!userId) return new Response("OK", { status: 200 })

  const subscriptionId = data?.id as string | undefined
  const billingInterval = (data?.items as Array<{ price?: { billing_cycle?: { interval?: string } } }>)?.[0]?.price?.billing_cycle?.interval

  try {
    if (event_type === "subscription.created") {
      const status = data?.status as string
      if (status === "trialing") {
        const trialDates = data?.trial_dates as { ends_at?: string } | undefined
        const trialEndsAt = trialDates?.ends_at
          ? new Date(trialDates.ends_at)
          : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        const user = await prisma.user.update({
          where: { id: userId },
          data: { plan: "trial", trialEndsAt, subscriptionId, billingInterval },
          select: { email: true },
        })
        if (user.email) {
          sendTrialStartedEmail(user.email, trialEndsAt).catch(err =>
            console.error("[email] trial started email failed:", err)
          )
        }
        console.log("[paddle webhook] trial started for", userId, "ends", trialEndsAt)
      } else if (status === "active") {
        await prisma.user.update({
          where: { id: userId },
          data: { plan: "pro", trialEndsAt: null, subscriptionId, billingInterval },
        })
        console.log("[paddle webhook] subscription active for", userId)
      }
    }

    if (event_type === "subscription.activated") {
      await prisma.user.update({
        where: { id: userId },
        data: { plan: "pro", trialEndsAt: null, subscriptionId, billingInterval },
      })
      console.log("[paddle webhook] activated for", userId)
    }

    if (event_type === "subscription.canceled" || event_type === "subscription.paused") {
      await prisma.user.update({
        where: { id: userId },
        data: { plan: "free", trialEndsAt: null },
      })
      console.log("[paddle webhook]", event_type, "for", userId)
    }

    if (event_type === "subscription.updated") {
      const status = data?.status as string
      if (status === "canceled" || status === "paused") {
        await prisma.user.update({ where: { id: userId }, data: { plan: "free", trialEndsAt: null } })
      } else if (status === "trialing") {
        const trialDates = data?.trial_dates as { ends_at?: string } | undefined
        const trialEndsAt = trialDates?.ends_at ? new Date(trialDates.ends_at) : undefined
        await prisma.user.update({
          where: { id: userId },
          data: { plan: "trial", ...(trialEndsAt ? { trialEndsAt } : {}) },
        })
      } else if (status === "active") {
        await prisma.user.update({ where: { id: userId }, data: { plan: "pro", trialEndsAt: null } })
      }
      console.log("[paddle webhook] updated status", status, "for", userId)
    }
  } catch (err) {
    console.error("[paddle webhook] db error:", err, { event_type, userId })
    return new Response("Internal error", { status: 500 })
  }

  return new Response("OK", { status: 200 })
}
