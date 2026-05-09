import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { LinkedInClient } from "./linkedin-client"

export default async function LinkedInPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, role: true, trialEndsAt: true },
  })

  const isAdmin = user?.role === "admin"
  const isPro = user?.plan === "pro"
  const isTrial = user?.plan === "trial"
  const trialExpired = isTrial && user?.trialEndsAt && new Date(user.trialEndsAt) < new Date()
  const hasAccess = isAdmin || isPro || (isTrial && !trialExpired)

  if (!hasAccess) redirect("/upgrade")

  return <LinkedInClient hasAccess={hasAccess} />
}
