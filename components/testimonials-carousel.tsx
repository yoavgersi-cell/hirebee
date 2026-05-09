"use client"

import { useRef, useState, useEffect, useCallback } from "react"

const TESTIMONIALS = [
  { quote: "I had no idea my resume was missing 11 keywords for every job I applied to.", name: "Sarah K.", role: "Product Manager" },
  { quote: "Got 3 callbacks within a week of fixing my score. I was invisible before.", name: "James T.", role: "Software Engineer" },
  { quote: "Saw exactly which bullet points were costing me interviews. Fixed them in 10 minutes.", name: "Priya M.", role: "Marketing Lead" },
]

function TestimonialCard({ quote, name, role }: { quote: string; name: string; role: string }) {
  return (
    <div className="flex items-start gap-3 bg-white/3 border border-white/8 rounded-xl px-4 py-4">
      <div className="flex gap-0.5 shrink-0 mt-0.5">
        {[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-[11px]">★</span>)}
      </div>
      <div>
        <p className="text-sm text-white/60 leading-snug mb-2">&ldquo;{quote}&rdquo;</p>
        <p className="text-xs text-white/25">{name} · {role}</p>
      </div>
    </div>
  )
}

export function TestimonialsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const onScroll = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    setActive(idx)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [onScroll])

  function goTo(i: number) {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" })
  }

  return (
    <>
      {/* Mobile carousel */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3 pb-1 -mx-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {TESTIMONIALS.map(({ quote, name, role }) => (
            <div
              key={name}
              className="snap-center shrink-0 w-[calc(100%-2rem)]"
            >
              <TestimonialCard quote={quote} name={name} role={role} />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                active === i ? "bg-white/50 w-5 h-1.5" : "bg-white/15 w-1.5 h-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-3">
        {TESTIMONIALS.map(({ quote, name, role }) => (
          <TestimonialCard key={name} quote={quote} name={name} role={role} />
        ))}
      </div>
    </>
  )
}
