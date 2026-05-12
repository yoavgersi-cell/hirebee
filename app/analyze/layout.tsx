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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the ATS resume scanner free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can scan your resume for free with no account required. Paste your resume and job description and get your ATS score in under 60 seconds.",
      },
    },
    {
      "@type": "Question",
      name: "What does an ATS score mean?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An ATS score tells you how likely your resume is to pass automated applicant tracking system filters. A higher score means more recruiters will actually see your application. HireBee scores keyword match, formatting, and impact language.",
      },
    },
    {
      "@type": "Question",
      name: "How do I improve my ATS score?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Add the exact keywords from the job description, use standard section headings (Experience, Education, Skills), avoid tables and graphics, and quantify your bullet points with numbers and outcomes. HireBee shows you exactly which keywords to add and rewrites weak bullets automatically.",
      },
    },
  ],
}

export default function AnalyzeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      {children}
    </>
  )
}
