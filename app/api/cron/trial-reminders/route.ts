import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendTrialEndingEmail } from "@/lib/email"

// Runs daily via Vercel Cron — finds trial users expiring in ~2 days and emails them
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const in2Days = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  const in3Days = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

  const users = await prisma.user.findMany({
    where: {
      plan: "trial",
      trialEndsAt: { gte: in2Days, lt: in3Days },
    },
    select: { email: true, trialEndsAt: true },
  })

  const results = await Promise.allSettled(
    users.map(u => u.email && u.trialEndsAt
      ? sendTrialEndingEmail(u.email, u.trialEndsAt)
      : Promise.resolve()
    )
  )

  const sent = results.filter(r => r.status === "fulfilled").length
  const failed = results.filter(r => r.status === "rejected")

  failed.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[cron/trial-reminders] email ${i} failed:`, r.reason)
    }
  })

  console.log(`[cron/trial-reminders] candidates=${users.length} sent=${sent} failed=${failed.length}`)
  return NextResponse.json({ candidates: users.length, sent, failed: failed.length })
}
