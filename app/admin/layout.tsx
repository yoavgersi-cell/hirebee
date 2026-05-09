import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { HireBeeLogo } from "@/components/hirebee-logo"
import { SignOutButton } from "@/components/sign-out-button"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  // Always verify role from DB — never trust JWT alone for access control
  const user = await prisma.user.findUnique({
    where:  { id: session.user.id },
    select: { role: true, email: true, name: true },
  })

  if (user?.role !== "admin") redirect("/")

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="border-b border-white/8 px-6 h-14 flex items-center justify-between sticky top-0 bg-gray-950/95 backdrop-blur z-10">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <HireBeeLogo size={22} />
            <span className="font-extrabold text-white text-sm tracking-tight">HireBee</span>
            <span className="text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full ml-1">Admin</span>
          </Link>
          <nav className="flex items-center gap-1 hidden sm:flex">
            <Link href="/admin" className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
              Dashboard
            </Link>
            <Link href="/" className="text-xs text-white/50 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
              ← View site
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/30 hidden sm:block">{user.email}</span>
          <SignOutButton />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {children}
      </main>
    </div>
  )
}
