import Anthropic from "@anthropic-ai/sdk"

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export interface AnalysisResult {
  score: number
  breakdown: {
    formatting: number
    keywords: number
    experience: number
    skills: number
    impact: number
  }
  suggestions: {
    category: string
    issue: string
    fix: string
    severity: "high" | "medium" | "low"
  }[]
  strengths: string[]
  teaserSummary: string
}

export interface JDAnalysisResult extends AnalysisResult {
  matchScore: number
  missingKeywords: string[]
  matchedKeywords: string[]
}

export interface ImprovedCV {
  name: string
  email: string
  phone: string
  location: string
  summary: string
  experience: {
    company: string
    role: string
    period: string
    bullets: string[]
  }[]
  education: {
    institution: string
    degree: string
    period: string
  }[]
  skills: string[]
}

export async function analyzeCV(cvText: string): Promise<AnalysisResult> {
  const prompt = `You are a straight-talking career coach and ex-recruiter. You've reviewed thousands of CVs and you give honest, friendly feedback — like a smart friend who tells it how it is, not a corporate HR consultant.

Review this CV and return a JSON object.

CV TEXT:
${cvText}

Return ONLY valid JSON with this exact structure:
{
  "score": <overall score 0-100>,
  "breakdown": {
    "formatting": <0-100>,
    "keywords": <0-100>,
    "experience": <0-100>,
    "skills": <0-100>,
    "impact": <0-100>
  },
  "strengths": [<2-3 specific strengths as strings>],
  "teaserSummary": <a 2-3 sentence rewritten professional summary for this person — punchy, specific, uses their actual background. Written as if it would appear at the top of their CV.>,
  "suggestions": [
    {
      "category": <"formatting"|"keywords"|"experience"|"skills"|"impact">,
      "issue": <the problem — direct, specific, written in second person ("Your X lacks..." / "You're missing...")>,
      "fix": <exactly what to do — conversational, concrete, starts with an action word. No fluff.>,
      "severity": <"high"|"medium"|"low">
    }
  ]
}

Score criteria:
- formatting: structure, layout, length, readability
- keywords: industry terms, tools, technologies
- experience: clarity, relevance, progression
- skills: breadth, specificity, relevance
- impact: quantified achievements, action verbs, results

Tone rules for issue and fix text:
- Write like you're texting a friend, not filing a report
- Use "you" and "your" — talk to the person directly
- Be honest and specific — name the actual problem, not a vague category
- For fixes: give a real example when possible (e.g. "change 'Managed team' to 'Led 6-person team that shipped X'")
- Keep each issue under 2 sentences. Keep each fix under 3 sentences.
- No corporate jargon, no passive voice

Provide 4-8 suggestions sorted by severity.`

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  })

  const text = message.content[0].type === "text" ? message.content[0].text : ""
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error("Failed to parse analysis response")
  return JSON.parse(jsonMatch[0])
}

export async function analyzeCVvsJD(cvText: string, jobDescription: string): Promise<JDAnalysisResult> {
  const prompt = `You are a straight-talking career coach and ex-recruiter. You've reviewed thousands of CVs and you give honest, friendly feedback — like a smart friend who tells it how it is, not a corporate HR consultant.

Analyze how well this CV matches the job description and return a JSON object.

CV TEXT:
${cvText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON with this exact structure:
{
  "score": <overall CV quality score 0-100>,
  "matchScore": <job match score 0-100>,
  "breakdown": {
    "formatting": <0-100>,
    "keywords": <0-100>,
    "experience": <0-100>,
    "skills": <0-100>,
    "impact": <0-100>
  },
  "matchedKeywords": [<keywords from JD found in CV>],
  "missingKeywords": [<important keywords from JD missing from CV>],
  "strengths": [<2-3 specific strengths relevant to this role>],
  "teaserSummary": <a 2-3 sentence rewritten professional summary tailored to this specific job — punchy, uses their actual background and the job's key requirements.>,
  "suggestions": [
    {
      "category": <"formatting"|"keywords"|"experience"|"skills"|"impact">,
      "issue": <the problem — direct, specific, written in second person. Reference the job where relevant.>,
      "fix": <exactly what to do — conversational, concrete, starts with an action word. Give a real example when possible.>,
      "severity": <"high"|"medium"|"low">
    }
  ]
}

Tone rules for issue and fix text:
- Write like you're texting a friend, not filing a report
- Use "you" and "your" — talk to the person directly
- Be honest and specific — name the actual problem, not a vague category
- For fixes: give a real example when possible (e.g. "swap 'Managed team' for 'Led 6-person team that shipped X on time'")
- Keep each issue under 2 sentences. Keep each fix under 3 sentences.
- No corporate jargon, no passive voice

Focus on what's missing for THIS specific role. Provide 4-8 suggestions sorted by severity.`

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }],
  })

  const text = message.content[0].type === "text" ? message.content[0].text : ""
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error("Failed to parse JD analysis response")
  return JSON.parse(jsonMatch[0])
}

export async function rewriteCV(cvText: string, suggestions: AnalysisResult["suggestions"]): Promise<ImprovedCV> {
  const topFixes = suggestions
    .filter((s) => s.severity === "high" || s.severity === "medium")
    .slice(0, 5)
    .map((s) => `- ${s.fix}`)
    .join("\n")

  const prompt = `You are an expert CV writer. Rewrite the following CV applying these improvements:

IMPROVEMENTS TO APPLY:
${topFixes}

ORIGINAL CV:
${cvText}

Return ONLY valid JSON with this exact structure (extract all info from the CV):
{
  "name": "<full name>",
  "email": "<email>",
  "phone": "<phone or empty string>",
  "location": "<city/country or empty string>",
  "summary": "<2-3 sentence professional summary, punchy and tailored>",
  "experience": [
    {
      "company": "<company name>",
      "role": "<job title>",
      "period": "<e.g. Jan 2022 – Present>",
      "bullets": ["<strong action-verb bullet with quantified impact>", ...]
    }
  ],
  "education": [
    {
      "institution": "<school name>",
      "degree": "<degree and field>",
      "period": "<years>"
    }
  ],
  "skills": ["<skill1>", "<skill2>", ...]
}

Rules:
- Start every bullet with a strong action verb
- Quantify impact where possible (%, $, numbers)
- Keep bullets concise (max 15 words each)
- 3-5 bullets per role
- Skills: 8-15 specific technical/professional skills`

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  })

  const text = message.content[0].type === "text" ? message.content[0].text : ""
  const jsonMatch = text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error("Failed to parse rewrite response")
  return JSON.parse(jsonMatch[0])
}

export async function generateCoverLetter(cvText: string, jobDescription: string, userName: string): Promise<string> {
  const prompt = `You are an expert cover letter writer. Write a compelling, personalized cover letter based on the CV and job description below.

APPLICANT NAME: ${userName}

CV:
${cvText}

JOB DESCRIPTION:
${jobDescription}

Write a cover letter that:
- Opens with a strong, specific hook (not "I am writing to apply for...")
- Connects 2-3 of the applicant's most relevant achievements to the role's needs
- Shows genuine understanding of the company/role
- Closes with a confident, specific call to action
- Is conversational but professional — sounds like a real person, not a robot
- Is 3-4 paragraphs, under 350 words

Return ONLY the cover letter text, no subject line, no date, no address headers. Start directly with "Dear Hiring Manager," or the specific team if evident from the JD.`

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  })

  const text = message.content[0].type === "text" ? message.content[0].text : ""
  return text.trim()
}
