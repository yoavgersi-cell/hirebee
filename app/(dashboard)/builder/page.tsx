import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { BuilderClient } from "./builder-client"

export default async function BuilderPage() {
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

  // No hard redirect — all users can build, only download is gated
  return <BuilderClient hasAccess={hasAccess} />
}
