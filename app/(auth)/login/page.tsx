"use client"

import { useState, Suspense } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, ShieldCheck, Eye, EyeOff, ArrowRight } from "lucide-react"
import { HireBeeLogo } from "@/components/hirebee-logo"
import Link from "next/link"

const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const features = [
  "AI resume score in under 60 seconds",
  "Find exactly why you're not getting callbacks",
  "Job-specific keyword matching",
  "AI rewrites for every weak bullet",
  "5 ATS-friendly professional templates",
  "Download as a polished PDF",
]

type AuthMode = "choose" | "signin" | "register"

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}

function LoginContent() {
  const searchParams = useSearchParams()
  const callbackUrl  = searchParams.get("callbackUrl") ?? "/analyze"

  const [mode, setMode]           = useState<AuthMode>("choose")
  const [showPw, setShowPw]       = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [name, setName]           = useState("")
  const [email, setEmail]         = useState("")
  const [password, setPassword]   = useState("")

  async function handleGoogle() {
    setLoading(true)
    await signIn("google", { callbackUrl })
  }

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (mode === "register") {
      // Register first, then sign in
      const res = await fetch("/api/auth/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); setLoading(false); return }
    }

    const result = await signIn("credentials", {
      email, password, redirect: false,
    })

    if (result?.error) {
      setError(
        result.error === "invalid_credentials"
          ? "Incorrect email or password"
          : "Sign in failed. Please try again."
      )
      setLoading(false)
    } else {
      window.location.href = callbackUrl
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left — branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-950 flex-col justify-between p-12">
        <div className="flex items-center gap-2.5">
          <HireBeeLogo size={32} />
          <span className="font-extrabold text-white text-lg tracking-tight">HireBee</span>
        </div>

        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Find out why your resume<br />
              <span className="text-teal-400">is getting ignored.</span>
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              AI-powered resume analysis that shows you exactly what to fix — before you apply.
            </p>
          </div>
          <ul className="space-y-3">
            {features.map(text => (
              <li key={text} className="flex items-center gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-gray-600">Free resume score · No credit card required</p>
      </div>

      {/* Right — auth */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo + value prop */}
          <div className="lg:hidden mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HireBeeLogo size={28} />
              <span className="font-extrabold text-gray-900 tracking-tight">HireBee</span>
            </div>
            <p className="text-sm font-semibold text-gray-800 mb-2">Find out why your resume is getting ignored.</p>
            <ul className="space-y-1.5">
              {["AI resume score in under 60 seconds", "Keyword matching + AI rewrites", "ATS-friendly templates + PDF download"].map(f => (
                <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Header */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === "register" ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-gray-500 mt-1.5 text-sm">
              {mode === "register" ? "Free resume score — no credit card required" : "Sign in to continue to HireBee"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Google */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold h-11 rounded-xl text-sm transition-all mb-4"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Email form */}
          {mode === "choose" ? (
            <div className="space-y-3">
              <button
                onClick={() => setMode("signin")}
                className="w-full flex items-center justify-between border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold h-11 rounded-xl text-sm transition-all px-4"
              >
                Sign in with email <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => setMode("register")}
                className="w-full flex items-center justify-between border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold h-11 rounded-xl text-sm transition-all px-4"
              >
                Create account with email <ArrowRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleCredentials} className="space-y-3">
              {mode === "register" && (
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-400 transition-colors"
                />
              )}
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-400 transition-colors"
              />
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder={mode === "register" ? "Password (min. 8 characters)" : "Password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={mode === "register" ? 8 : 1}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-teal-400 transition-colors pr-10"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gray-950 hover:bg-gray-800 disabled:opacity-50 text-white font-semibold h-11 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : mode === "register" ? "Create account" : "Sign in"}
              </button>

              <button type="button" onClick={() => { setMode("choose"); setError(null) }}
                className="w-full text-xs text-gray-400 hover:text-gray-600 py-1 transition-colors">
                ← Back
              </button>
            </form>
          )}

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mt-6">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Free score</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> No card required</span>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4 leading-relaxed">
            By continuing you agree to our{" "}
            <Link href="/" className="underline hover:text-gray-600">Terms of Service</Link>.
            Your data is never shared or sold.
          </p>
        </div>
      </div>
    </div>
  )
}
