"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const TEMPLATES = [
  {
    id: "nova",
    label: "Nova",
    description: "Modern with accent sidebar line and avatar initials",
    accent: "#0d9488",
    preview: "nova",
  },
  {
    id: "executive",
    label: "Executive",
    description: "Two-column with dark header and skills sidebar",
    accent: "#0d9488",
    preview: "executive",
  },
  {
    id: "slate",
    label: "Slate",
    description: "Dark sidebar with centered avatar and contact info",
    accent: "#0d9488",
    preview: "slate",
  },
  {
    id: "clean",
    label: "Clean",
    description: "Minimalist centered header, elegant and timeless",
    accent: "#0d9488",
    preview: "clean",
  },
  {
    id: "bold",
    label: "Bold",
    description: "Full-color header, uppercase type, strong impact",
    accent: "#0d9488",
    preview: "bold",
  },
]

function MiniNova() {
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden p-3 flex flex-col gap-2">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-gray-100 pb-2">
        <div className="flex flex-col gap-0.5">
          <div className="h-2.5 w-20 bg-gray-800 rounded-sm" />
          <div className="h-1.5 w-14 bg-teal-500 rounded-sm" />
          <div className="h-1 w-24 bg-gray-200 rounded-sm mt-0.5" />
        </div>
        <div className="w-6 h-6 rounded-full bg-teal-100 border border-teal-300 flex items-center justify-center flex-shrink-0">
          <span className="text-[6px] font-bold text-teal-600">AC</span>
        </div>
      </div>
      {/* Sections with left border */}
      <div className="flex flex-col gap-1.5 flex-1">
        {["Summary", "Experience", "Skills"].map((s) => (
          <div key={s} className="pl-1.5 border-l-2 border-teal-500">
            <div className="h-1 w-8 bg-teal-500 rounded-sm mb-1" />
            <div className="flex flex-col gap-0.5">
              <div className="h-1 w-full bg-gray-200 rounded-sm" />
              <div className="h-1 w-4/5 bg-gray-200 rounded-sm" />
              {s === "Experience" && <div className="h-1 w-3/5 bg-gray-200 rounded-sm" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniExecutive() {
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
      {/* Dark header */}
      <div className="bg-gray-900 px-3 py-2">
        <div className="h-2.5 w-20 bg-white rounded-sm mb-1" />
        <div className="h-1.5 w-14 bg-gray-400 rounded-sm" />
      </div>
      {/* Two-column body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-2/5 bg-gray-50 border-r border-gray-100 p-2 flex flex-col gap-1.5">
          <div>
            <div className="h-1 w-7 bg-teal-500 rounded-sm mb-1" />
            {["", "", "", ""].map((_, i) => (
              <div key={i} className="flex items-center gap-1 mb-0.5">
                <div className="w-1 h-1 rounded-full bg-teal-500 flex-shrink-0" />
                <div className="h-1 flex-1 bg-gray-200 rounded-sm" />
              </div>
            ))}
          </div>
          <div>
            <div className="h-1 w-10 bg-teal-500 rounded-sm mb-1" />
            <div className="h-1 w-full bg-gray-200 rounded-sm mb-0.5" />
            <div className="h-1 w-3/4 bg-gray-200 rounded-sm" />
          </div>
        </div>
        {/* Main */}
        <div className="flex-1 p-2 flex flex-col gap-1.5">
          {["Summary", "Experience"].map((s) => (
            <div key={s}>
              <div className="h-1 w-10 bg-teal-500 border-b border-teal-500 rounded-sm mb-1" />
              <div className="flex flex-col gap-0.5">
                <div className="h-1 w-full bg-gray-200 rounded-sm" />
                <div className="h-1 w-4/5 bg-gray-200 rounded-sm" />
                {s === "Experience" && <div className="h-1 w-3/5 bg-gray-200 rounded-sm" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MiniSlate() {
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden flex">
      {/* Dark sidebar */}
      <div className="w-2/5 bg-slate-800 p-2 flex flex-col items-center gap-1.5">
        <div className="w-7 h-7 rounded-full bg-teal-500/30 border border-teal-400/50 flex items-center justify-center">
          <span className="text-[5px] font-bold text-white">JL</span>
        </div>
        <div className="h-1.5 w-14 bg-white rounded-sm" />
        <div className="h-1 w-10 bg-slate-500 rounded-sm" />
        <div className="w-full border-t border-slate-600 pt-1.5 mt-0.5">
          <div className="h-1 w-7 bg-teal-400 rounded-sm mb-1" />
          {["", "", ""].map((_, i) => (
            <div key={i} className="h-1 w-full bg-slate-600 rounded-sm mb-0.5" />
          ))}
        </div>
        <div className="w-full">
          <div className="h-1 w-7 bg-teal-400 rounded-sm mb-1" />
          <div className="flex flex-wrap gap-0.5">
            {["", "", "", ""].map((_, i) => (
              <div key={i} className="h-1.5 w-5 bg-teal-500/30 border border-teal-500/40 rounded-sm" />
            ))}
          </div>
        </div>
      </div>
      {/* Main */}
      <div className="flex-1 p-2 flex flex-col gap-1.5">
        {["Summary", "Experience", "Skills"].map((s) => (
          <div key={s}>
            <div className="h-1 w-10 bg-teal-500 rounded-sm mb-1" />
            <div className="flex flex-col gap-0.5">
              <div className="h-1 w-full bg-gray-200 rounded-sm" />
              <div className="h-1 w-4/5 bg-gray-200 rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniClean() {
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden p-3 flex flex-col gap-2">
      {/* Centered header */}
      <div className="text-center border-b-2 border-teal-500 pb-2">
        <div className="h-3 w-20 bg-gray-800 rounded-sm mx-auto mb-1" />
        <div className="h-1.5 w-14 bg-gray-400 rounded-sm mx-auto mb-0.5" />
        <div className="h-1 w-24 bg-gray-200 rounded-sm mx-auto" />
      </div>
      {/* Minimal content sections */}
      <div className="flex flex-col gap-1.5 flex-1">
        {["EXPERIENCE", "EDUCATION", "SKILLS"].map((s) => (
          <div key={s}>
            <div className="h-1 w-14 bg-teal-500 rounded-sm mb-1 tracking-widest" />
            <div className="flex flex-col gap-0.5">
              <div className="h-1 w-full bg-gray-200 rounded-sm" />
              <div className="h-1 w-4/5 bg-gray-200 rounded-sm" />
              {s === "EXPERIENCE" && <div className="h-1 w-2/3 bg-gray-200 rounded-sm" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MiniBold() {
  return (
    <div className="w-full h-full bg-white rounded-lg overflow-hidden flex flex-col">
      {/* Bold color header */}
      <div className="bg-teal-500 px-3 py-2">
        <div className="h-3 w-20 bg-white rounded-sm mb-1" />
        <div className="h-1.5 w-16 bg-white/60 rounded-sm mb-0.5" />
        <div className="h-1 w-20 bg-white/40 rounded-sm" />
      </div>
      {/* Content with thick left borders */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        {["Experience", "Education", "Skills"].map((s) => (
          <div key={s}>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="h-1 w-10 bg-teal-500 rounded-sm" />
              <div className="flex-1 h-px bg-teal-500" />
            </div>
            <div className="pl-2 border-l-4 border-teal-500 flex flex-col gap-0.5">
              <div className="h-1 w-full bg-gray-200 rounded-sm" />
              <div className="h-1 w-4/5 bg-gray-200 rounded-sm" />
              {s === "Experience" && <div className="h-1 w-3/5 bg-gray-200 rounded-sm" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const MINI_PREVIEWS: Record<string, React.ReactNode> = {
  nova: <MiniNova />,
  executive: <MiniExecutive />,
  slate: <MiniSlate />,
  clean: <MiniClean />,
  bold: <MiniBold />,
}

export function LandingTemplates() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => Math.max(0, i - 1))
  const next = () => setActive((i) => Math.min(TEMPLATES.length - 1, i + 1))

  return (
    <section className="py-16 md:py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-teal-400 uppercase tracking-widest mb-3">5 ATS-ready templates</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
            Your resume, your style
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            Every template is ATS-optimized and exports as a clean PDF — pick the look that fits your industry.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Cards track */}
          <div className="flex items-center justify-center gap-4">
            {TEMPLATES.map((t, i) => {
              const offset = i - active
              const visible = Math.abs(offset) <= 2
              if (!visible) return null

              const isActive = offset === 0
              const isAdjacent = Math.abs(offset) === 1

              return (
                <div
                  key={t.id}
                  onClick={() => !isActive && setActive(i)}
                  className={`relative flex-shrink-0 transition-all duration-300 rounded-xl overflow-hidden cursor-pointer ${
                    isActive
                      ? "w-52 h-72 opacity-100 ring-2 ring-teal-400/70 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                      : isAdjacent
                      ? "w-44 h-60 opacity-40 hover:opacity-60 scale-95"
                      : "w-36 h-48 opacity-20 scale-90"
                  }`}
                >
                  {MINI_PREVIEWS[t.preview]}

                  {/* Active overlay label */}
                  {isActive && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent pt-6 pb-2 px-3">
                      <p className="text-white text-xs font-bold">{t.label}</p>
                      <p className="text-white/60 text-[10px] leading-tight">{t.description}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Left / right arrows */}
          <button
            onClick={prev}
            disabled={active === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            disabled={active === TEMPLATES.length - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-20 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TEMPLATES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                active === i ? "bg-teal-400 w-5 h-1.5" : "bg-white/20 hover:bg-white/40 w-1.5 h-1.5"
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 bg-gradient-to-b from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white font-semibold px-7 py-3 rounded-full text-sm transition-all shadow-lg shadow-teal-500/25"
          >
            Build my resume free →
          </Link>
          <p className="text-white/20 text-xs mt-3">All templates download as a polished PDF</p>
        </div>
      </div>
    </section>
  )
}
