import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free ATS Resume Scanner — Check Your Score in 60 Seconds",
  description:
    "Upload or paste your resume and get an instant ATS score. HireBee identifies missing keywords, weak bullet points, and formatting issues that cause 75% of resumes to be rejected before a human ever sees them.",
  alternates: { canonical: "https://hirebee.app/analyze" },
  openGraph: {
    title: "Free ATS Resume Scanner — Instant Score in 60 Seconds",
    description:
      "Find out exactly why your resume gets filtered out. Get a free ATS score, see missing keywords, and fix what's blocking your interviews.",
    url: "https://hirebee.app/analyze",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "HireBee ATS Resume Scanner" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free ATS Resume Scanner",
    description: "Get your resume's ATS score in 60 seconds. Find missing keywords and fix what's blocking your interviews.",
    images: ["/api/og"],
  },
}

export default function AnalyzeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
