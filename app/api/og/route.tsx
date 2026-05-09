import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#030712",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Logo + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "40px" }}>
          <svg width="48" height="50" viewBox="0 0 40 42" fill="none">
            <path d="M19 15 C15 9 2 9 4 18 C5.5 23 14 21 19 17 Z" fill="#93C5FD" opacity="0.75" />
            <path d="M21 15 C25 9 38 9 36 18 C34.5 23 26 21 21 17 Z" fill="#93C5FD" opacity="0.75" />
            <ellipse cx="20" cy="29" rx="10.5" ry="12" fill="#FBBF24" />
            <path d="M10 26 Q20 23 30 26 L30 30 Q20 27 10 30 Z" fill="#1F2937" opacity="0.45" />
            <path d="M10 33 Q20 30 30 33 L30 37 Q20 34 10 37 Z" fill="#1F2937" opacity="0.45" />
            <circle cx="20" cy="14" r="9" fill="#FBBF24" />
            <ellipse cx="16.5" cy="13" rx="4" ry="3.7" fill="white" stroke="#1F2937" strokeWidth="1.3" />
            <ellipse cx="23.5" cy="13" rx="4" ry="3.7" fill="white" stroke="#1F2937" strokeWidth="1.3" />
            <circle cx="17" cy="13" r="1.7" fill="#1F2937" />
            <circle cx="24" cy="13" r="1.7" fill="#1F2937" />
          </svg>
          <span style={{ color: "white", fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px" }}>HireBee</span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            letterSpacing: "-1px",
            marginBottom: "24px",
            maxWidth: "800px",
          }}
        >
          Your resume is getting{" "}
          <span style={{ color: "#14B8A6" }}>ignored.</span>
          <br />
          Let&apos;s fix that.
        </div>

        {/* Subtext */}
        <p style={{ fontSize: "24px", color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: "600px" }}>
          AI-powered resume analysis. See your score, fix every issue, get more interviews.
        </p>

        {/* Bottom tag */}
        <div
          style={{
            position: "absolute",
            bottom: "56px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(20,184,166,0.12)",
            border: "1px solid rgba(20,184,166,0.3)",
            borderRadius: "999px",
            padding: "10px 20px",
          }}
        >
          <span style={{ color: "#14B8A6", fontSize: "16px", fontWeight: 700 }}>hirebee.app</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
