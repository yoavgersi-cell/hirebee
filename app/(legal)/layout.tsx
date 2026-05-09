import Link from "next/link"
import { HireBeeLogo } from "@/components/hirebee-logo"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <HireBeeLogo size={22} />
            <span className="text-gray-900 text-sm font-semibold">HireBee</span>
          </Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        {children}
      </main>
      <footer className="border-t border-gray-100 px-6 py-8 mt-16">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-4 text-xs text-gray-400">
          <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          <Link href="/refund" className="hover:text-gray-600 transition-colors">Refund Policy</Link>
          <span className="ml-auto">© 2026 HireBee · Operated by Planner hub</span>
        </div>
      </footer>
    </div>
  )
}
