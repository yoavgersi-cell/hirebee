"use client"

import { useState } from "react"
import Link from "next/link"
import { HireBeeLogo } from "@/components/hirebee-logo"
import { renderTemplate, TEMPLATES, ROLE_CVS } from "@/components/cv-templates"
import { ArrowRight, Code2, BarChart3, TrendingUp, Megaphone, ShoppingBag, Palette, DollarSign, Settings } from "lucide-react"
import { A4Preview } from "@/components/a4-preview"

const ROLES = [
  { id: "software-engineer", label: "Software Engineer", icon: Code2 },
  { id: "product-manager", label: "Product Manager", icon: BarChart3 },
  { id: "data-scientist", label: "Data Scientist", icon: TrendingUp },
  { id: "marketing", label: "Marketing Manager", icon: Megaphone },
  { id: "sales", label: "Sales Executive", icon: ShoppingBag },
  { id: "designer", label: "UX Designer", icon: Palette },
  { id: "finance", label: "Finance Analyst", icon: DollarSign },
  { id: "operations", label: "Operations Manager", icon: Settings },
]

export default function CvExamplesPage() {
  const [selectedRole, setSelectedRole] = useState("software-engineer")
  const [selectedTemplate, setSelectedTemplate] = useState("nova")

  const current = ROLE_CVS[selectedRole]

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100 sticky top-0 z-20 bg-white/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <HireBeeLogo size={26} />
            <span className="font-extrabold text-gray-900 text-sm tracking-tight">HireBee</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link
              href="/login"
              className="text-sm font-semibold bg-gray-950 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              Analyze my CV →
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 pt-14 pb-10 text-center">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">CV Examples</p>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1]">
            CVs tailored for<br />your job role
          </h1>
          <p className="text-gray-500 text-base mt-4 max-w-lg mx-auto leading-relaxed">
            Real examples, real templates. Pick your role and see exactly what a strong CV looks like — then run yours through HireBee to find the gaps.
          </p>
        </div>

        {/* Interactive section */}
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left: role selector */}
            <div className="lg:w-56 shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-1">Job roles</p>
              <div className="flex flex-row flex-wrap lg:flex-col gap-1.5">
                {ROLES.map((role) => {
                  const Icon = role.icon
                  const active = selectedRole === role.id
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-left transition-all text-sm font-medium whitespace-nowrap lg:whitespace-normal w-full ${
                        active
                          ? "bg-gray-950 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? "text-white" : "text-gray-400"}`} />
                      <span className="hidden sm:inline">{role.label}</span>
                      <span className="sm:hidden">{role.label.split(" ")[0]}</span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 hidden lg:block">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                  <p className="text-xs font-semibold text-gray-700 mb-1">Use this as inspiration</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    These examples show strong CVs. Upload yours to see how you compare.
                  </p>
                  <Link
                    href="/login"
                    className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-gray-900 hover:text-teal-600 transition-colors"
                  >
                    Analyze my CV <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: preview */}
            <div className="flex-1 min-w-0">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="font-bold text-gray-900">{current.role} CV</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{current.cv.name}</p>
                </div>
                {/* Template switcher */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-medium shrink-0">Template:</span>
                  <div className="flex gap-1.5 flex-wrap">
                    {TEMPLATES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTemplate(t.id)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                          selectedTemplate === t.id
                            ? "border-gray-900 bg-gray-900 text-white"
                            : "border-gray-200 text-gray-600 hover:border-gray-400"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CV Preview */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <A4Preview>{renderTemplate(current.cv, selectedTemplate)}</A4Preview>
              </div>

              {/* CTA below preview */}
              <div className="mt-6 bg-gray-950 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-semibold text-white text-sm">How does your CV compare?</p>
                  <p className="text-gray-400 text-xs mt-0.5">Get a score, actionable fixes, and a rewritten version in 30 seconds.</p>
                </div>
                <Link
                  href="/login"
                  className="shrink-0 bg-white text-gray-950 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  Analyze my CV <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Template showcase strip */}
        <div className="border-t border-gray-100 bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-gray-900">5 professional templates</h2>
              <p className="text-gray-500 text-sm mt-2">Every template is ATS-friendly and designed to stand out.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplate(t.id)}
                  className={`group relative overflow-hidden rounded-xl border-2 transition-all ${
                    selectedTemplate === t.id ? "border-gray-900 shadow-lg" : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <A4Preview clipHeight={560}>
                    {renderTemplate(ROLE_CVS["software-engineer"].cv, t.id)}
                  </A4Preview>
                  <div className={`px-3 py-2 text-center border-t ${selectedTemplate === t.id ? "bg-gray-950 border-gray-900" : "bg-white border-gray-100"}`}>
                    <p className={`text-xs font-semibold ${selectedTemplate === t.id ? "text-white" : "text-gray-700"}`}>{t.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="py-20 text-center">
          <div className="max-w-xl mx-auto px-6">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to improve your real CV?</h2>
            <p className="text-gray-500 mb-8">
              Upload your CV and get an instant score, specific feedback, and a rewritten version — all in under a minute.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gray-950 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-gray-800 transition-colors"
            >
              Analyze my CV free <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-gray-400 mt-3">No credit card · Takes 30 seconds</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">© 2026 HireBee</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">Home</Link>
            <a href="mailto:hello@hirebee.app" className="text-xs text-gray-400 hover:text-gray-600">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
