import React from "react"
import { Document, Page, Text, View, StyleSheet, Font, pdf } from "@react-pdf/renderer"

interface CvData {
  name: string; headline?: string; email: string; phone: string; location: string; summary: string
  experience: { company: string; role: string; period: string; bullets: string[] }[]
  education: { institution: string; degree: string; period: string }[]
  skills: string[]
}

interface CvStyle {
  accentColor?: string
  fontFamily?: string
  fontSize?: number
  lineHeight?: number
  margins?: number
  sectionSpacing?: number
}

function hex(color: string) { return color }

// ─── Nova Template ───────────────────────────────────────────────────────────
function NovaPdf({ cv, accent, fontSize, margins, gap }: {
  cv: CvData; accent: string; fontSize: number; margins: number; gap: number
}) {
  const contact = [cv.email, cv.phone, cv.location].filter(Boolean).join("  ·  ")
  const s = StyleSheet.create({
    page: { fontFamily: "Helvetica", fontSize, color: "#1a1a1a", backgroundColor: "white" },
    header: { padding: margins, paddingBottom: margins * 0.7, borderBottom: "1pt solid #f3f4f6", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    name: { fontSize: fontSize * 2, fontFamily: "Helvetica-Bold", color: "#111827" },
    headline: { fontSize: fontSize * 1.1, color: accent, fontFamily: "Helvetica-Bold", marginTop: 2 },
    contact: { fontSize: fontSize * 0.83, color: "#9ca3af", marginTop: 6 },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: accent + "20", border: `1.5pt solid ${accent}60`, alignItems: "center", justifyContent: "center" },
    avatarText: { color: accent, fontFamily: "Helvetica-Bold", fontSize: fontSize * 0.9 },
    body: { padding: margins, paddingTop: gap },
    section: { marginBottom: gap, paddingLeft: 10, borderLeft: `2pt solid ${accent}` },
    sectionTitle: { fontSize: fontSize * 0.75, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.5, color: accent, marginBottom: 6 },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    entryRole: { fontSize: fontSize * 1.08, fontFamily: "Helvetica-Bold" },
    entryCompany: { fontSize: fontSize * 0.92, color: "#666" },
    entryPeriod: { fontSize: fontSize * 0.83, color: "#999" },
    bullet: { fontSize: fontSize * 0.92, color: "#444", marginBottom: 2, lineHeight: 1.5, paddingLeft: 10 },
    summary: { fontSize, color: "#444", lineHeight: 1.6 },
    skillRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
    skill: { fontSize: fontSize * 0.83, color: accent, border: `1pt solid ${accent}60`, backgroundColor: accent + "10", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
    entry: { marginBottom: 10 },
  })
  const initials = cv.name.split(" ").map(n => n[0] ?? "").join("").slice(0, 2).toUpperCase()

  return React.createElement(Document, {},
    React.createElement(Page, { size: "A4", style: s.page },
      // Header
      React.createElement(View, { style: s.header },
        React.createElement(View, {},
          React.createElement(Text, { style: s.name }, cv.name),
          cv.headline ? React.createElement(Text, { style: s.headline }, cv.headline) : null,
          React.createElement(Text, { style: s.contact }, contact),
        ),
        React.createElement(View, { style: s.avatar },
          React.createElement(Text, { style: s.avatarText }, initials),
        ),
      ),
      // Body
      React.createElement(View, { style: s.body },
        cv.summary ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Summary"),
          React.createElement(Text, { style: s.summary }, cv.summary),
        ) : null,
        cv.experience.length ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Experience"),
          ...cv.experience.map((e, i) => React.createElement(View, { key: i, style: s.entry },
            React.createElement(View, { style: s.entryRow },
              React.createElement(View, {},
                React.createElement(Text, { style: s.entryRole }, e.role),
                React.createElement(Text, { style: s.entryCompany }, e.company),
              ),
              React.createElement(Text, { style: s.entryPeriod }, e.period),
            ),
            ...e.bullets.map((b, j) => React.createElement(Text, { key: j, style: s.bullet }, `• ${b}`)),
          )),
        ) : null,
        cv.education.length ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Education"),
          ...cv.education.map((e, i) => React.createElement(View, { key: i, style: s.entry },
            React.createElement(View, { style: s.entryRow },
              React.createElement(View, {},
                React.createElement(Text, { style: s.entryRole }, e.degree),
                React.createElement(Text, { style: s.entryCompany }, e.institution),
              ),
              React.createElement(Text, { style: s.entryPeriod }, e.period),
            ),
          )),
        ) : null,
        cv.skills.length ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Skills"),
          React.createElement(View, { style: s.skillRow },
            ...cv.skills.map((sk, i) => React.createElement(Text, { key: i, style: s.skill }, sk)),
          ),
        ) : null,
      ),
    )
  )
}

// ─── Executive Template ───────────────────────────────────────────────────────
function ExecutivePdf({ cv, accent, fontSize, margins, gap }: {
  cv: CvData; accent: string; fontSize: number; margins: number; gap: number
}) {
  const contact = [cv.email, cv.phone, cv.location].filter(Boolean).join("  ·  ")
  const s = StyleSheet.create({
    page: { fontFamily: "Helvetica", fontSize, color: "#1a1a1a", backgroundColor: "white" },
    header: { backgroundColor: "#111827", padding: margins * 0.9, paddingHorizontal: margins },
    name: { fontSize: fontSize * 2, fontFamily: "Helvetica-Bold", color: "white" },
    headline: { fontSize: fontSize * 1.08, color: "#9ca3af", marginTop: 2 },
    contact: { fontSize: fontSize * 0.83, color: "#6b7280", marginTop: 6 },
    layout: { flexDirection: "row", flex: 1 },
    sidebar: { width: "38%", backgroundColor: "#f9fafb", padding: margins * 0.75, borderRight: "1pt solid #e5e7eb" },
    main: { flex: 1, padding: margins * 0.75 },
    sectionTitle: { fontSize: fontSize * 0.75, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.5, color: accent, marginBottom: 8, marginTop: gap },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    entryRole: { fontSize: fontSize * 1.08, fontFamily: "Helvetica-Bold" },
    entryCompany: { fontSize: fontSize * 0.92, color: "#6b7280" },
    entryPeriod: { fontSize: fontSize * 0.83, color: "#9ca3af" },
    bullet: { fontSize: fontSize * 0.92, color: "#444", marginBottom: 2, lineHeight: 1.5, paddingLeft: 10 },
    summary: { fontSize, color: "#444", lineHeight: 1.6 },
    skillItem: { fontSize: fontSize * 0.92, color: "#374151", marginBottom: 4 },
    entry: { marginBottom: 10 },
  })

  return React.createElement(Document, {},
    React.createElement(Page, { size: "A4", style: s.page },
      React.createElement(View, { style: s.header },
        React.createElement(Text, { style: s.name }, cv.name),
        cv.headline ? React.createElement(Text, { style: s.headline }, cv.headline) : null,
        React.createElement(Text, { style: s.contact }, contact),
      ),
      React.createElement(View, { style: s.layout },
        // Sidebar
        React.createElement(View, { style: s.sidebar },
          cv.skills.length ? React.createElement(View, {},
            React.createElement(Text, { style: s.sectionTitle }, "Skills"),
            ...cv.skills.map((sk, i) => React.createElement(Text, { key: i, style: s.skillItem }, `• ${sk}`)),
          ) : null,
          cv.education.length ? React.createElement(View, {},
            React.createElement(Text, { style: s.sectionTitle }, "Education"),
            ...cv.education.map((e, i) => React.createElement(View, { key: i, style: s.entry },
              React.createElement(Text, { style: s.entryRole }, e.degree),
              React.createElement(Text, { style: s.entryCompany }, e.institution),
              React.createElement(Text, { style: s.entryPeriod }, e.period),
            )),
          ) : null,
        ),
        // Main
        React.createElement(View, { style: s.main },
          cv.summary ? React.createElement(View, {},
            React.createElement(Text, { style: s.sectionTitle }, "Summary"),
            React.createElement(Text, { style: s.summary }, cv.summary),
          ) : null,
          cv.experience.length ? React.createElement(View, {},
            React.createElement(Text, { style: s.sectionTitle }, "Experience"),
            ...cv.experience.map((e, i) => React.createElement(View, { key: i, style: s.entry },
              React.createElement(View, { style: s.entryRow },
                React.createElement(View, {},
                  React.createElement(Text, { style: s.entryRole }, e.role),
                  React.createElement(Text, { style: s.entryCompany }, e.company),
                ),
                React.createElement(Text, { style: s.entryPeriod }, e.period),
              ),
              ...e.bullets.map((b, j) => React.createElement(Text, { key: j, style: s.bullet }, `• ${b}`)),
            )),
          ) : null,
        ),
      ),
    )
  )
}

// ─── Clean Template ───────────────────────────────────────────────────────────
function CleanPdf({ cv, accent, fontSize, margins, gap }: {
  cv: CvData; accent: string; fontSize: number; margins: number; gap: number
}) {
  const contact = [cv.email, cv.phone, cv.location].filter(Boolean).join("  ·  ")
  const s = StyleSheet.create({
    page: { fontFamily: "Helvetica", fontSize, color: "#1a1a1a", backgroundColor: "white" },
    header: { padding: margins, paddingBottom: margins * 0.7 },
    name: { fontSize: fontSize * 2.2, color: "#111827", letterSpacing: -0.5 },
    headline: { fontSize: fontSize * 1.08, color: "#6b7280", fontFamily: "Helvetica-Oblique", marginTop: 4 },
    contact: { fontSize: fontSize * 0.92, color: "#999", marginTop: 8 },
    divider: { height: 3, backgroundColor: accent, marginHorizontal: margins },
    body: { padding: margins, paddingTop: gap },
    section: { marginBottom: gap },
    sectionTitle: { fontSize: fontSize * 0.83, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 2, color: accent, marginBottom: 10 },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    entryRole: { fontSize: fontSize * 1.08, fontFamily: "Helvetica-Bold" },
    entryCompany: { fontSize: fontSize * 0.92, color: "#888", fontFamily: "Helvetica-Oblique" },
    entryPeriod: { fontSize: fontSize * 0.83, color: "#aaa" },
    bullet: { fontSize, color: "#555", marginBottom: 2, lineHeight: 1.6, paddingLeft: 10 },
    summary: { fontSize: fontSize * 1.08, color: "#555", lineHeight: 1.7 },
    skillRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    skill: { fontSize: fontSize * 0.92, color: "#666" },
    entry: { marginBottom: 12 },
  })

  return React.createElement(Document, {},
    React.createElement(Page, { size: "A4", style: s.page },
      React.createElement(View, { style: s.header },
        React.createElement(Text, { style: s.name }, cv.name),
        cv.headline ? React.createElement(Text, { style: s.headline }, cv.headline) : null,
        React.createElement(Text, { style: s.contact }, contact),
      ),
      React.createElement(View, { style: s.divider }),
      React.createElement(View, { style: s.body },
        cv.summary ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Summary"),
          React.createElement(Text, { style: s.summary }, cv.summary),
        ) : null,
        cv.experience.length ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Experience"),
          ...cv.experience.map((e, i) => React.createElement(View, { key: i, style: s.entry },
            React.createElement(View, { style: s.entryRow },
              React.createElement(View, {},
                React.createElement(Text, { style: s.entryRole }, e.role),
                React.createElement(Text, { style: s.entryCompany }, e.company),
              ),
              React.createElement(Text, { style: s.entryPeriod }, e.period),
            ),
            ...e.bullets.map((b, j) => React.createElement(Text, { key: j, style: s.bullet }, `• ${b}`)),
          )),
        ) : null,
        cv.education.length ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Education"),
          ...cv.education.map((e, i) => React.createElement(View, { key: i, style: s.entry },
            React.createElement(View, { style: s.entryRow },
              React.createElement(View, {},
                React.createElement(Text, { style: s.entryRole }, e.degree),
                React.createElement(Text, { style: s.entryCompany }, e.institution),
              ),
              React.createElement(Text, { style: s.entryPeriod }, e.period),
            ),
          )),
        ) : null,
        cv.skills.length ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Skills"),
          React.createElement(View, { style: s.skillRow },
            ...cv.skills.map((sk, i) => React.createElement(Text, { key: i, style: s.skill }, i < cv.skills.length - 1 ? `${sk}  ·` : sk)),
          ),
        ) : null,
      ),
    )
  )
}

// ─── Bold Template ────────────────────────────────────────────────────────────
function BoldPdf({ cv, accent, fontSize, margins, gap }: {
  cv: CvData; accent: string; fontSize: number; margins: number; gap: number
}) {
  const contact = [cv.email, cv.phone, cv.location].filter(Boolean).join("  ·  ")
  const s = StyleSheet.create({
    page: { fontFamily: "Helvetica", fontSize, color: "#1a1a1a", backgroundColor: "white" },
    header: { backgroundColor: accent, padding: margins, paddingBottom: margins * 0.9 },
    name: { fontSize: fontSize * 2.2, fontFamily: "Helvetica-Bold", color: "white", textTransform: "uppercase" },
    headline: { fontSize: fontSize * 1.08, fontFamily: "Helvetica-Bold", color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: 1, marginTop: 6 },
    contact: { fontSize: fontSize * 0.92, color: "rgba(255,255,255,0.6)", marginTop: 6 },
    body: { padding: margins, paddingTop: gap },
    section: { marginBottom: gap },
    sectionTitle: { fontSize: fontSize * 0.83, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 2, color: accent, borderBottom: `1pt solid ${accent}`, paddingBottom: 4, marginBottom: 10 },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    entryWrap: { paddingLeft: 8, borderLeft: `3pt solid ${accent}`, marginBottom: 12 },
    entryRole: { fontSize: fontSize * 1.08, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
    entryCompany: { fontSize: fontSize * 0.92, color: accent, fontFamily: "Helvetica-Bold" },
    entryPeriod: { fontSize: fontSize * 0.83, color: "white", backgroundColor: accent, paddingHorizontal: 5, paddingVertical: 1, borderRadius: 2 },
    bullet: { fontSize: fontSize * 0.92, color: "#444", marginBottom: 2, lineHeight: 1.5, paddingLeft: 10 },
    summary: { fontSize, color: "#444", lineHeight: 1.6 },
    skillRow: { flexDirection: "row", flexWrap: "wrap", gap: 4 },
    skill: { fontSize: fontSize * 0.83, color: "white", backgroundColor: accent, paddingHorizontal: 10, paddingVertical: 2, borderRadius: 10, fontFamily: "Helvetica-Bold" },
    entry: { marginBottom: 10 },
  })

  return React.createElement(Document, {},
    React.createElement(Page, { size: "A4", style: s.page },
      React.createElement(View, { style: s.header },
        React.createElement(Text, { style: s.name }, cv.name),
        cv.headline ? React.createElement(Text, { style: s.headline }, cv.headline) : null,
        React.createElement(Text, { style: s.contact }, contact),
      ),
      React.createElement(View, { style: s.body },
        cv.summary ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Summary"),
          React.createElement(Text, { style: s.summary }, cv.summary),
        ) : null,
        cv.experience.length ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Experience"),
          ...cv.experience.map((e, i) => React.createElement(View, { key: i, style: s.entryWrap },
            React.createElement(View, { style: s.entryRow },
              React.createElement(View, {},
                React.createElement(Text, { style: s.entryRole }, e.role),
                React.createElement(Text, { style: s.entryCompany }, e.company),
              ),
              React.createElement(Text, { style: s.entryPeriod }, e.period),
            ),
            ...e.bullets.map((b, j) => React.createElement(Text, { key: j, style: s.bullet }, `• ${b}`)),
          )),
        ) : null,
        cv.education.length ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Education"),
          ...cv.education.map((e, i) => React.createElement(View, { key: i, style: s.entry },
            React.createElement(View, { style: s.entryRow },
              React.createElement(View, {},
                React.createElement(Text, { style: s.entryRole }, e.degree),
                React.createElement(Text, { style: s.entryCompany }, e.institution),
              ),
              React.createElement(Text, { style: s.entryPeriod }, e.period),
            ),
          )),
        ) : null,
        cv.skills.length ? React.createElement(View, { style: s.section },
          React.createElement(Text, { style: s.sectionTitle }, "Skills"),
          React.createElement(View, { style: s.skillRow },
            ...cv.skills.map((sk, i) => React.createElement(Text, { key: i, style: s.skill }, sk)),
          ),
        ) : null,
      ),
    )
  )
}

// ─── Slate Template ───────────────────────────────────────────────────────────
function SlatePdf({ cv, accent, fontSize, margins, gap }: {
  cv: CvData; accent: string; fontSize: number; margins: number; gap: number
}) {
  const s = StyleSheet.create({
    page: { fontFamily: "Helvetica", fontSize, color: "#1a1a1a", backgroundColor: "white", flexDirection: "row" },
    sidebar: { width: "36%", backgroundColor: "#1e293b", padding: margins * 0.75, color: "white" },
    initials: { fontSize: fontSize * 1.5, fontFamily: "Helvetica-Bold", color: "white", textAlign: "center", marginBottom: 4 },
    sidebarName: { fontSize: fontSize * 1.25, fontFamily: "Helvetica-Bold", color: "white", textAlign: "center", lineHeight: 1.3 },
    sidebarRole: { fontSize: fontSize * 0.83, color: "#94a3b8", textAlign: "center", marginTop: 3, marginBottom: gap },
    sidebarSectionTitle: { fontSize: fontSize * 0.67, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.5, color: accent, borderBottom: `1pt solid #334155`, paddingBottom: 4, marginBottom: 8, marginTop: gap * 0.8 },
    contactItem: { fontSize: fontSize * 0.83, color: "#cbd5e1", marginBottom: 4 },
    skill: { fontSize: fontSize * 0.75, backgroundColor: "#334155", color: "#e2e8f0", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, marginBottom: 3 },
    eduTitle: { fontSize: fontSize * 0.83, fontFamily: "Helvetica-Bold", color: "white" },
    eduSub: { fontSize: fontSize * 0.75, color: "#94a3b8" },
    main: { flex: 1, padding: margins * 0.85 },
    sectionTitle: { fontSize: fontSize * 0.75, fontFamily: "Helvetica-Bold", textTransform: "uppercase", letterSpacing: 1.5, color: accent, borderBottom: `1pt solid #e2e8f0`, paddingBottom: 4, marginBottom: 10, marginTop: gap * 0.8 },
    entryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
    entryRole: { fontSize: fontSize * 1.08, fontFamily: "Helvetica-Bold" },
    entryCompany: { fontSize: fontSize * 0.92, color: "#6b7280" },
    entryPeriod: { fontSize: fontSize * 0.83, color: "#9ca3af" },
    bullet: { fontSize: fontSize * 0.92, color: "#444", marginBottom: 2, lineHeight: 1.5, paddingLeft: 10 },
    summary: { fontSize, color: "#444", lineHeight: 1.6 },
    entry: { marginBottom: 10 },
  })
  const initials = cv.name.split(" ").map(n => n[0] ?? "").join("").slice(0, 2).toUpperCase()

  return React.createElement(Document, {},
    React.createElement(Page, { size: "A4", style: s.page },
      // Sidebar
      React.createElement(View, { style: s.sidebar },
        React.createElement(Text, { style: s.initials }, initials),
        React.createElement(Text, { style: s.sidebarName }, cv.name),
        cv.headline ? React.createElement(Text, { style: s.sidebarRole }, cv.headline) : null,
        React.createElement(Text, { style: s.sidebarSectionTitle }, "Contact"),
        ...[cv.email, cv.phone, cv.location].filter(Boolean).map((c, i) =>
          React.createElement(Text, { key: i, style: s.contactItem }, c)
        ),
        cv.skills.length ? React.createElement(View, {},
          React.createElement(Text, { style: s.sidebarSectionTitle }, "Skills"),
          ...cv.skills.map((sk, i) => React.createElement(Text, { key: i, style: s.skill }, sk)),
        ) : null,
        cv.education.length ? React.createElement(View, {},
          React.createElement(Text, { style: s.sidebarSectionTitle }, "Education"),
          ...cv.education.map((e, i) => React.createElement(View, { key: i, style: s.entry },
            React.createElement(Text, { style: s.eduTitle }, e.degree),
            React.createElement(Text, { style: s.eduSub }, e.institution),
            React.createElement(Text, { style: s.eduSub }, e.period),
          )),
        ) : null,
      ),
      // Main
      React.createElement(View, { style: s.main },
        cv.summary ? React.createElement(View, {},
          React.createElement(Text, { style: s.sectionTitle }, "Summary"),
          React.createElement(Text, { style: s.summary }, cv.summary),
        ) : null,
        cv.experience.length ? React.createElement(View, {},
          React.createElement(Text, { style: s.sectionTitle }, "Experience"),
          ...cv.experience.map((e, i) => React.createElement(View, { key: i, style: s.entry },
            React.createElement(View, { style: s.entryRow },
              React.createElement(View, {},
                React.createElement(Text, { style: s.entryRole }, e.role),
                React.createElement(Text, { style: s.entryCompany }, e.company),
              ),
              React.createElement(Text, { style: s.entryPeriod }, e.period),
            ),
            ...e.bullets.map((b, j) => React.createElement(Text, { key: j, style: s.bullet }, `• ${b}`)),
          )),
        ) : null,
      ),
    )
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export async function generatePdf(cvData: object, template: string, style?: CvStyle): Promise<Buffer> {
  const cv = cvData as CvData
  const accent = style?.accentColor ?? "#0d9488"
  const fontSize = style?.fontSize ?? 11
  const margins = style?.margins ?? 24
  const gap = style?.sectionSpacing ?? 20

  const props = { cv, accent, fontSize, margins, gap }

  let doc: React.ReactElement
  if (template === "executive") doc = React.createElement(ExecutivePdf, props)
  else if (template === "clean") doc = React.createElement(CleanPdf, props)
  else if (template === "bold") doc = React.createElement(BoldPdf, props)
  else if (template === "slate") doc = React.createElement(SlatePdf, props)
  else doc = React.createElement(NovaPdf, props)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blob = await pdf(doc as any).toBlob()
  const arrayBuffer = await blob.arrayBuffer()
  return Buffer.from(arrayBuffer)
}
