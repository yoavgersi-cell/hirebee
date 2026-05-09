import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { randomBytes } from "crypto"

function cuid() { return randomBytes(12).toString("base64url") }

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
  })
  if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json({ resume })
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { name, role, content, style, template } = body

  const existing = await prisma.resume.findFirst({ where: { id, userId: session.user.id }, select: { id: true } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const resume = await prisma.resume.update({
    where: { id },
    data: {
      ...(name !== undefined && { name }),
      ...(role !== undefined && { role }),
      ...(content !== undefined && { content }),
      ...(style !== undefined && { style }),
      ...(template !== undefined && { template }),
    },
  })

  return NextResponse.json({ resume })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const existing = await prisma.resume.findFirst({ where: { id, userId: session.user.id }, select: { id: true } })
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await prisma.resume.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}

export async function POST(req: NextRequest, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  if (body.action !== "duplicate") return NextResponse.json({ error: "Unknown action" }, { status: 400 })

  const source = await prisma.resume.findFirst({ where: { id, userId: session.user.id } })
  if (!source) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const copy = await prisma.resume.create({
    data: {
      id: cuid(),
      userId: session.user.id,
      name: `${source.name} (copy)`,
      role: source.role,
      content: source.content as object,
      style: source.style as object | null ?? undefined,
      template: source.template,
    },
  })

  return NextResponse.json({ resume: copy })
}
