import { NextRequest } from "next/server"
import { auth } from "@/auth"
import { generatePdf } from "@/lib/pdf-generator"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 })

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
