import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Link from "next/link"
import { SignOutButton } from "@/components/sign-out-button"
import { HireBeeLogo } from "@/components/hirebee-logo"
import { MobileNav } from "@/components/mobile-nav"
import { prisma } from "@/lib/prisma"
import { ShieldCheck } from "lucide-react"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await prisma.user.findUnique({
    where:  { id: session.user.id },
    select: { plan: true, role: true, analysisCount: true, trialEndsAt: true, name: true, image: true, email: true },
  })

  const isAdmin   = user?.role === "admin"
  const isPro     = user?.plan === "pro"
  const isTrial   = user?.plan === "trial"
  const trialExpired = isTrial && user?.trialEndsAt && new Date(user.trialEndsAt) < new Date()
  const hasAccess = isAdmin || isPro || (isTrial && !trialExpired)

  const planLabel = isAdmin ? "Admin" : isPro ? "Pro" : isTrial && !trialExpired ? "Trial" : null

  const planBadgeStyle =
    isAdmin    ? "text-amber-700 bg-amber-50 border-amber-200" :
    isPro      ? "text-emerald-700 bg-emerald-50 border-emerald-200" :
    isTrial    ? "text-teal-700 bg-teal-50 border-teal-200" : ""

  const initial = (user?.name ?? user?.email ?? "U")[0].toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href={hasAccess ? "/builder" : "/upgrade"} className="flex items-center gap-2 shrink-0">
              <HireBeeLogo size={26} />
              <span className="font-extrabold text-gray-900 text-sm tracking-tight">HireBee</span>
            </Link>
            {hasAccess && (
              <nav className="flex items-center gap-1">
                <Link href="/builder" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  Builder
                </Link>
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block">
                  My CVs
                </Link>
                <Link href="/cover-letter" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block">
                  Cover Letter
                </Link>
                <Link href="/linkedin" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block">
                  LinkedIn
                </Link>
                <Link href="/documents" className="text-sm text-gray-500 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors hidden sm:block">
                  My Docs
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="text-sm text-amber-600 hover:text-amber-700 px-3 py-1.5 rounded-lg hover:bg-amber-50 transition-colors hidden sm:flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin
                  </Link>
                )}
              </nav>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {!hasAccess && (
              <Link href="/upgrade"
                className="hidden sm:flex text-xs font-semibold text-white bg-teal-500 hover:bg-teal-600 px-3.5 py-1.5 rounded-full transition-colors">
                Start free trial
              </Link>
            )}

            {planLabel && (
              <span className={`hidden sm:inline text-xs font-semibold border px-2.5 py-1 rounded-full ${planBadgeStyle}`}>
                {planLabel}
              </span>
            )}

            {/* User avatar */}
            <div className="flex items-center gap-2">
              {user?.image ? (
                <img src={user.image} alt={user.name ?? ""} className="w-7 h-7 rounded-full object-cover border border-gray-200" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-xs font-bold text-white">
                  {initial}
                </div>
              )}
              <span className="text-xs text-gray-500 hidden md:block max-w-[120px] truncate">{user?.name ?? user?.email}</span>
            </div>

            {hasAccess && <MobileNav isAdmin={isAdmin} />}
            <span className="hidden sm:block"><SignOutButton /></span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">{children}</main>

      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© 2026 HireBee</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms</Link>
            <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Privacy</Link>
            <Link href="/refund" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Refunds</Link>
            <a href="mailto:hello@hirebee.app" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">hello@hirebee.app</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
