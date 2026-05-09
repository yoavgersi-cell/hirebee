"use client"

import { useRef, useState, useEffect } from "react"

// A4 at 96dpi = 794 × 1123px
const A4_W = 794
const A4_H = 1123

interface Props {
  children: React.ReactNode
  /** Clip to this height in px instead of showing the full page (for thumbnails) */
  clipHeight?: number
}

export function A4Preview({ children, clipHeight }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => setScale(el.offsetWidth / A4_W)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const visibleH = clipHeight ?? A4_H
  const containerH = visibleH * scale

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: containerH, overflow: "hidden", position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
          pointerEvents: clipHeight ? "none" : undefined,
        }}
      >
        {children}
      </div>
    </div>
  )
}
