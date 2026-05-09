import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free Resume Examples by Role — ATS-Optimized CV Templates",
  description:
    "Browse ATS-optimized resume examples for Software Engineer, Product Manager, Data Scientist, Marketing Manager, Sales, UX Designer, Finance, and Operations roles. Download and customize professional CV templates.",
  alternates: { canonical: "https://hirebee.app/cv-examples" },
  keywords: [
    "resume examples", "CV templates", "ATS resume templates",
    "software engineer resume", "product manager resume", "data scientist CV",
    "marketing manager resume", "sales resume template", "UX designer CV",
    "free resume templates", "professional CV examples",
  ],
  openGraph: {
    title: "Free Resume Examples by Role — ATS-Optimized CV Templates",
    description:
      "ATS-optimized resume templates for every career. Browse professional CV examples for Software Engineer, Product Manager, Data Scientist, and more.",
    url: "https://hirebee.app/cv-examples",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "HireBee Resume Examples" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Examples — ATS-Optimized by Role",
    description: "Download ATS-friendly CV templates for Software Engineer, PM, Data Scientist, Marketing, Sales, and more.",
    images: ["/api/og"],
  },
}

export default function CvExamplesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
