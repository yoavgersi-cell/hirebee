"use client"

export interface CvStyle {
  accentColor: string     // hex
  fontFamily: string      // CSS font-family string
  fontSize: number        // 10–14
  lineHeight: number      // 1.3–1.8
  margins: number         // 16–40 px
  sectionSpacing: number  // 12–32 px
}

export const DEFAULT_STYLE: CvStyle = {
  accentColor: '#0d9488',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  fontSize: 12,
  lineHeight: 1.5,
  margins: 24,
  sectionSpacing: 20,
}

function ha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

export interface CvData {
  name: string
  headline: string
  email: string
  phone: string
  location: string
  summary: string
  experience: { company: string; role: string; period: string; bullets: string[] }[]
  education: { institution: string; degree: string; period: string }[]
  skills: string[]
}

export const TEMPLATES = [
  { id: "nova", label: "Nova" },
  { id: "executive", label: "Executive" },
  { id: "slate", label: "Slate" },
  { id: "clean", label: "Clean" },
  { id: "bold", label: "Bold" },
]

export function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
}

export function NovaTemplate({ cv, style = DEFAULT_STYLE }: { cv: CvData; style?: CvStyle }) {
  const a = style.accentColor
  const m = style.margins
  const g = style.sectionSpacing
  return (
    <div style={{ background: 'white', width: 794, minHeight: 1123, fontFamily: style.fontFamily, fontSize: style.fontSize, lineHeight: style.lineHeight, color: '#111827' }}>
      <div style={{ padding: `${m}px ${m}px ${m * 0.7}px`, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', borderBottom: '1px solid #f3f4f6' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '2em', fontWeight: 700, color: '#111827' }}>{cv.name}</h1>
          {cv.headline && <p style={{ margin: '2px 0 0', fontSize: '1.17em', fontWeight: 500, color: a }}>{cv.headline}</p>}
          <p style={{ margin: '6px 0 0', fontSize: '0.83em', color: '#9ca3af' }}>{[cv.email, cv.phone, cv.location].filter(Boolean).join(' · ')}</p>
        </div>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: ha(a, 0.12), border: `2px solid ${ha(a, 0.3)}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: 16 }}>
          <span style={{ color: a, fontWeight: 700, fontSize: '1em' }}>{getInitials(cv.name)}</span>
        </div>
      </div>
      <div style={{ padding: `${m}px` }}>
        {cv.summary && (
          <div style={{ paddingLeft: 12, borderLeft: `2px solid ${a}`, marginBottom: g }}>
            <h2 style={{ margin: '0 0 6px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a }}>Summary</h2>
            <p style={{ margin: 0, fontSize: '1em', color: '#4b5563' }}>{cv.summary}</p>
          </div>
        )}
        {cv.experience.length > 0 && (
          <div style={{ paddingLeft: 12, borderLeft: `2px solid ${a}`, marginBottom: g }}>
            <h2 style={{ margin: '0 0 8px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a }}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cv.experience.map((exp, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '1.17em', fontWeight: 600, color: '#111827' }}>{exp.role}</p>
                      <p style={{ margin: 0, fontSize: '1em', color: '#6b7280' }}>{exp.company}</p>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.83em', color: '#9ca3af', flexShrink: 0, marginLeft: 16 }}>{exp.period}</p>
                  </div>
                  <ul style={{ margin: '4px 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: 8, fontSize: '1em', color: '#4b5563' }}>
                        <span style={{ color: ha(a, 0.7), flexShrink: 0 }}>▸</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {cv.education.length > 0 && (
          <div style={{ paddingLeft: 12, borderLeft: `2px solid ${a}`, marginBottom: g }}>
            <h2 style={{ margin: '0 0 8px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a }}>Education</h2>
            {cv.education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div>
                  <p style={{ margin: 0, fontSize: '1em', fontWeight: 600, color: '#111827' }}>{edu.degree}</p>
                  <p style={{ margin: 0, fontSize: '1em', color: '#6b7280' }}>{edu.institution}</p>
                </div>
                <p style={{ margin: 0, fontSize: '0.83em', color: '#9ca3af', flexShrink: 0, marginLeft: 16 }}>{edu.period}</p>
              </div>
            ))}
          </div>
        )}
        {cv.skills.length > 0 && (
          <div style={{ paddingLeft: 12, borderLeft: `2px solid ${a}` }}>
            <h2 style={{ margin: '0 0 8px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {cv.skills.map((s) => (
                <span key={s} style={{ fontSize: '0.83em', background: ha(a, 0.08), border: `1px solid ${ha(a, 0.25)}`, color: a, padding: '2px 10px', borderRadius: 20 }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function ExecutiveTemplate({ cv, style = DEFAULT_STYLE }: { cv: CvData; style?: CvStyle }) {
  const a = style.accentColor
  const m = style.margins
  const g = style.sectionSpacing
  return (
    <div style={{ background: 'white', width: 794, minHeight: 1123, fontFamily: style.fontFamily, fontSize: style.fontSize, lineHeight: style.lineHeight, color: '#111827' }}>
      {/* Dark header */}
      <div style={{ background: '#111827', padding: `${m * 0.9}px ${m}px` }}>
        <h1 style={{ margin: 0, fontSize: '2em', fontWeight: 700, color: 'white', letterSpacing: '-0.01em' }}>{cv.name}</h1>
        {cv.headline && <p style={{ margin: '2px 0 0', fontSize: '1.08em', color: '#9ca3af' }}>{cv.headline}</p>}
        <p style={{ margin: '6px 0 0', fontSize: '0.83em', color: '#6b7280' }}>{[cv.email, cv.phone, cv.location].filter(Boolean).join(' · ')}</p>
      </div>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '38%', background: '#f9fafb', borderRight: '1px solid #e5e7eb', padding: m, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: g }}>
          {cv.skills.length > 0 && (
            <div>
              <h2 style={{ margin: '0 0 10px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a }}>Skills</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {cv.skills.map((s) => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: a, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.92em', color: '#374151' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {cv.education.length > 0 && (
            <div>
              <h2 style={{ margin: '0 0 10px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a }}>Education</h2>
              {cv.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <p style={{ margin: 0, fontSize: '0.92em', fontWeight: 600, color: '#111827' }}>{edu.degree}</p>
                  <p style={{ margin: 0, fontSize: '0.83em', color: '#6b7280' }}>{edu.institution}</p>
                  <p style={{ margin: 0, fontSize: '0.83em', color: '#9ca3af' }}>{edu.period}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Main */}
        <div style={{ flex: 1, padding: m, display: 'flex', flexDirection: 'column', gap: g }}>
          {cv.summary && (
            <div>
              <h2 style={{ margin: '0 0 8px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a, paddingBottom: 4, borderBottom: `2px solid ${a}` }}>Summary</h2>
              <p style={{ margin: 0, fontSize: '0.92em', color: '#4b5563', lineHeight: 1.7 }}>{cv.summary}</p>
            </div>
          )}
          {cv.experience.length > 0 && (
            <div>
              <h2 style={{ margin: '0 0 12px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a, paddingBottom: 4, borderBottom: `2px solid ${a}` }}>Experience</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {cv.experience.map((exp, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                      <div>
                        <p style={{ margin: 0, fontSize: '1.08em', fontWeight: 600, color: '#111827' }}>{exp.role}</p>
                        <p style={{ margin: 0, fontSize: '0.92em', color: '#6b7280' }}>{exp.company}</p>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.83em', color: '#9ca3af', flexShrink: 0, marginLeft: 16 }}>{exp.period}</p>
                    </div>
                    <ul style={{ margin: '4px 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} style={{ display: 'flex', gap: 8, fontSize: '0.92em', color: '#4b5563' }}>
                          <span style={{ color: '#d1d5db', flexShrink: 0 }}>•</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function SlateTemplate({ cv, style = DEFAULT_STYLE }: { cv: CvData; style?: CvStyle }) {
  const a = style.accentColor
  const m = style.margins
  const g = style.sectionSpacing
  return (
    <div style={{ display: 'flex', background: 'white', width: 794, minHeight: 1123, fontFamily: style.fontFamily, fontSize: style.fontSize, lineHeight: style.lineHeight, color: '#111827' }}>
      {/* Dark sidebar */}
      <div style={{ width: '38%', background: '#1e293b', padding: m, display: 'flex', flexDirection: 'column', gap: g, flexShrink: 0 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingTop: 8 }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: ha(a, 0.3), border: `2px solid ${ha(a, 0.6)}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '1.08em' }}>{getInitials(cv.name)}</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: 0, fontSize: '1.08em', fontWeight: 700, color: 'white', lineHeight: 1.3 }}>{cv.name}</p>
            {cv.headline && <p style={{ margin: '3px 0 0', fontSize: '0.75em', color: '#94a3b8' }}>{cv.headline}</p>}
          </div>
        </div>
        <div>
          <p style={{ margin: '0 0 8px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a, borderBottom: '1px solid #334155', paddingBottom: 4 }}>Contact</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[cv.email, cv.phone, cv.location].filter(Boolean).map((item, i) => (
              <p key={i} style={{ margin: 0, fontSize: '0.83em', color: '#cbd5e1', wordBreak: 'break-all' }}>{item}</p>
            ))}
          </div>
        </div>
        {cv.skills.length > 0 && (
          <div>
            <p style={{ margin: '0 0 8px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a, borderBottom: '1px solid #334155', paddingBottom: 4 }}>Skills</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {cv.skills.map((s) => (
                <span key={s} style={{ fontSize: '0.75em', color: '#e2e8f0', background: ha(a, 0.25), border: `1px solid ${ha(a, 0.4)}`, padding: '2px 8px', borderRadius: 3 }}>{s}</span>
              ))}
            </div>
          </div>
        )}
        {cv.education.length > 0 && (
          <div>
            <p style={{ margin: '0 0 8px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a, borderBottom: '1px solid #334155', paddingBottom: 4 }}>Education</p>
            {cv.education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <p style={{ margin: 0, fontSize: '0.83em', fontWeight: 600, color: 'white', lineHeight: 1.3 }}>{edu.degree}</p>
                <p style={{ margin: 0, fontSize: '0.75em', color: '#94a3b8' }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Main content */}
      <div style={{ flex: 1, padding: m, display: 'flex', flexDirection: 'column', gap: g }}>
        {cv.summary && (
          <div>
            <h2 style={{ margin: '0 0 8px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a, borderBottom: `1px solid #e2e8f0`, paddingBottom: 4 }}>Summary</h2>
            <p style={{ margin: 0, fontSize: '0.92em', color: '#4b5563', lineHeight: 1.7 }}>{cv.summary}</p>
          </div>
        )}
        {cv.experience.length > 0 && (
          <div>
            <h2 style={{ margin: '0 0 12px', fontSize: '0.75em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: a, borderBottom: `1px solid #e2e8f0`, paddingBottom: 4 }}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {cv.experience.map((exp, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '1.08em', fontWeight: 600, color: '#111827' }}>{exp.role}</p>
                      <p style={{ margin: 0, fontSize: '0.92em', color: '#6b7280' }}>{exp.company}</p>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.83em', color: '#9ca3af', flexShrink: 0, marginLeft: 16 }}>{exp.period}</p>
                  </div>
                  <ul style={{ margin: '4px 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: 8, fontSize: '0.92em', color: '#4b5563' }}>
                        <span style={{ color: ha(a, 0.7), flexShrink: 0 }}>▸</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function CleanTemplate({ cv, style = DEFAULT_STYLE }: { cv: CvData; style?: CvStyle }) {
  const a = style.accentColor
  const m = style.margins
  const g = style.sectionSpacing
  return (
    <div style={{ background: 'white', width: 794, minHeight: 1123, fontFamily: style.fontFamily, fontSize: style.fontSize, lineHeight: style.lineHeight, color: '#111827', padding: m }}>
      {/* Header with accent border */}
      <div style={{ textAlign: 'center', paddingBottom: m * 0.6, marginBottom: g, borderBottom: `3px solid ${a}` }}>
        <h1 style={{ margin: 0, fontSize: '2.5em', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>{cv.name}</h1>
        {cv.headline && <p style={{ margin: '4px 0 0', fontSize: '1.08em', color: '#6b7280', fontStyle: 'italic' }}>{cv.headline}</p>}
        <p style={{ margin: '6px 0 0', fontSize: '0.83em', color: '#9ca3af', letterSpacing: '0.05em' }}>
          {[cv.email, cv.phone, cv.location].filter(Boolean).join('  ·  ')}
        </p>
      </div>
      {cv.summary && (
        <div style={{ marginBottom: g }}>
          <p style={{ margin: 0, fontSize: '1em', color: '#4b5563', lineHeight: 1.8, fontStyle: 'italic' }}>{cv.summary}</p>
        </div>
      )}
      {cv.experience.length > 0 && (
        <div style={{ marginBottom: g }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '0.92em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: a }}>Experience</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cv.experience.map((exp, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
                  <p style={{ margin: 0, fontSize: '1.08em', fontWeight: 700, color: '#111827' }}>
                    {exp.role}, <span style={{ fontWeight: 400, fontStyle: 'italic' }}>{exp.company}</span>
                  </p>
                  <p style={{ margin: 0, fontSize: '0.83em', color: '#9ca3af', flexShrink: 0, marginLeft: 12 }}>{exp.period}</p>
                </div>
                <ul style={{ margin: '4px 0 0', paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: '0.92em', color: '#4b5563', listStyle: 'disc' }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {cv.education.length > 0 && (
        <div style={{ marginBottom: g }}>
          <h2 style={{ margin: '0 0 12px', fontSize: '0.92em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: a }}>Education</h2>
          {cv.education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <p style={{ margin: 0, fontSize: '1em', color: '#111827' }}>
                {edu.degree}, <span style={{ fontStyle: 'italic' }}>{edu.institution}</span>
              </p>
              <p style={{ margin: 0, fontSize: '0.83em', color: '#9ca3af', flexShrink: 0, marginLeft: 12 }}>{edu.period}</p>
            </div>
          ))}
        </div>
      )}
      {cv.skills.length > 0 && (
        <div>
          <h2 style={{ margin: '0 0 12px', fontSize: '0.92em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: a }}>Skills</h2>
          <p style={{ margin: 0, fontSize: '0.92em', color: '#6b7280' }}>{cv.skills.join('  ·  ')}</p>
        </div>
      )}
    </div>
  )
}

export function BoldTemplate({ cv, style = DEFAULT_STYLE }: { cv: CvData; style?: CvStyle }) {
  const a = style.accentColor
  const m = style.margins
  const g = style.sectionSpacing
  return (
    <div style={{ background: 'white', width: 794, minHeight: 1123, fontFamily: style.fontFamily, fontSize: style.fontSize, lineHeight: style.lineHeight, color: '#111827' }}>
      {/* Bold header */}
      <div style={{ background: a, padding: `${m}px ${m}px ${m * 0.9}px` }}>
        <h1 style={{ margin: 0, fontSize: '2.5em', fontWeight: 900, color: 'white', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1 }}>{cv.name}</h1>
        {cv.headline && (
          <p style={{ margin: '8px 0 0', fontSize: '1.08em', fontWeight: 600, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{cv.headline}</p>
        )}
        <p style={{ margin: '6px 0 0', fontSize: '0.83em', color: 'rgba(255,255,255,0.6)' }}>{[cv.email, cv.phone, cv.location].filter(Boolean).join(' · ')}</p>
      </div>
      <div style={{ padding: m, display: 'flex', flexDirection: 'column', gap: g }}>
        {cv.summary && (
          <div style={{ background: ha(a, 0.08), borderRadius: 12, padding: 16 }}>
            <p style={{ margin: 0, fontSize: '1em', color: '#374151', lineHeight: 1.7 }}>{cv.summary}</p>
          </div>
        )}
        {cv.experience.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: '0.83em', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: a }}>Experience</span>
              <div style={{ flex: 1, height: 1, background: a }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {cv.experience.map((exp, i) => (
                <div key={i} style={{ paddingLeft: 12, borderLeft: `4px solid ${a}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 }}>
                    <div>
                      <p style={{ margin: 0, fontSize: '1.08em', fontWeight: 900, color: '#111827', textTransform: 'uppercase' }}>{exp.role}</p>
                      <p style={{ margin: 0, fontSize: '0.92em', fontWeight: 600, color: a }}>{exp.company}</p>
                    </div>
                    <span style={{ fontSize: '0.83em', fontWeight: 600, color: 'white', background: a, padding: '2px 8px', borderRadius: 4, flexShrink: 0, marginLeft: 12 }}>{exp.period}</span>
                  </div>
                  <ul style={{ margin: '6px 0 0', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ display: 'flex', gap: 8, fontSize: '0.92em', color: '#4b5563' }}>
                        <span style={{ color: ha(a, 0.7), flexShrink: 0, fontWeight: 700 }}>→</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {cv.education.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: '0.83em', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: a }}>Education</span>
              <div style={{ flex: 1, height: 1, background: a }} />
            </div>
            {cv.education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.92em', fontWeight: 900, color: '#111827', textTransform: 'uppercase' }}>{edu.degree}</p>
                  <p style={{ margin: 0, fontSize: '0.83em', color: '#6b7280' }}>{edu.institution}</p>
                </div>
                <p style={{ margin: 0, fontSize: '0.83em', color: '#9ca3af', flexShrink: 0, marginLeft: 12 }}>{edu.period}</p>
              </div>
            ))}
          </div>
        )}
        {cv.skills.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: '0.83em', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: a }}>Skills</span>
              <div style={{ flex: 1, height: 1, background: a }} />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {cv.skills.map((s) => (
                <span key={s} style={{ fontSize: '0.83em', fontWeight: 600, background: a, color: 'white', padding: '4px 12px', borderRadius: 20 }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function renderTemplate(cv: CvData, template: string, style: CvStyle = DEFAULT_STYLE) {
  switch (template) {
    case "executive": return <ExecutiveTemplate cv={cv} style={style} />
    case "slate": return <SlateTemplate cv={cv} style={style} />
    case "clean": return <CleanTemplate cv={cv} style={style} />
    case "bold": return <BoldTemplate cv={cv} style={style} />
    default: return <NovaTemplate cv={cv} style={style} />
  }
}

// Sample CV data by job role
export const ROLE_CVS: Record<string, { role: string; cv: CvData }> = {
  "software-engineer": {
    role: "Software Engineer",
    cv: {
      name: "Alex Chen",
      headline: "Senior Software Engineer · Full-Stack · 5 yrs",
      email: "alex.chen@email.com",
      phone: "+44 7700 900123",
      location: "London, UK",
      summary: "Full-stack software engineer with 5 years of experience building scalable web applications. Led teams of 4–8 engineers to ship products used by millions. Passionate about clean code, developer experience, and mentoring junior engineers.",
      experience: [
        {
          company: "Monzo Bank",
          role: "Senior Software Engineer",
          period: "Mar 2022 – Present",
          bullets: [
            "Led migration of legacy payment service to microservices, reducing latency by 40%",
            "Built real-time fraud detection pipeline processing 2M transactions/day",
            "Mentored 3 junior engineers; 2 promoted to mid-level within 12 months",
          ],
        },
        {
          company: "Deliveroo",
          role: "Software Engineer",
          period: "Jan 2020 – Feb 2022",
          bullets: [
            "Developed React Native features for the rider app used by 100k+ couriers",
            "Optimised PostgreSQL queries, cutting dashboard load time from 8s to 1.2s",
          ],
        },
      ],
      education: [
        { institution: "University of Edinburgh", degree: "BSc Computer Science", period: "2016 – 2020" },
      ],
      skills: ["TypeScript", "React", "Node.js", "Go", "PostgreSQL", "Kubernetes", "AWS"],
    },
  },
  "product-manager": {
    role: "Product Manager",
    cv: {
      name: "Priya Sharma",
      headline: "Senior Product Manager · B2B SaaS · 6 yrs",
      email: "priya.sharma@email.com",
      phone: "+44 7700 900456",
      location: "Manchester, UK",
      summary: "Strategic product manager with 6 years driving 0-to-1 products and scaling B2B SaaS platforms. Proven track record of translating complex user needs into roadmaps that deliver measurable business outcomes. MBA from LBS.",
      experience: [
        {
          company: "Permutable AI",
          role: "Senior Product Manager",
          period: "Jun 2021 – Present",
          bullets: [
            "Owned ESG analytics product from concept to £2M ARR within 18 months",
            "Ran 60+ user interviews and synthesised insights into a prioritised roadmap",
            "Reduced churn by 18% through redesigned onboarding flow",
          ],
        },
        {
          company: "Sage",
          role: "Product Manager",
          period: "Sep 2018 – May 2021",
          bullets: [
            "Launched payroll automation feature adopted by 12,000 SME customers",
            "Defined OKRs with engineering, design, and commercial teams",
          ],
        },
      ],
      education: [
        { institution: "London Business School", degree: "MBA", period: "2016 – 2018" },
        { institution: "University of Warwick", degree: "BSc Economics", period: "2013 – 2016" },
      ],
      skills: ["Roadmapping", "User Research", "SQL", "Figma", "JIRA", "A/B Testing", "Stakeholder Management"],
    },
  },
  "data-analyst": {
    role: "Data Analyst",
    cv: {
      name: "Jordan Lee",
      headline: "Senior Data Analyst · SQL · Python · 4 yrs",
      email: "jordan.lee@email.com",
      phone: "+44 7700 900789",
      location: "Edinburgh, UK",
      summary: "Data analyst with 4 years turning messy datasets into clear decisions. Built dashboards used daily by 200+ stakeholders and automated reporting pipelines that saved 15 hours/week. Comfortable across the full stack from SQL to Tableau to Python.",
      experience: [
        {
          company: "abrdn",
          role: "Senior Data Analyst",
          period: "Apr 2022 – Present",
          bullets: [
            "Built fund performance dashboards in Tableau, used by 200+ portfolio managers",
            "Automated monthly regulatory reporting, saving 15 hours per reporting cycle",
            "Developed Python pipeline to clean and merge 10+ data sources for ESG scoring",
          ],
        },
        {
          company: "Skyscanner",
          role: "Data Analyst",
          period: "Jul 2020 – Mar 2022",
          bullets: [
            "Analysed flight search behaviour to identify £3M revenue opportunity",
            "Created self-serve BI layer reducing ad-hoc data requests by 35%",
          ],
        },
      ],
      education: [
        { institution: "University of St Andrews", degree: "BSc Statistics", period: "2016 – 2020" },
      ],
      skills: ["SQL", "Python", "Tableau", "dbt", "BigQuery", "Excel", "R"],
    },
  },
}
