"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, Scan, Layout, Mail, Linkedin, FileText } from "lucide-react"
import { HireBeeLogo } from "@/components/hirebee-logo"

const AI_TOOLS = [
  { label: "ATS Resume Scanner", href: "/analyze", icon: Scan, badge: "Free" },
  { label: "AI Resume Builder", href: "/builder", icon: Layout, badge: "Trial" },
  { label: "Cover Letter Generator", href: "/cover-letter", icon: Mail, badge: "Trial" },
  { label: "LinkedIn Optimizer", href: "/linkedin", icon: Linkedin, badge: "Trial" },
  { label: "CV Examples by Role", href: "/cv-examples", icon: FileText, badge: "Free" },
]

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
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
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {/* AI Tools dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsOpen(!toolsOpen)}
              className="flex items-center gap-1 text-sm text-white/55 hover:text-white transition-colors"
            >
              AI Tools
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`} />
            </button>

            {toolsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-gray-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
                <div className="p-2">
                  {AI_TOOLS.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="text-sm text-white/70 group-hover:text-white transition-colors flex-1">{tool.label}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-teal-500/15 text-teal-400 border border-teal-500/25">
                          {tool.badge}
                        </span>
                      </Link>
                    )
                  })}
                </div>
                <div className="border-t border-white/8 px-4 py-2.5">
                  <Link
                    href="/tools"
                    onClick={() => setToolsOpen(false)}
                    className="text-xs text-white/35 hover:text-white/60 transition-colors"
                  >
                    View all tools →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/how-it-works" className="text-sm text-white/55 hover:text-white transition-colors">
            How it works
          </Link>
          <Link href="/blog" className="text-sm text-white/55 hover:text-white transition-colors">
            Blog
          </Link>
          <a href="/#pricing" className="text-sm text-white/55 hover:text-white transition-colors">
            Pricing
          </a>
          <Link href="/about" className="text-sm text-white/55 hover:text-white transition-colors">
            About
          </Link>
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
            Scan free →
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
        <div className="md:hidden bg-gray-950/98 backdrop-blur-md border-t border-white/8 px-6 py-5 space-y-1">
          {/* AI Tools accordion */}
          <button
            onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
            className="w-full flex items-center justify-between text-sm text-white/70 hover:text-white py-2.5 transition-colors"
          >
            AI Tools
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""}`} />
          </button>
          {mobileToolsOpen && (
            <div className="pl-3 space-y-0.5 pb-1">
              {AI_TOOLS.map((tool) => {
                const Icon = tool.icon
                return (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 py-2 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    {tool.label}
                  </Link>
                )
              })}
            </div>
          )}

          <Link
            href="/how-it-works"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white/70 hover:text-white py-2.5 transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/blog"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white/70 hover:text-white py-2.5 transition-colors"
          >
            Blog
          </Link>
          <a
            href="/#pricing"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white/70 hover:text-white py-2.5 transition-colors"
          >
            Pricing
          </a>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block text-sm text-white/70 hover:text-white py-2.5 transition-colors"
          >
            About
          </Link>

          <div className="pt-3 border-t border-white/8 flex flex-col gap-2">
            <Link href="/login" className="text-sm text-white/60 text-center py-2">Sign in</Link>
            <Link
              href="/analyze"
              onClick={() => setMobileOpen(false)}
              className="bg-teal-500 text-white text-sm font-semibold px-4 py-2.5 rounded-full text-center"
            >
              Scan my resume free →
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
