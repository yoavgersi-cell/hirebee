"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "What is ATS and why does it matter?",
    a: "ATS (Applicant Tracking System) is software used by most employers to scan and filter resumes before a human ever sees them. Studies suggest up to 75% of resumes are rejected by ATS before reaching a recruiter. HireBee checks your resume against ATS criteria and shows you exactly what to fix.",
  },
  {
    q: "Is HireBee just a resume builder?",
    a: "No. HireBee is a resume optimization tool. While we offer professional templates and a builder, our core value is analyzing your existing resume, scoring it against ATS criteria, matching it to specific job descriptions, and using AI to suggest concrete improvements to your content.",
  },
  {
    q: "Do you guarantee I'll get interviews?",
    a: "No — and we never will. Hiring is complex and depends on many factors outside of your resume. What we do is help you remove the silent barriers that might be filtering you out before your application ever reaches a recruiter.",
  },
  {
    q: "Is it free to try?",
    a: "Yes. You can get a full resume score and basic insights for free — no credit card required. You only pay if you want full AI-powered rewrites, job-specific optimization, cover letter generation, and PDF download.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes, absolutely. If you upgrade to Pro, you can cancel at any time with no questions asked. You'll keep full access until the end of your billing period.",
  },
  {
    q: "How is HireBee different from other resume tools?",
    a: "Most resume tools focus on design and formatting. HireBee focuses on why your resume isn't working — keyword gaps, weak impact language, ATS formatting issues, and job-description mismatch — then gives you specific, AI-powered fixes for each one.",
  },
]

export function LandingFaq() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 px-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl font-extrabold text-gray-900">Common questions</h2>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
