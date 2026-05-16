import { NextRequest } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { generatePdf } from "@/lib/pdf-generator"

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
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 })

  const hasAccess = await assertAccess(session.user.id)
  if (!hasAccess) return new Response("Pro feature", { status: 402 })

  const { cv, template, style } = await req.json()
  if (!cv || !cv.name) return new Response("CV data required", { status: 400 })

  try {
    const pdfBuffer = await generatePdf(cv, template ?? "nova", style)
    return new Response(pdfBuffer.buffer as ArrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${(cv.name as string).replace(/\s+/g, "_")}_CV.pdf"`,
      },
    })
  } catch (err) {
    console.error("[build-download] pdf error:", err)
    return new Response("PDF generation failed", { status: 500 })
  }
}
