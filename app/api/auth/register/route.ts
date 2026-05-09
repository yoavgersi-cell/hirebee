import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 })
    }
    if (password.length < 8) {
      return Response.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      // If they have an OAuth account, direct them there
      if (!existing.password) {
        return Response.json(
          { error: "This email is linked to a Google account. Please sign in with Google." },
          { status: 409 }
        )
      }
      return Response.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, name: name || null, password: hashed },
      select: { id: true, email: true, name: true },
    })

    return Response.json({ user }, { status: 201 })
  } catch (err) {
    console.error("[register]", err)
    return Response.json({ error: "Registration failed" }, { status: 500 })
  }
}
