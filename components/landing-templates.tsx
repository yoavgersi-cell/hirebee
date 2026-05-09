"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { renderTemplate, TEMPLATES, ROLE_CVS } from "@/components/cv-templates"
import { A4Preview } from "@/components/a4-preview"

const AVAILABLE_ROLES = Object.keys(ROLE_CVS)

// Pair each template with an available CV (cycling through roles)
const SAMPLES = TEMPLATES.map((t, i) => ({
  ...ROLE_CVS[AVAILABLE_ROLES[i % AVAILABLE_ROLES.length]],
  template: t.id,
}))

const CARD_W = 440 // px — A4Preview auto-computes height ≈ 622px

export function LandingTemplates() {
  const [active, setActive] = useState(1)

  const prev = useCallback(() => setActive((i) => Math.max(0, i - 1)), [])
  const next = useCallback(() => setActive((i) => Math.min(SAMPLES.length - 1, i + 1)), [])

  return (
    <section className="py-24 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-3">
            Choose how your optimized<br className="hidden sm:block" /> resume looks
          </h2>
          <p className="text-white/40 text-sm">
            All templates are ATS-friendly and optimized for readability.
          </p>
        </div>

        {/* Carousel track */}
        <div className="relative flex items-center justify-center" style={{ height: CARD_W * (1123 / 794) }}>
          {SAMPLES.map((sample, i) => {
            const offset = i - active
            const visible = Math.abs(offset) <= 2

            if (!visible) return null

            const isActive = offset === 0
            const scale = isActive ? 1 : 0.84
            const opacity = Math.abs(offset) === 2 ? 0.25 : isActive ? 1 : 0.6
            const translateX = offset * (CARD_W * 0.88 + 24)
            const zIndex = 10 - Math.abs(offset)

            return (
              <div
                key={sample.template}
                onClick={() => !isActive && setActive(i)}
                className="absolute transition-all duration-150"
                style={{
                  width: CARD_W,
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  cursor: isActive ? "default" : "pointer",
                  transformOrigin: "center center",
                }}
              >
                {/* Card */}
                <div
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "shadow-[0_32px_80px_rgba(0,0,0,0.6)] ring-2 ring-teal-400/60"
                      : "shadow-xl"
                  }`}
                >
                  <A4Preview>{renderTemplate(sample.cv, sample.template)}</A4Preview>
                </div>

                {/* CTA on active card */}
                {isActive && (
                  <div className="mt-5 flex justify-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-7 py-3 rounded-full text-sm transition-colors shadow-lg shadow-teal-500/30"
                    >
                      Start With This Template →
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            disabled={active === 0}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 disabled:opacity-20 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {SAMPLES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-full transition-all duration-300 ${
                  active === i
                    ? "bg-teal-400 w-5 h-2"
                    : "bg-white/20 hover:bg-white/40 w-2 h-2"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={active === SAMPLES.length - 1}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 disabled:opacity-20 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-white/20 text-xs text-center mt-6">
          All templates download as a polished PDF — formatted and ready to send.
        </p>
      </div>
    </section>
  )
}
