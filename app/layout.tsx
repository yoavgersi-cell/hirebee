import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Toaster } from "@/components/ui/sonner"
import { Providers } from "./providers"
import { Analytics } from "@vercel/analytics/next"

const BASE = "https://hirebee.app"

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: "HireBee — AI Resume Analyzer & Optimizer",
    template: "%s | HireBee",
  },
  description:
    "Get your resume score in 60 seconds. HireBee's AI finds exactly why you're not getting callbacks, rewrites weak bullet points, matches keywords to the job, and exports a clean ATS-friendly PDF.",
  keywords: [
    "resume analyzer", "ATS resume checker", "AI resume optimizer",
    "resume score", "CV analyzer", "resume keywords", "cover letter generator",
    "get more interviews", "resume feedback", "resume builder",
  ],
  authors: [{ name: "HireBee", url: BASE }],
  creator: "HireBee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE,
    siteName: "HireBee",
    title: "HireBee — AI Resume Analyzer & Optimizer",
    description:
      "See your resume score in 60 seconds. Fix missing keywords, rewrite weak bullets, and download a clean PDF. Get more interviews.",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "HireBee — AI Resume Analyzer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HireBee — AI Resume Analyzer & Optimizer",
    description: "See your resume score in 60 seconds. Fix what's blocking you from getting interviews.",
    images: ["/api/og"],
    creator: "@hirebeeapp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: BASE },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
