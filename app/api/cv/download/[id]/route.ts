import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { generatePdf } from "@/lib/pdf-generator"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 })

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { plan: true, role: true, trialEndsAt: true } })
  const isAdmin = user?.role === "admin"
  const isPro = user?.plan === "pro"
  const isTrial = user?.plan === "trial"
  const trialExpired = isTrial && user?.trialEndsAt && new Date(user.trialEndsAt) < new Date()
  const hasAccess = isAdmin || isPro || (isTrial && !trialExpired)
  if (!hasAccess) return new Response("Forbidden", { status: 403 })

  const { id } = await params
  const url = new URL(request.url)
  const template = url.searchParams.get("template") ?? "classic"

  const analysis = await prisma.analysis.findFirst({
    where: { id, userId: session.user.id },
    select: { improvedCv: true, fileName: true },
  })
  if (!analysis?.improvedCv) return new Response("Not found", { status: 404 })

  try {
    const pdfBuffer = await generatePdf(analysis.improvedCv as object, template)
    return new Response(pdfBuffer.buffer as ArrayBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="CV.pdf"`,
      },
    })
  } catch (err) {
    console.error("[download] pdf error:", err)
    return new Response("PDF generation failed", { status: 500 })
  }
}
