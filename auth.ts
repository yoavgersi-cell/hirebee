import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// Comma-separated admin emails in env: ADMIN_EMAILS="you@example.com,other@example.com"
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",").map(e => e.trim()).filter(Boolean)

class InvalidCredentials extends CredentialsSignin {
  code = "invalid_credentials"
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      credentials: {
        email:    { label: "Email",    type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email    = credentials?.email    as string | undefined
        const password = credentials?.password as string | undefined
        if (!email || !password) throw new InvalidCredentials()

        const user = await prisma.user.findUnique({ where: { email } })
        // No account or OAuth-only account (no password set)
        if (!user || !user.password) throw new InvalidCredentials()

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) throw new InvalidCredentials()

        return { id: user.id, email: user.email, name: user.name, image: user.image }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user }) {
      // Auto-promote admin emails on any OAuth sign-in
      if (user?.email && ADMIN_EMAILS.includes(user.email)) {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email } })
        if (dbUser && dbUser.role !== "admin") {
          await prisma.user.update({ where: { id: dbUser.id }, data: { role: "admin" } })
        }
      }
      return true
    },

    async jwt({ token, user, trigger }) {
      if (user?.id) token.userId = user.id

      // Refresh plan + role from DB on sign-in, session update, or if role missing
      const shouldRefresh = !!user?.id || trigger === "update" || !token.role
      if (shouldRefresh && token.userId) {
        const dbUser = await prisma.user.findUnique({
          where:  { id: token.userId as string },
          select: { plan: true, role: true, email: true },
        })
        if (dbUser) {
          // Promote if email is in ADMIN_EMAILS (catches existing users)
          if (dbUser.email && ADMIN_EMAILS.includes(dbUser.email) && dbUser.role !== "admin") {
            await prisma.user.update({ where: { id: token.userId as string }, data: { role: "admin" } })
            token.role = "admin"
          } else {
            token.role = dbUser.role ?? "user"
          }
          token.plan = dbUser.plan ?? "free"
        }
      }

      return token
    },

    async session({ session, token }) {
      session.user.id   = token.userId as string
      session.user.plan = (token.plan  as string) ?? "free"
      session.user.role = (token.role  as string) ?? "user"
      return session
    },
  },
})

export const { GET, POST } = handlers

declare module "next-auth" {
  interface Session {
    user: {
      id:    string
      plan:  string
      role:  string
      email?: string | null
      name?:  string | null
      image?: string | null
    }
  }
}
