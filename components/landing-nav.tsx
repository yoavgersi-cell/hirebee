"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { HireBeeLogo } from "@/components/hirebee-logo"

const NAV_LINKS = [
  { label: "Scan", href: "#scan" },
  { label: "Features", href: "#features" },
  { label: "Examples", href: "#examples" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
]

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-950/90 backdrop-blur-md border-b border-white/8 shadow-xl shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <HireBeeLogo size={26} />
          <span className="font-extrabold text-white text-base tracking-tight">HireBee</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/55 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link href="/login" className="text-sm text-white/55 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            href="/analyze"
            className="bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Scan my resume
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-950/98 backdrop-blur-md border-t border-white/8 px-6 py-5 space-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-white/70 hover:text-white py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/8 flex flex-col gap-2">
            <Link href="/login" className="text-sm text-white/60 text-center py-2">Sign in</Link>
            <Link
              href="/analyze"
              className="bg-teal-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full text-center"
            >
              Scan my resume
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
