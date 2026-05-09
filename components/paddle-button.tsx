"use client"

import { useState } from "react"
import Script from "next/script"

declare global {
  interface Window {
    Paddle: {
      Initialize: (options: { token: string }) => void
      Checkout: {
        open: (options: {
          items: { priceId: string; quantity: number }[]
          customer?: { email: string }
          customData?: Record<string, string>
        }) => void
      }
    }
  }
}

const PRICE_IDS: Record<string, string> = {
  monthly: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_MONTHLY ?? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID ?? "",
  quarterly: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_QUARTERLY ?? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID ?? "",
  semiannual: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_SEMIANNUAL ?? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID ?? "",
}

export function PaddleButton({
  userId,
  email,
  interval = "monthly",
  label = "Start 7-day free trial",
  className,
}: {
  userId: string
  email: string
  interval?: "monthly" | "quarterly" | "semiannual"
  label?: string
  className?: string
}) {
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)

  function handlePaddleLoad() {
    window.Paddle.Initialize({ token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN! })
    setReady(true)
  }

  function openCheckout() {
    setLoading(true)
    const priceId = PRICE_IDS[interval]
    window.Paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: { email },
      customData: { userId },
    })
    setTimeout(() => setLoading(false), 2000)
  }

  const base = "w-full font-semibold text-sm h-12 rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
  const cls = className ?? `${base} bg-teal-500 hover:bg-teal-600 text-white`

  return (
    <>
      <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" onLoad={handlePaddleLoad} />
      <button onClick={openCheckout} disabled={!ready || loading} className={cls}>
        {!ready ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Loading...
          </>
        ) : loading ? (
          <>
            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Opening checkout...
          </>
        ) : (
          label
        )}
      </button>
    </>
  )
}
