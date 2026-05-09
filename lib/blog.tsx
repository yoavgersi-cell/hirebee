import React from "react"

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string        // display: "October 15, 2025"
  isoDate: string     // SEO/sort: "2025-10-15"
  readTime: string
  category: string
}

export const POSTS: BlogPost[] = [
  {
    slug: "how-to-write-a-resume-from-scratch",
    title: "How to Write a Resume From Scratch in 2026 (Step-by-Step)",
    description: "Never written a resume before? This step-by-step guide covers every section, what to include, what to skip, and how to format it so it actually gets read.",
    date: "August 20, 2025",
    isoDate: "2025-08-20",
    readTime: "9 min read",
    category: "Resume Tips",
  },
  {
    slug: "resume-format-guide",
    title: "The Best Resume Format for 2026: Chronological, Functional, or Hybrid?",
    description: "Your resume format affects how ATS reads it and how recruiters respond to it. Here's which format to use — and which one most people get wrong.",
    date: "September 10, 2025",
    isoDate: "2025-09-10",
    readTime: "6 min read",
    category: "Resume Tips",
  },
  {
    slug: "resume-with-no-experience",
    title: "How to Write a Resume With No Work Experience",
    description: "No job history doesn't mean no resume. Here's how to build a compelling resume as a student, career changer, or first-time job seeker — and pass ATS while you're at it.",
    date: "September 25, 2025",
    isoDate: "2025-09-25",
    readTime: "7 min read",
    category: "ATS & Job Search",
  },
  {
    slug: "why-resumes-never-reach-recruiters",
    title: "Why 75% of Resumes Never Reach a Human Recruiter",
    description: "Most job seekers don't know their application is rejected before anyone reads it. Here's how ATS software works — and what you can do about it.",
    date: "October 15, 2025",
    isoDate: "2025-10-15",
    readTime: "6 min read",
    category: "ATS & Job Search",
  },
  {
    slug: "ats-keywords-guide",
    title: "ATS Keywords: How to Find and Use Them to Get More Interviews",
    description: "Keyword optimisation is the single biggest lever job seekers ignore. Learn how to identify the right keywords and embed them naturally in your resume.",
    date: "November 28, 2025",
    isoDate: "2025-11-28",
    readTime: "7 min read",
    category: "Resume Tips",
  },
  {
    slug: "how-to-write-cover-letter",
    title: "How to Write a Cover Letter That Actually Gets Read",
    description: "Most cover letters say the same things. Here's a simple, repeatable framework that makes yours stand out — even to recruiters who barely skim them.",
    date: "January 8, 2026",
    isoDate: "2026-01-08",
    readTime: "5 min read",
    category: "Cover Letters",
  },
  {
    slug: "linkedin-profile-optimization",
    title: "LinkedIn Profile Optimization: Get More Recruiter Messages in 2026",
    description: "Recruiters use LinkedIn search every day. If your profile isn't optimised, you're invisible. Here's exactly how to fix it.",
    date: "February 14, 2026",
    isoDate: "2026-02-14",
    readTime: "8 min read",
    category: "LinkedIn",
  },
  {
    slug: "resume-ats-score-explained",
    title: "Your Resume ATS Score Explained: What It Means and How to Improve It",
    description: "An ATS score isn't a grade — it's a diagnostic. Understanding what goes into it is the first step to fixing what's holding your resume back.",
    date: "March 5, 2026",
    isoDate: "2026-03-05",
    readTime: "6 min read",
    category: "ATS & Job Search",
  },
  {
    slug: "software-engineer-resume-ats",
    title: "Software Engineer Resume: Keywords and Format That Pass ATS in 2026",
    description: "Tech resumes fail ATS for specific, fixable reasons. Here's what hiring systems look for in a software engineer resume — and how to make yours pass.",
    date: "April 2, 2026",
    isoDate: "2026-04-02",
    readTime: "7 min read",
    category: "Resume Tips",
  },
  {
    slug: "how-to-explain-career-gap",
    title: "How to Explain a Career Gap on Your Resume (Without Killing Your Chances)",
    description: "A gap in your employment history isn't a dealbreaker — but how you handle it on your resume and in interviews can be. Here's what actually works.",
    date: "December 10, 2025",
    isoDate: "2025-12-10",
    readTime: "6 min read",
    category: "ATS & Job Search",
  },
  {
    slug: "resume-summary-vs-objective",
    title: "Resume Summary vs Objective: Which One to Use and How to Write It",
    description: "Most people either skip this section or fill it with clichés. A well-written summary is some of the most valuable real estate on your resume — here's how to use it.",
    date: "December 22, 2025",
    isoDate: "2025-12-22",
    readTime: "5 min read",
    category: "Resume Tips",
  },
  {
    slug: "how-to-tailor-resume-for-every-job",
    title: "How to Tailor Your Resume for Every Job Application (Without Starting Over)",
    description: "Sending the same resume everywhere is the most common job-search mistake. Here's a fast, repeatable system for tailoring your resume in under 15 minutes.",
    date: "January 22, 2026",
    isoDate: "2026-01-22",
    readTime: "6 min read",
    category: "Resume Tips",
  },
  {
    slug: "product-manager-resume-ats",
    title: "Product Manager Resume: Keywords and Format That Get PM Interviews",
    description: "PM roles are some of the most competitive in tech. Here's exactly what ATS systems and hiring managers look for on a product manager resume in 2026.",
    date: "March 18, 2026",
    isoDate: "2026-03-18",
    readTime: "7 min read",
    category: "Resume Tips",
  },
  {
    slug: "how-long-should-a-resume-be",
    title: "How Long Should a Resume Be? The Definitive Answer for 2026",
    description: "One page or two? The answer depends on your experience level — but most people get it wrong in one direction or the other. Here's the rule that actually holds up.",
    date: "April 15, 2026",
    isoDate: "2026-04-15",
    readTime: "5 min read",
    category: "Resume Tips",
  },
  {
    slug: "remote-job-resume-tips",
    title: "Remote Job Resume: How to Position Yourself for Work-From-Home Roles",
    description: "Remote hiring is competitive and the screening process is different. Here's how to optimise your resume specifically for remote and hybrid job applications.",
    date: "April 25, 2026",
    isoDate: "2026-04-25",
    readTime: "6 min read",
    category: "ATS & Job Search",
  },
  {
    slug: "sales-resume-keywords",
    title: "Sales Resume: Keywords and Bullet Points That Actually Get Interviews",
    description: "Sales hiring managers want proof of results — and so does ATS. Here's how to write a sales resume that passes the filter and makes a recruiter pick up the phone.",
    date: "May 1, 2026",
    isoDate: "2026-05-01",
    readTime: "6 min read",
    category: "Resume Tips",
  },
  {
    slug: "linkedin-vs-resume-differences",
    title: "LinkedIn Profile vs Resume: What's Different and Why It Matters",
    description: "Your LinkedIn profile and resume aren't the same document. Using one as a copy of the other is a missed opportunity. Here's how to use both strategically.",
    date: "May 3, 2026",
    isoDate: "2026-05-03",
    readTime: "5 min read",
    category: "LinkedIn",
  },
  {
    slug: "data-analyst-resume-ats",
    title: "Data Analyst Resume: Keywords and Format That Pass ATS in 2026",
    description: "Data roles are among the most keyword-sensitive for ATS. Here's exactly what to include — from SQL to storytelling — to get your analyst resume past the filter.",
    date: "October 5, 2025",
    isoDate: "2025-10-05",
    readTime: "7 min read",
    category: "Resume Tips",
  },
  {
    slug: "project-manager-resume-ats",
    title: "Project Manager Resume: ATS Keywords That Get PM Jobs in 2026",
    description: "Project management resumes fail ATS for predictable reasons. Here's what hiring systems look for, which keywords matter most, and how to format yours correctly.",
    date: "November 5, 2025",
    isoDate: "2025-11-05",
    readTime: "7 min read",
    category: "Resume Tips",
  },
  {
    slug: "thank-you-email-after-interview",
    title: "How to Write a Thank You Email After an Interview (With Examples)",
    description: "Most candidates don't send a follow-up. The ones who do stand out. Here's what a good thank you email looks like — and what it should never say.",
    date: "November 15, 2025",
    isoDate: "2025-11-15",
    readTime: "5 min read",
    category: "ATS & Job Search",
  },
  {
    slug: "finance-resume-keywords",
    title: "Finance Resume: Keywords for Accountants, Analysts, and CFOs",
    description: "Finance hiring is structured, keyword-driven, and credential-sensitive. Here's how to write a finance resume that passes ATS and impresses hiring panels.",
    date: "January 30, 2026",
    isoDate: "2026-01-30",
    readTime: "6 min read",
    category: "Resume Tips",
  },
  {
    slug: "marketing-resume-ats",
    title: "Marketing Resume: ATS Keywords and Bullet Points That Land Interviews",
    description: "Marketing is a broad field with highly specific ATS requirements. Here's how to position your marketing resume — from content to performance — for the role you want.",
    date: "February 28, 2026",
    isoDate: "2026-02-28",
    readTime: "7 min read",
    category: "Resume Tips",
  },
  {
    slug: "internship-resume-guide",
    title: "Internship Resume: How to Get Your First Interview With No Experience",
    description: "Competing for internships without work history feels impossible — but the rules are different from a professional job search. Here's how to build a resume that stands out.",
    date: "March 28, 2026",
    isoDate: "2026-03-28",
    readTime: "6 min read",
    category: "ATS & Job Search",
  },
  {
    slug: "how-many-jobs-to-apply-to",
    title: "How Many Jobs Should You Apply to? The Data-Backed Answer",
    description: "Job searching without a strategy burns time and morale. Here's what the data says about application volume, response rates, and how to improve your odds.",
    date: "April 10, 2026",
    isoDate: "2026-04-10",
    readTime: "5 min read",
    category: "ATS & Job Search",
  },
]

// ─── Post content ────────────────────────────────────────────────────────────

export const POST_CONTENT: Record<string, React.ReactNode> = {

  "how-to-write-a-resume-from-scratch": (
    <>
      <p>Writing your first resume — or rebuilding one from scratch — feels daunting. There are dozens of opinions about what to include, how long it should be, and what format to use. Most of the advice contradicts itself.</p>
      <p>This guide cuts through that. Here is every section you need, what goes in each one, and how to put it together so it works for both ATS software and the human recruiter who reads it next.</p>

      <h2>Step 1: Choose the Right Format</h2>
      <p>For most people, a <strong>reverse-chronological format</strong> is the right choice. It lists your most recent experience first and works well with ATS systems because it's what they're designed to parse.</p>
      <p>Avoid multi-column layouts, sidebars, and heavily designed templates. They look impressive as a visual but often break ATS parsing. A clean, single-column document in a standard font (Calibri, Arial, Georgia) is both ATS-friendly and professional.</p>

      <h2>Step 2: Contact Information</h2>
      <p>At the very top of your resume, include:</p>
      <ul>
        <li>Full name (large, bold)</li>
        <li>Professional email address</li>
        <li>Phone number</li>
        <li>City and country (or region — you don't need your full street address)</li>
        <li>LinkedIn URL</li>
        <li>GitHub or portfolio link (if relevant to your field)</li>
      </ul>
      <p>Keep this in the main body of the document, not in a header or footer — ATS systems often can't read those areas.</p>

      <h2>Step 3: Professional Summary</h2>
      <p>A professional summary is 2–4 sentences at the top of your resume that describe who you are, what you do, and what you bring to a role. It's the first thing a recruiter reads and the last thing most people write.</p>
      <p><strong>Good summary formula:</strong> [Role/level] with [X years] of experience in [domain]. Known for [core strength]. Seeking [type of role] where I can [value you bring].</p>
      <p><strong>Example:</strong> "Results-oriented marketing manager with 5 years of B2B SaaS experience. Specialised in demand generation and account-based marketing. Track record of growing pipeline by 40%+ through SEO and paid acquisition programmes."</p>
      <p>Tailor this section to every job you apply for. Include keywords from the job description.</p>

      <h2>Step 4: Work Experience</h2>
      <p>This is the heart of your resume. For each role, include:</p>
      <ul>
        <li>Job title</li>
        <li>Company name</li>
        <li>Location (city and country)</li>
        <li>Dates (month and year — "June 2022 – Present")</li>
        <li>3–5 bullet points describing your achievements</li>
      </ul>
      <p>Write bullet points around achievements, not responsibilities. "Responsible for managing social media" is weak. "Grew Instagram following from 4K to 22K in 8 months through a twice-weekly educational content series" is strong.</p>
      <p>Use the formula: <strong>Action verb + what you did + measurable result</strong>. Numbers don't have to be revenue — they can be percentages, time saved, team size, users affected, or projects delivered.</p>

      <h2>Step 5: Skills</h2>
      <p>A dedicated skills section is essential. It gives ATS a clear list of your technical capabilities and gives recruiters a fast way to see your qualifications at a glance.</p>
      <p>Include: technical skills, tools and software, languages, methodologies. Separate hard skills (Excel, Python, Salesforce) from soft skills (or skip soft skills entirely — they're better shown through your experience bullets).</p>

      <h2>Step 6: Education</h2>
      <p>List your highest qualification first. Include: degree and field of study, institution name, graduation year. If you graduated recently, you can add relevant coursework or your GPA if it's strong (3.5+).</p>
      <p>If you have several years of work experience, keep the education section brief. If you're a recent graduate, it can be more prominent.</p>

      <h2>Step 7: Optional Sections</h2>
      <p>Depending on your background, you might also include:</p>
      <ul>
        <li><strong>Projects</strong> — especially valuable for recent graduates or career changers</li>
        <li><strong>Certifications</strong> — include the issuing body and year</li>
        <li><strong>Volunteer work</strong> — if relevant to the role or demonstrates transferable skills</li>
        <li><strong>Languages</strong> — include your level (native, fluent, conversational)</li>
      </ul>

      <h2>Step 8: Tailor Before You Submit</h2>
      <p>A generic resume sent to every job is one of the most common job-search mistakes. Before applying, read the job description carefully and adjust your summary, skills, and key bullet points to match the language and requirements of that specific role.</p>
      <p>This is the step most people skip — and it's often the reason their well-written resume gets no responses. Each role has a different keyword profile, and ATS scores your resume against that profile. Tailoring takes 10–15 minutes and significantly improves your chances.</p>

      <h2>Final Check</h2>
      <p>Before submitting, verify:</p>
      <ul>
        <li>No typos or grammatical errors (read it aloud to catch them)</li>
        <li>Consistent formatting: same font, same bullet style, same date format throughout</li>
        <li>File saved as a PDF (unless the application specifically requests .docx)</li>
        <li>Filename is professional: "FirstName-LastName-Resume.pdf"</li>
      </ul>
      <p>Once it's ready, run it through an ATS scanner to see how it scores against the job description before you hit submit. Knowing your score — and what's missing — lets you fix problems before they cost you an interview.</p>
    </>
  ),

  "resume-format-guide": (
    <>
      <p>Resume format sounds like a minor detail. It isn't. The wrong format can cause your resume to score zero on an ATS even if your experience is perfect for the role. And even after passing ATS, a confusing layout can lose a recruiter's attention in the first five seconds.</p>
      <p>There are three main resume formats. Here's what each one is, when to use it, and what most people get wrong.</p>

      <h2>The Three Formats</h2>

      <h3>1. Reverse-Chronological</h3>
      <p>The most common format. Lists your work experience starting with your most recent role and working backwards. Each entry includes your job title, company, dates, and bullet points describing your responsibilities and achievements.</p>
      <p><strong>Best for:</strong> Most people. If you have consistent work history in a clear career direction, this is the format to use.</p>
      <p><strong>ATS compatibility:</strong> Excellent. ATS systems are designed to parse this format. It's the safe default.</p>

      <h3>2. Functional (Skills-Based)</h3>
      <p>Leads with a skills section and de-emphasises dates and specific employers. The idea is to highlight capabilities over chronology — often used by career changers or people with significant gaps.</p>
      <p><strong>The problem:</strong> ATS systems handle functional resumes poorly. They look for date-ordered experience to categorise your history. A skills-heavy format confuses the parser and often scores badly. Recruiters are also suspicious of functional resumes because they're commonly used to hide gaps or lack of direct experience.</p>
      <p><strong>Best for:</strong> Almost nobody, for these reasons. If you're trying to hide something, address it directly instead.</p>

      <h3>3. Hybrid (Combination)</h3>
      <p>Combines a prominent skills or summary section with a reverse-chronological experience section. Gives you keyword-rich content at the top while maintaining the structure ATS systems expect.</p>
      <p><strong>Best for:</strong> Mid-to-senior professionals, career changers with transferable skills, or anyone who wants to lead with expertise before detailing their history. This is the format most likely to serve you well if you're not a straight chronological case.</p>
      <p><strong>ATS compatibility:</strong> Good, as long as the experience section is properly structured.</p>

      <h2>The Format Question Most People Miss: Layout vs. Structure</h2>
      <p>When most people talk about "format," they mean visual layout — how the resume looks. But the structural decisions matter far more for ATS:</p>
      <ul>
        <li><strong>Single column vs. multi-column</strong> — Multi-column layouts are the single biggest cause of ATS parsing failures. The software reads left-to-right across the full page width, meaning a two-column layout gets scrambled. Your job title ends up next to your university. Avoid multi-column entirely.</li>
        <li><strong>Headers and footers</strong> — ATS systems frequently can't read content placed in document headers or footers. Keep your contact information in the main body.</li>
        <li><strong>Text boxes and tables</strong> — Same issue. Text inside boxes or table cells is often invisible to ATS parsers. Use plain text with standard formatting.</li>
        <li><strong>Graphics and icons</strong> — Skill bars, icons, and decorative elements can't be read by ATS. They also add visual noise for human readers. Leave them out.</li>
      </ul>

      <h2>What Font and Size to Use</h2>
      <p>Use a standard, widely supported font: Calibri, Arial, Georgia, or Times New Roman. Font size 10–12pt for body text, 14–16pt for your name. Consistency matters more than the specific choice.</p>

      <h2>How Many Pages?</h2>
      <p>One page for fewer than 5 years of experience. Two pages for more. Beyond two pages, you should be editing, not expanding. Recruiters rarely read beyond page two for standard roles.</p>

      <h2>The Right Format for You</h2>
      <p>In most cases: reverse-chronological layout, single column, standard fonts, no graphics. If you have 5+ years of experience or are making a career change, a hybrid format with a strong summary and skills section at the top works well.</p>
      <p>Whatever you choose, run it through an ATS checker before submitting. Format issues that are invisible to the human eye can silently tank your score and disqualify your application before anyone reads a word.</p>
    </>
  ),

  "resume-with-no-experience": (
    <>
      <p>If you've never held a formal job, writing a resume feels like a circular problem: you need experience to get a job, but you need a job to get experience. The good news is this framing is wrong.</p>
      <p>You have experience. It's just not in the format you've been taught to recognise. Here's how to surface it, structure it, and write a resume that can pass ATS and convince a hiring manager to give you a shot.</p>

      <h2>Who This Applies To</h2>
      <p>This guide is for recent graduates, school leavers, career changers moving into a new field, returning parents, or anyone who lacks traditional paid work history in the role they're targeting.</p>

      <h2>Start With What You Have</h2>
      <p>Before writing anything, list out every relevant experience you've had — paid or unpaid:</p>
      <ul>
        <li>Internships or work placements</li>
        <li>University or school projects relevant to the role</li>
        <li>Freelance or self-employed work (tutoring, design, writing, coding)</li>
        <li>Volunteer roles</li>
        <li>Clubs, societies, or student organisations you led or contributed to</li>
        <li>Personal projects (apps you've built, a blog, a YouTube channel, open source contributions)</li>
        <li>Part-time jobs, even if unrelated (they demonstrate reliability, work ethic, customer skills)</li>
      </ul>
      <p>Most people have more than they realise when they actually sit down and list it all.</p>

      <h2>Resume Structure When You Have No Traditional Experience</h2>

      <h3>Lead with a strong summary</h3>
      <p>Your professional summary is your chance to frame your background before the recruiter forms a judgement. Don't apologise for limited experience — describe what you bring.</p>
      <p><strong>Example:</strong> "Recent computer science graduate with hands-on experience building production-ready web apps in React and Node.js. Contributed to two open source projects with 400+ stars on GitHub. Looking for a junior developer role where I can grow into full-stack engineering."</p>

      <h3>Prioritise your skills section</h3>
      <p>For roles where you lack experience but have skills, a prominent skills section near the top helps ATS match you to the job description and helps recruiters quickly see your technical or functional capabilities.</p>

      <h3>Projects section</h3>
      <p>If you're applying to a technical or creative role, a projects section can carry as much weight as a work experience section. For each project, include:</p>
      <ul>
        <li>What it does (one sentence)</li>
        <li>Technologies or tools used</li>
        <li>Your specific contribution</li>
        <li>Any measurable outcome (users, downloads, results)</li>
      </ul>

      <h3>Education section</h3>
      <p>If you're a recent graduate, your education section should be prominent and detailed. Include: degree, university, graduation year, relevant modules, dissertation or thesis title (if applicable), academic achievements.</p>

      <h3>Volunteer and extracurricular roles</h3>
      <p>Treat these exactly like work experience. For each, write bullet points around what you did and what it achieved — not just that you participated. "Volunteered at local food bank" is a line item. "Coordinated weekly logistics for 40-volunteer food distribution programme, serving 300 families per week" tells a story about capability.</p>

      <h2>How to Write Bullet Points Without Work Experience</h2>
      <p>The same rule applies as for experienced candidates: lead with an action verb, describe what you did, and include a measurable result where possible.</p>
      <ul>
        <li>"Designed and shipped a personal finance app in React Native with 200+ downloads on the App Store"</li>
        <li>"Led a team of 6 students to deliver a market research project for a local SME, presenting findings to the CEO"</li>
        <li>"Grew a student society's membership from 30 to 120 members in one academic year through events and social media"</li>
      </ul>

      <h2>Keywords Still Matter</h2>
      <p>Even without experience, your resume needs to match the job description's keywords to pass ATS screening. Read the job posting carefully and make sure the skills, tools, and terms it mentions appear in your resume — naturally, in context.</p>

      <h2>What Not to Do</h2>
      <ul>
        <li>Don't pad with irrelevant jobs — if your only experience is an unrelated part-time role, keep it brief and focus on transferable skills</li>
        <li>Don't list hobbies unless they're directly relevant</li>
        <li>Don't use a functional (skills-only) format to hide your lack of experience — it signals the gap you're trying to conceal and scores badly on ATS</li>
      </ul>

      <h2>The Truth About Getting Your First Role</h2>
      <p>Getting a first job or making a career change is hard — and it requires volume. You'll need to apply to more roles than experienced candidates, tailor each application carefully, and follow up where possible.</p>
      <p>What separates candidates with no experience who get hired from those who don't is usually one thing: they made it impossible for the interviewer to say "but what have you actually done?" by including concrete, specific examples of work — even if that work wasn't paid.</p>
    </>
  ),

  "why-resumes-never-reach-recruiters": (
    <>
      <p>You spent hours on your resume. You tailored it to the job description. You hit submit — and then heard nothing. No response, not even a rejection email.</p>
      <p>This isn't unusual. In fact, it's the norm. Research consistently shows that <strong>75% of resumes are eliminated before a human being ever looks at them</strong>. The filter doing the eliminating is called an Applicant Tracking System — ATS.</p>

      <h2>What Is an ATS?</h2>
      <p>An Applicant Tracking System is software that companies use to manage job applications. When you apply for a role online, your resume almost always goes directly into an ATS — not a recruiter's inbox.</p>
      <p>The system parses your resume, extracts information like your name, contact details, work history, and skills, and then scores it against the requirements of the job. Resumes that score below a threshold are automatically filtered out. The recruiter never sees them.</p>
      <p>Major ATS platforms include Workday, Greenhouse, Lever, iCIMS, and Taleo. Most mid-size to large companies use at least one of them.</p>

      <h2>Why Do Resumes Fail ATS?</h2>
      <p>The most common reasons are:</p>
      <ul>
        <li><strong>Missing keywords.</strong> ATS systems match your resume against the job description. If the job posting asks for "stakeholder management" and your resume says "client communication," you may not match — even if the skills are identical.</li>
        <li><strong>Incompatible formatting.</strong> Tables, columns, headers and footers, text boxes, and graphics confuse ATS parsers. The software can't extract text from these elements reliably, so it misses your experience entirely.</li>
        <li><strong>Wrong file format.</strong> PDFs are generally safe, but PDFs created from scanned images (rather than typed text) cannot be parsed at all. Stick to standard PDFs or .docx files.</li>
        <li><strong>Non-standard section headers.</strong> ATS systems look for common labels like "Work Experience," "Education," and "Skills." Using creative alternatives like "Where I've Been" or "What I Know" confuses the parser.</li>
        <li><strong>Poor keyword density.</strong> Even if you have the right keywords, having them appear only once — or burying them deep in the document — reduces your match score.</li>
      </ul>

      <h2>The 6-Second Rule Is a Myth — But ATS Is Real</h2>
      <p>You may have heard that recruiters spend 6 seconds on a resume. The actual number varies, but the point is valid: <strong>human attention is limited</strong>. What's less discussed is that your resume has to survive automated screening before a human ever applies their limited attention to it.</p>
      <p>Think of it as two gates. Gate one is the ATS. Gate two is the recruiter. Most people optimise for gate two (making their resume look good) without ever addressing gate one.</p>

      <h2>How to Actually Pass ATS</h2>
      <p>The fixes are straightforward once you know what you're solving for:</p>
      <ul>
        <li><strong>Match the job description's language.</strong> Pull key phrases directly from the posting and use them in your resume — not synonyms, the actual words.</li>
        <li><strong>Use a clean, single-column layout.</strong> Avoid tables, text boxes, and graphics. Use standard section labels.</li>
        <li><strong>Submit a properly formatted PDF or .docx.</strong> Ensure the file was created digitally, not scanned.</li>
        <li><strong>Put your most important experience near the top.</strong> ATS systems weight early content more heavily.</li>
        <li><strong>Check your score before you apply.</strong> Tools like HireBee simulate ATS behaviour and give you a score, a list of missing keywords, and specific suggestions — so you can fix issues before they cost you an interview.</li>
      </ul>

      <h2>The Takeaway</h2>
      <p>The job market is competitive, but many of the rejections you're experiencing have nothing to do with your qualifications. They're the result of a software filter that never gave a human the chance to evaluate you.</p>
      <p>Understanding how ATS works — and optimising for it — is the most direct path from "no responses" to "let's schedule a call."</p>
    </>
  ),

  "ats-keywords-guide": (
    <>
      <p>If there's one thing that separates resumes that get interviews from resumes that disappear into the void, it's keywords. Specifically, the right keywords — placed in the right places.</p>
      <p>Keyword optimisation isn't gaming the system. It's speaking the same language as the job description so that both ATS software and human recruiters can immediately see you're a match.</p>

      <h2>Why Keywords Matter More Than You Think</h2>
      <p>ATS systems work by comparing your resume to the job description and calculating a match score. The score is heavily influenced by how many of the required terms appear in your resume and how prominently they appear.</p>
      <p>A recruiter searching for candidates inside an ATS uses keywords too — they filter by skills, tools, and job titles to find relevant profiles. If those terms aren't on your resume, you simply won't appear in the results.</p>

      <h2>How to Find the Right Keywords</h2>
      <p>The best source is always the job description itself. Here's a simple process:</p>
      <ul>
        <li><strong>Read the requirements section carefully.</strong> The skills listed as "required" or "must-have" are your highest-priority keywords. These are non-negotiable.</li>
        <li><strong>Look at the responsibilities section.</strong> The verbs and phrases used here often mirror what the ATS is looking for. If the role says "manage cross-functional teams," use that phrase — not just "team leadership."</li>
        <li><strong>Identify tools and technologies.</strong> Specific software, platforms, and methodologies are exact-match keywords. "Salesforce," "Figma," "Agile," "SQL" — include every one that applies to you.</li>
        <li><strong>Compare multiple job descriptions.</strong> If you're applying for similar roles at different companies, look at 5–10 postings and find the keywords that appear most consistently. These are the core terms for your field.</li>
      </ul>

      <h2>Where to Place Keywords</h2>
      <p>Location matters almost as much as presence. ATS systems weight keywords more heavily when they appear in prominent positions:</p>
      <ul>
        <li><strong>Professional summary</strong> — a 2–3 sentence summary at the top of your resume is prime real estate. Include your most important role-specific keywords here.</li>
        <li><strong>Skills section</strong> — a dedicated skills section allows you to list technical skills, tools, and competencies explicitly. This is especially important for technical roles.</li>
        <li><strong>Job titles and bullet points</strong> — your experience section should use the same language as the job descriptions you're targeting, woven naturally into descriptions of what you achieved.</li>
      </ul>

      <h2>How to Use Keywords Without Sounding Robotic</h2>
      <p>The goal isn't to stuff keywords randomly — it's to use them in context. Compare these two approaches:</p>
      <p><strong>Keyword stuffing (bad):</strong> "Stakeholder management, cross-functional collaboration, project management, data analysis, strategic planning."</p>
      <p><strong>Keyword integration (good):</strong> "Led cross-functional collaboration across 4 teams to deliver a $2M data analysis project on time, improving stakeholder reporting by 40%."</p>
      <p>The second version passes ATS and reads well to a human. That's the balance you're aiming for.</p>

      <h2>Common Keyword Mistakes</h2>
      <ul>
        <li>Using synonyms instead of exact terms ("team player" instead of "cross-functional collaboration")</li>
        <li>Hiding keywords in graphics or text boxes that ATS can't read</li>
        <li>Using abbreviations without spelling them out first ("PM" instead of "Project Manager (PM)")</li>
        <li>Applying the same resume to every job without tailoring keywords to the specific posting</li>
      </ul>

      <h2>Use a Score to Confirm Your Work</h2>
      <p>After updating your resume, check how it performs against the job description you're targeting. HireBee compares your resume to the posting and shows you exactly which keywords are missing, how strong your match score is, and what to add before you apply.</p>
      <p>This removes the guesswork. Instead of wondering whether your resume is good enough, you know — and you can fix it in minutes.</p>
    </>
  ),

  "how-to-write-cover-letter": (
    <>
      <p>Most cover letters start with "I am writing to apply for..." and end with "I look forward to hearing from you." Recruiters have read thousands of them. They scan for something different and usually don't find it.</p>
      <p>The good news: because the bar is so low, a well-written cover letter stands out easily. You don't need to be a great writer. You need a simple, repeatable structure — and enough specificity to feel human.</p>

      <h2>First: Does Anyone Actually Read Cover Letters?</h2>
      <p>Yes — but selectively. Research suggests that around 40–50% of hiring managers read cover letters when they're submitted alongside a resume. That number is higher for roles that require communication skills, creative thinking, or cultural fit.</p>
      <p>More importantly: a bad cover letter can hurt you, a missing cover letter is neutral, and a good cover letter can tip a close decision in your favour. If writing one takes 20 minutes, it's almost always worth it.</p>

      <h2>The Structure That Works</h2>
      <p>Forget the five-paragraph essay format. A cover letter that gets read looks like this:</p>

      <h3>1. Opening — make it specific, not generic</h3>
      <p>State the role and why you're interested in this particular company. Reference something real — a product you use, a mission that resonates, a specific initiative you've followed. One sentence of genuine specificity beats three paragraphs of generic enthusiasm.</p>
      <p><strong>Example:</strong> "I've been using Notion since 2019 and have watched it become the operating system for how my team thinks. The opportunity to join the product team as you expand into enterprise is exactly the kind of role I've been working towards."</p>

      <h3>2. Your value in two or three sentences</h3>
      <p>Don't summarise your entire resume. Pick one or two relevant achievements and state them clearly. Use numbers where possible.</p>
      <p><strong>Example:</strong> "In my current role, I rebuilt our onboarding flow which reduced time-to-value from 14 days to 3, and increased 30-day retention by 22%. I led that project from research to launch with a team of two."</p>

      <h3>3. Why this role, why now</h3>
      <p>Briefly connect your background to what the company needs. This is where you show you've read the job description, not just the company name.</p>

      <h3>4. Close simply</h3>
      <p>Don't beg. Don't say "I would be honoured." Just express genuine interest and make it easy to take the next step.</p>
      <p><strong>Example:</strong> "I'd love to talk about how I can contribute to the product team. Thanks for your time."</p>

      <h2>What to Cut</h2>
      <ul>
        <li>Anything that's already obvious from your resume</li>
        <li>"I am a highly motivated, results-driven professional"</li>
        <li>Explaining why the job would be good for you (focus on what you bring)</li>
        <li>Anything over 300 words — brevity signals respect for their time</li>
      </ul>

      <h2>Tone and Format</h2>
      <p>Write like a competent professional, not like a formal letter from 1995. Contractions are fine. First person is expected. Short paragraphs are easier to read.</p>
      <p>Format: plain text or a simple document. No graphics. No columns. Match the font to your resume. Keep it to one page.</p>

      <h2>The Shortcut</h2>
      <p>If writing cover letters from scratch feels slow, HireBee's cover letter generator can produce a tailored draft based on your resume and the job description. You edit and personalise — it gives you the structure and starting point. Most users cut the time from 30 minutes to under 5.</p>
    </>
  ),

  "linkedin-profile-optimization": (
    <>
      <p>Recruiters don't wait for you to apply. They search LinkedIn every day for candidates who match what they're hiring for. If your profile isn't optimised, you won't appear in those searches — and you'll never know the opportunity existed.</p>
      <p>LinkedIn profile optimisation isn't about looking impressive. It's about being findable, and then being credible once someone finds you.</p>

      <h2>How LinkedIn Search Actually Works</h2>
      <p>LinkedIn's search algorithm ranks profiles based on relevance to the recruiter's query. The most heavily weighted factors are:</p>
      <ul>
        <li>Your current job title</li>
        <li>Keywords in your headline</li>
        <li>Keywords throughout your profile (especially the About section and experience)</li>
        <li>Your location (for location-specific searches)</li>
        <li>Your connection degree to the searcher</li>
        <li>Profile completeness (LinkedIn's "All-Star" status gives a ranking boost)</li>
      </ul>
      <p>The implication: keyword optimisation on LinkedIn works the same way as on a resume. If a recruiter searches "product manager SaaS B2B London" and those terms don't appear in your profile, you won't show up.</p>

      <h2>The Headline: Your Most Valuable Real Estate</h2>
      <p>Most people use their job title as their headline. That's a missed opportunity.</p>
      <p>Your headline appears everywhere on LinkedIn — in search results, connection requests, comments, and Who's Viewed Your Profile. It's 220 characters of prime keyword space.</p>
      <p><strong>Weak headline:</strong> "Senior Product Manager at Acme Corp"</p>
      <p><strong>Strong headline:</strong> "Senior Product Manager | SaaS &amp; B2B | Growth, Retention &amp; 0→1 Products | Ex-Stripe"</p>
      <p>The strong version includes your role, your domain specialisation, what you're known for, and a credibility signal — all keywords a recruiter might search for.</p>

      <h2>The About Section: Tell a Story, Then Sell</h2>
      <p>The About section is where most profiles fail. People either leave it blank, or write a dry third-person summary that reads like a Wikipedia article about themselves.</p>
      <p>What works:</p>
      <ul>
        <li><strong>Open with a hook in the first two lines</strong> — these show before the "see more" click. Make them compelling enough that someone wants to read on.</li>
        <li><strong>Describe what you do and who you do it for</strong> — be specific about your domain, the type of company you've worked at, and the kind of problems you solve.</li>
        <li><strong>Include 2–3 concrete achievements</strong> — numbers, outcomes, scale.</li>
        <li><strong>Close with a clear call to action</strong> — "Open to senior PM roles at Series A–C companies. Feel free to reach out."</li>
      </ul>

      <h2>Experience Section</h2>
      <p>Each role should have 3–5 bullet points focused on achievements, not responsibilities. Use the same language as the job descriptions your target roles use. This is where you pack in searchable keywords naturally.</p>
      <p>Quantify wherever possible: team size, revenue impact, percentage improvements, user counts. Recruiters are pattern-matching for candidates who have done things at a relevant scale.</p>

      <h2>Skills: More Than You Think</h2>
      <p>LinkedIn allows up to 50 skills. Most people list 10. Fill all 50 with relevant, specific skills — they contribute to search ranking and help recruiters filter for what they need.</p>
      <p>Ask connections to endorse your top skills. Endorsements add social proof and signal to LinkedIn that your skills are legitimate.</p>

      <h2>Profile Completeness</h2>
      <p>LinkedIn rewards complete profiles with better search visibility. Make sure you have:</p>
      <ul>
        <li>A professional headshot (profiles with photos get 21× more views)</li>
        <li>A banner image (most people leave this blank — it's easy differentiation)</li>
        <li>Your location set correctly</li>
        <li>Education section filled in</li>
        <li>At least 3 experience entries</li>
        <li>A summary (About section)</li>
      </ul>

      <h2>Check Your Profile Score</h2>
      <p>Not sure how your LinkedIn profile stacks up? HireBee's LinkedIn optimizer scores your headline and About section, identifies keyword gaps, and suggests specific improvements — so you know exactly what to change before you start applying or waiting to be found.</p>
    </>
  ),

  "resume-ats-score-explained": (
    <>
      <p>You ran your resume through an ATS checker and got a score. Maybe it was 62. Maybe 81. Maybe 34. Now what does that actually mean — and what do you do with it?</p>
      <p>An ATS score isn't a grade in the traditional sense. It's a diagnostic. Understanding what goes into it is the key to improving it efficiently.</p>

      <h2>What an ATS Score Measures</h2>
      <p>Different tools calculate scores differently, but most measure some combination of the following:</p>
      <ul>
        <li><strong>Keyword match rate</strong> — how many of the required and preferred keywords from the job description appear in your resume. This is usually the most heavily weighted factor.</li>
        <li><strong>Keyword density and placement</strong> — not just whether a keyword appears, but how prominently and how often. A keyword buried in a footnote scores lower than one in your professional summary.</li>
        <li><strong>Formatting compatibility</strong> — whether your resume can be cleanly parsed. Tables, columns, graphics, and unusual fonts can break ATS parsing and reduce your score even if the content is strong.</li>
        <li><strong>Section structure</strong> — whether your resume has clearly labelled, recognisable sections (Work Experience, Education, Skills) that the parser can categorise correctly.</li>
        <li><strong>Contact information</strong> — whether your email, phone, and location are parseable and in a standard location.</li>
      </ul>

      <h2>What a Score of X Actually Means</h2>
      <p>There's no universal scale, but as a rough guide:</p>
      <ul>
        <li><strong>Below 50:</strong> Your resume is unlikely to pass automated screening for this specific role. Significant changes are needed — usually keyword additions and possibly formatting fixes.</li>
        <li><strong>50–70:</strong> You're in the borderline range. Your resume might pass, but you're competing against candidates with stronger keyword matches. This is the zone where targeted tailoring makes the biggest difference.</li>
        <li><strong>70–85:</strong> You're in good shape. Your resume is likely to pass ATS for this role. Focus your effort on making sure the human who reads it is compelled to act.</li>
        <li><strong>Above 85:</strong> Strong match. Your keyword coverage is comprehensive and your formatting is compatible. This is where you want to be before submitting.</li>
      </ul>

      <h2>The Most Common Reasons for a Low Score</h2>
      <p><strong>Missing keywords.</strong> You have the experience, but you're describing it in different language than the job posting uses. "Customer success" vs. "client relationship management" — they're the same thing, but ATS treats them as different terms.</p>
      <p><strong>Formatting issues.</strong> A beautifully designed resume with columns, icons, and a sidebar often scores badly because ATS can't parse the text correctly. The software reads left-to-right, top-to-bottom — layouts that break this pattern create parsing errors.</p>
      <p><strong>Generic resume.</strong> Sending the same resume to every job. Each posting has a different keyword profile, and a generic resume won't be optimised for any of them.</p>

      <h2>How to Improve Your Score</h2>
      <ol>
        <li><strong>Read the job description carefully</strong> and list every skill, tool, and qualification mentioned.</li>
        <li><strong>Check which of those terms appear in your resume</strong> — and add the ones that are missing, where they're relevant and true.</li>
        <li><strong>Move to a single-column format</strong> if your current resume uses multiple columns or complex layouts.</li>
        <li><strong>Use standard section headers</strong> — Work Experience, not "Where I've Made an Impact."</li>
        <li><strong>Re-run the score</strong> after each round of changes to see the impact.</li>
      </ol>

      <h2>Score vs. Substance</h2>
      <p>A high ATS score gets your resume in front of a human. That's step one. Step two is making sure the content is genuinely compelling — strong achievements, clear progression, measurable impact.</p>
      <p>Don't chase a perfect score at the expense of readability. The goal is to pass the filter and impress the human. Both matter.</p>
      <p>HireBee shows you your exact score, the specific keywords you're missing, and which issues to fix first — so you can spend your time on what actually moves the needle.</p>
    </>
  ),

  "how-to-explain-career-gap": (
    <>
      <p>A gap in your employment history used to be a near-automatic red flag. In 2026, that stigma has largely shifted — especially after the disruption of the past few years, which saw millions of people take time out through no fault of their own.</p>
      <p>That said, how you handle a career gap on your resume and in interviews still matters. Here's what works — and what backfires.</p>

      <h2>First: Does the Gap Actually Need Explaining?</h2>
      <p>Short gaps of 1–3 months often don't need any explanation at all. Job searches take time. If you left one role in March and started the next in June, most recruiters will assume you were job hunting. You don't need to address it.</p>
      <p>Gaps of 3–12 months are worth a brief, honest explanation. Gaps over a year should be addressed directly — but that doesn't mean they're disqualifying.</p>

      <h2>Why Gaps Happen (and None of Them Are Shameful)</h2>
      <p>Common, completely legitimate reasons for career gaps:</p>
      <ul>
        <li>Redundancy or layoffs</li>
        <li>Caring for a child, parent, or family member</li>
        <li>Health issues (your own or a family member's)</li>
        <li>Burnout and intentional rest</li>
        <li>Pursuing education or retraining</li>
        <li>Relocating to a new country</li>
        <li>Freelancing, consulting, or self-employment that didn't pan out as planned</li>
        <li>Travelling, volunteering, or a personal project</li>
      </ul>
      <p>Each of these is a valid reason. None of them should be lied about, exaggerated, or hidden.</p>

      <h2>On Your Resume: How to Format a Gap</h2>
      <p>The most common mistake is leaving a gap as a blank — dates jump from one role to another with nothing in between. This creates a question the recruiter has to form before you've had a chance to answer it.</p>
      <p>Instead, consider adding a brief entry for the gap period:</p>
      <ul>
        <li><strong>Career Break — Family Caregiver</strong> | June 2024 – March 2025</li>
        <li><strong>Career Break — Personal Health</strong> | March 2024 – September 2024</li>
        <li><strong>Freelance Consultant</strong> | January 2024 – October 2024 (list actual projects if you have them)</li>
        <li><strong>Full-Stack Web Development Bootcamp</strong> | September 2024 – February 2025</li>
      </ul>
      <p>LinkedIn now has an official "Career Break" entry type — use it. It signals transparency and has become normalised on the platform.</p>

      <h2>What to Do During a Gap (Even If It's Too Late)</h2>
      <p>If you're currently in a gap and haven't done anything structured, it's not too late to add something meaningful:</p>
      <ul>
        <li>Take a relevant online course (Coursera, LinkedIn Learning, Google certifications)</li>
        <li>Volunteer in a capacity related to your field</li>
        <li>Contribute to an open source project</li>
        <li>Freelance for a friend's business or a charity</li>
        <li>Write about your field (a blog, LinkedIn articles)</li>
      </ul>
      <p>Even a few weeks of structured activity gives you something truthful to say about how you spent the time.</p>

      <h2>In Interviews: The Right Way to Talk About It</h2>
      <p>Be brief, factual, and forward-looking. Recruiters are not looking for a detailed defence — they're checking whether the gap was intentional and whether you're ready to work now.</p>
      <p><strong>Formula:</strong> What happened → What you did during the gap → Why you're ready now.</p>
      <p><strong>Example:</strong> "I took time out in mid-2024 to care for a parent who was seriously ill. During that period I kept my skills current by completing Google's Project Management Certificate and did some freelance work for a small business owner I know. My parent has recovered and I'm fully ready to return to a full-time role — in fact, that's part of why this position interests me so much."</p>
      <p>Don't over-explain, apologise, or go into more personal detail than necessary. One clear paragraph is enough.</p>

      <h2>ATS and Career Gaps</h2>
      <p>ATS systems don't inherently penalise gaps — they don't read narrative. What they do parse is dates and employment continuity. A gap entry (even one that just says "Career Break") fills the date range and prevents the parser from flagging missing periods.</p>
      <p>If you use a functional resume to try to hide gaps by omitting dates, most ATS systems will either reject the resume outright or flag it for incomplete information. Chronological is still the safest format, with gaps addressed directly.</p>
    </>
  ),

  "resume-summary-vs-objective": (
    <>
      <p>At the top of your resume, you have two options: a professional summary or a career objective. Most people either skip this section entirely or fill it with hollow phrases that add no value.</p>
      <p>That's a mistake. The section directly below your name is the first thing a recruiter reads, and it's some of the most valuable keyword real estate on your entire resume for ATS purposes. Here's how to use it well.</p>

      <h2>What's the Difference?</h2>
      <p><strong>A professional summary</strong> describes who you are and what you bring. It's written from the perspective of what you offer an employer. Best for people with relevant experience in the field they're applying to.</p>
      <p><strong>A career objective</strong> describes what you want from the role and where you're heading. It's written from the perspective of what you're looking for. Best for career changers, recent graduates, or people entering a new field — where explaining the "why" adds helpful context.</p>
      <p>In practice, the two often blend together. Many people write a hybrid: a brief summary of their background plus a sentence about their direction. That's fine.</p>

      <h2>Why Most Summaries Fail</h2>
      <p>Open almost any resume and you'll see some version of this:</p>
      <blockquote>"Highly motivated, results-driven professional with a passion for excellence and a proven track record of delivering outstanding outcomes in fast-paced environments."</blockquote>
      <p>This says nothing. It contains no keywords, no specificity, and no differentiation. Every recruiter has read it hundreds of times. It adds no value and takes up space.</p>
      <p>The problem is that people write summaries about how they feel rather than what they've done.</p>

      <h2>How to Write a Professional Summary</h2>
      <p>A strong professional summary has three components:</p>
      <ol>
        <li><strong>Who you are</strong> — your role/level and years of experience</li>
        <li><strong>What you do well</strong> — your area of specialisation or strongest capability</li>
        <li><strong>What you've achieved or can offer</strong> — a concrete signal of quality</li>
      </ol>
      <p><strong>Template:</strong> "[Role] with [X years] of experience in [domain/specialisation]. [Specific strength or area of expertise]. [Achievement, proof point, or what you're seeking]."</p>
      <p><strong>Example for a marketing manager:</strong> "Performance marketing manager with 7 years of B2B SaaS experience. Specialised in paid search and account-based marketing programmes that have generated $4M+ in qualified pipeline. Looking for a senior role at a Series B or C company with a complex enterprise sales cycle."</p>
      <p><strong>Example for a software engineer:</strong> "Senior full-stack engineer with 6 years building production systems in TypeScript and Go. Experienced in high-throughput API design, distributed systems, and mentoring junior engineers. Seeking a technical lead role at a product-led company."</p>

      <h2>How to Write a Career Objective</h2>
      <p>If you're a recent graduate or career changer, a career objective acknowledges your situation directly and makes a case for why it's not a disadvantage.</p>
      <p><strong>Example for a recent graduate:</strong> "Computer science graduate with hands-on experience building React and Node.js applications through two internships and a personal project with 500+ active users. Seeking a junior developer role where I can contribute to a product team from day one."</p>
      <p><strong>Example for a career changer:</strong> "Former secondary school teacher transitioning into instructional design. Experienced in curriculum development, learner assessment, and delivering training to groups of 30+. Seeking a corporate L&D or instructional design role where my classroom experience translates into scalable training programmes."</p>

      <h2>Length and Placement</h2>
      <p>Keep it to 3–4 sentences maximum. Place it immediately below your contact information, before your work experience. Label it clearly: "Professional Summary," "Summary," or "Profile" — all work with ATS systems.</p>

      <h2>The ATS Angle</h2>
      <p>Your summary is read early by both humans and ATS systems, which means keywords placed here carry extra weight. Include the job title you're targeting, your key skills, and any important industry terms from the job description — woven naturally into the text.</p>
      <p>If you tailor nothing else on your resume, tailor the summary. It takes five minutes and significantly improves both your ATS score and your opening impression.</p>
    </>
  ),

  "how-to-tailor-resume-for-every-job": (
    <>
      <p>The most common job-search advice — "tailor your resume for every application" — is also the most frequently ignored. It sounds like a lot of work. It doesn't have to be.</p>
      <p>With a system, you can tailor your resume for a specific role in under 15 minutes. Here's exactly how.</p>

      <h2>Why Tailoring Is Non-Negotiable</h2>
      <p>Every job description has a different keyword profile. ATS systems score your resume against that specific profile. A resume optimised for "data analyst" roles may score 40% against a "business intelligence engineer" posting — even though the skills overlap significantly.</p>
      <p>Sending the same resume everywhere is like wearing the same outfit to a beach holiday, a job interview, and a black-tie dinner. You're technically covered, but you're not dressed for the occasion.</p>

      <h2>The 80/20 Rule of Resume Tailoring</h2>
      <p>Most of your resume stays the same across every application. You're not rewriting your entire work history. You're adjusting about 20% of the document — but that 20% does most of the work.</p>
      <p>The sections you change:</p>
      <ul>
        <li><strong>Professional summary</strong> — rewrite this for every job. It should mention the role title, the company's domain, and your most relevant credential for this specific position.</li>
        <li><strong>Skills section</strong> — reorder and trim to match the job's requirements. Add tools or skills from the job description that you genuinely have but forgot to list.</li>
        <li><strong>Top bullet points in your most recent role</strong> — swap in bullets that are most relevant to the new job. You don't have to change everything, just make sure the first 2–3 bullets in your most recent experience speak directly to this role's needs.</li>
      </ul>

      <h2>Step-by-Step: The 15-Minute Tailoring Process</h2>

      <h3>Step 1: Read the job description carefully (3 minutes)</h3>
      <p>Highlight or note: required skills and qualifications, the tools and technologies mentioned, the key verbs used to describe the role ("manage," "build," "analyse," "lead"), and any specific phrases that appear more than once.</p>

      <h3>Step 2: Check your resume against the highlights (2 minutes)</h3>
      <p>Which of those terms are already in your resume? Which are missing but relevant to you? That gap is your tailoring target.</p>

      <h3>Step 3: Rewrite your summary (3 minutes)</h3>
      <p>Reference the job title. Mention the company's industry or scale if you have experience there. Include your most relevant credential for this specific role.</p>

      <h3>Step 4: Update your skills section (2 minutes)</h3>
      <p>Add any skills from the job description that you have but haven't listed. Reorder to put the most relevant skills first.</p>

      <h3>Step 5: Swap in better bullets (5 minutes)</h3>
      <p>Look at your experience section. For each job, do your top 2–3 bullets match what this role needs? If you have relevant achievements sitting lower in the list — or in an older role — move them up. Rewrite one or two bullets to use the language from the job description.</p>

      <h2>Keep a Master Resume</h2>
      <p>Maintain a single "master resume" with every bullet point, achievement, and project you could ever include. When tailoring for a specific role, you're selecting from this master document — not inventing new content under pressure.</p>
      <p>Over time, your master resume grows and your tailoring becomes faster because you have more material to choose from.</p>

      <h2>Use Your Score as a Guide</h2>
      <p>After tailoring, run your resume through HireBee against the job description you're targeting. Your score tells you how much of the keyword gap you've closed. If you were at 55 before tailoring and you're at 78 after, you've done meaningful work. If you're still at 55, there are specific terms you're still missing.</p>
      <p>This removes the guesswork from tailoring — you know it's working before you submit.</p>
    </>
  ),

  "product-manager-resume-ats": (
    <>
      <p>Product management is one of the most competitive roles in the tech industry. Every senior PM role attracts dozens of qualified applicants. For your resume to get you to an interview, it has to do two things: pass ATS screening and convince a hiring manager that you can own a product and deliver results.</p>
      <p>Here's what actually works.</p>

      <h2>The ATS Challenge for PM Resumes</h2>
      <p>PM job descriptions vary enormously between companies, but the keyword clusters are fairly consistent. Problems arise when candidates write their resumes in internal company language — terms that made sense within their organisation but don't match what the hiring company uses in its job description.</p>
      <p>ATS systems don't know that "squad lead" and "product manager" are the same thing. They don't equate "customer insights programme" with "user research." They match terms — and if your terms don't align with the job description's terms, your score suffers.</p>

      <h2>The Keywords Every PM Resume Should Cover</h2>
      <p><strong>Core PM language:</strong> Product roadmap, product strategy, go-to-market, product-led growth, OKRs, KPIs, prioritisation, stakeholder management, cross-functional collaboration, product vision.</p>
      <p><strong>Research and discovery:</strong> User research, customer interviews, usability testing, A/B testing, data analysis, competitive analysis, market research.</p>
      <p><strong>Delivery and process:</strong> Agile, Scrum, sprint planning, backlog management, product requirements, PRD, feature specification, launch planning.</p>
      <p><strong>Tools:</strong> Jira, Confluence, Figma, Amplitude, Mixpanel, Productboard, Notion, SQL (if you can query data), Looker, Tableau.</p>
      <p><strong>Business metrics:</strong> Revenue, conversion rate, retention, churn, NPS, DAU/MAU, time-to-value, MRR, ARR.</p>
      <p>You don't need all of these — include the ones that are true for you and that appear in the job description you're targeting.</p>

      <h2>How to Write PM Bullet Points</h2>
      <p>PM bullet points need to show ownership, decision-making, and measurable outcomes. Hiring managers want to see that you didn't just participate — you drove things.</p>
      <p><strong>Weak:</strong> "Worked with engineering team to deliver features on schedule."</p>
      <p><strong>Strong:</strong> "Led 0-to-1 development of a self-serve onboarding flow, working across engineering, design, and customer success to ship in 10 weeks. Reduced time-to-first-value from 14 days to 3, increasing 30-day retention by 22%."</p>
      <p>The formula: <strong>Owned/Led/Built</strong> + [what] + [how — cross-functional, methodologies] + [outcome — metric].</p>

      <h2>Quantify Everything You Can</h2>
      <p>PMs are evaluated on business outcomes, so numbers on your resume matter more than in almost any other role. Use:</p>
      <ul>
        <li>Revenue or cost impact (generated £2M, saved $400K)</li>
        <li>User metrics (increased DAU by 35%, reduced churn by 18%)</li>
        <li>Scale (product used by 500K users, team of 8 engineers)</li>
        <li>Speed (launched in 6 weeks, shipped 4 features per quarter)</li>
        <li>Engagement metrics (improved NPS from 32 to 51)</li>
      </ul>
      <p>If you don't have exact numbers, use ranges or approximations — but be honest. Fabricated metrics get caught in interviews.</p>

      <h2>Format for PM Resumes</h2>
      <p>Single column. Clean. No graphics or icons. Two pages is acceptable for senior roles (5+ years). One page for junior to mid-level PMs.</p>
      <p>Section order: Summary → Work Experience → Skills → Education. The work experience section should carry most of the weight.</p>

      <h2>Tailoring for the Specific Role</h2>
      <p>Consumer vs. B2B, platform vs. growth, 0-to-1 vs. scaling — these distinctions matter enormously in PM hiring. Before applying, identify what type of PM this company needs and adjust your summary and top bullets to match that profile.</p>
      <p>A PM with B2B and consumer experience should lead with B2B for an enterprise role and lead with consumer for a consumer product. Same experience, different emphasis.</p>
    </>
  ),

  "how-long-should-a-resume-be": (
    <>
      <p>Resume length is one of the most argued-about questions in job searching — and it has a surprisingly clear answer once you understand what it's actually asking.</p>
      <p>The question isn't really "how long should a resume be?" It's "how do I fit the right amount of information into the right amount of space?" Here's the definitive answer.</p>

      <h2>The Simple Rule</h2>
      <ul>
        <li><strong>0–5 years of experience:</strong> One page</li>
        <li><strong>5–15 years of experience:</strong> One to two pages</li>
        <li><strong>15+ years of experience:</strong> Two pages (very rarely three)</li>
        <li><strong>Academic CVs:</strong> Different rules — length is expected to reflect publications, grants, and teaching experience</li>
      </ul>
      <p>This isn't arbitrary. It reflects what's useful. A recruiter assessing a junior candidate needs to see recent experience and potential — not a padded one-pager stretched to two. A senior leader with 20 years of relevant experience genuinely can't summarise it in one page without omitting things that matter.</p>

      <h2>Why Most People Get This Wrong</h2>
      <p><strong>Early-career candidates go too long.</strong> This is the more common problem. Recent graduates and people with 1–3 years of experience try to fill two pages by including high school activities, unrelated jobs with excessive detail, and fluffy filler text. A tight, focused one-pager almost always performs better.</p>
      <p><strong>Senior candidates go too short.</strong> People with 10–20 years of experience sometimes try to compress into one page because they've heard "one page" as a rule. This leads to cutting actual substance — removing context, dropping metrics, stripping out older but relevant roles.</p>

      <h2>What Should Actually Fill the Space</h2>
      <p>The right question isn't "how do I fill X pages?" It's "what does this hiring manager need to see to make a decision?"</p>
      <p>Include:</p>
      <ul>
        <li>Work experience going back 10–15 years (older roles can be brief: job title, company, dates, no bullets)</li>
        <li>Your most impactful bullet points for each role — typically 3–5 for recent jobs, 1–2 for older ones</li>
        <li>Education (brief unless you're a recent graduate)</li>
        <li>Skills (technical skills, tools, languages)</li>
        <li>Certifications (if relevant and recent)</li>
      </ul>
      <p>Do not include: hobbies (unless directly relevant), a photo, "References available upon request" (assumed), every job you've ever had, or achievements from 20+ years ago that don't add value.</p>

      <h2>The White Space Test</h2>
      <p>If your one-page resume has large gaps of white space, you're padding it. Cut the filler, tighten the language.</p>
      <p>If your resume is running to 2.5 or 3 pages and you have fewer than 15 years of experience, you're including too much. Cut the oldest roles to one line each, reduce bullets to the strongest 3, and remove any section that doesn't directly support your application.</p>

      <h2>What About ATS?</h2>
      <p>ATS systems don't care about page count — they parse text. A two-page resume isn't penalised by ATS any more than a one-pager. What matters to ATS is keyword coverage, formatting compatibility, and section structure. Focus on those.</p>

      <h2>The Practical Answer</h2>
      <p>Write everything that's genuinely relevant. Then edit ruthlessly until it fits within the appropriate length. If that means two pages at 8 years of experience, that's fine. If it means a tight one page at 12 years, that's fine too.</p>
      <p>Length is the output, not the goal. The goal is communicating your value clearly. If your content is compelling and well-organised, a recruiter will read two pages. If it's padded and vague, they'll skim one page and move on.</p>
    </>
  ),

  "remote-job-resume-tips": (
    <>
      <p>Remote work is no longer a perk — it's a mainstream employment category with its own hiring norms, expectations, and screening criteria. If you're applying for remote or hybrid roles, your resume needs to signal something specific: that you can work independently, communicate asynchronously, and deliver results without someone watching over you.</p>
      <p>Here's how to position your resume for remote work in 2026.</p>

      <h2>What Remote Employers Actually Screen For</h2>
      <p>Beyond job-specific skills, hiring managers for remote roles pay attention to signals that predict whether someone will thrive without a physical office structure:</p>
      <ul>
        <li><strong>Previous remote experience</strong> — the strongest signal. If you've worked remotely before, say so explicitly.</li>
        <li><strong>Asynchronous communication</strong> — comfort with written communication, documentation, and working across time zones.</li>
        <li><strong>Self-management</strong> — evidence that you set your own structure and deliver without close supervision.</li>
        <li><strong>Familiarity with remote tools</strong> — Slack, Notion, Zoom, Loom, Linear, Jira, Figma, Google Workspace, GitHub. These are proxy indicators of remote working experience.</li>
      </ul>

      <h2>How to Signal Remote Experience on Your Resume</h2>

      <h3>In your work experience entries</h3>
      <p>If a role was remote, say so. Add "(Remote)" next to the company name or location:</p>
      <p><strong>Senior Product Designer | Acme Corp, London (Remote)</strong></p>
      <p>If you managed or worked with a distributed or international team, mention it in your bullets:</p>
      <ul>
        <li>"Led a distributed team of 6 engineers across 3 time zones, managing deliverables asynchronously using Notion and Loom"</li>
        <li>"Collaborated remotely with stakeholders in the US and Singapore, maintaining delivery cadence despite 8-hour time difference"</li>
      </ul>

      <h3>In your skills section</h3>
      <p>Include the remote tools you use: Slack, Notion, Confluence, Zoom, Loom, Asana, Linear, Figma, Miro. These are searchable keywords in remote job ATS systems and immediate credibility signals to hiring managers.</p>

      <h3>In your professional summary</h3>
      <p>If you're actively targeting remote roles, state it clearly and mention your experience:</p>
      <p><em>"Experienced product manager with 6 years of remote and hybrid work, collaborating across distributed teams in North America and Europe. Comfortable with async-first workflows and clear written communication."</em></p>

      <h2>ATS Keywords for Remote Job Applications</h2>
      <p>When applying for roles advertised as remote, include relevant terms from the job description — which often includes:</p>
      <ul>
        <li>"Remote," "distributed," "async," "asynchronous," "globally distributed team"</li>
        <li>Specific tools: Slack, Notion, Zoom, Loom, GitHub</li>
        <li>Self-management terms: "independent contributor," "autonomous," "self-managed," "proactive communication"</li>
      </ul>

      <h2>If You Have No Remote Experience</h2>
      <p>If you've only ever worked in an office but are applying for remote roles, frame your existing experience to surface transferable qualities:</p>
      <ul>
        <li>Working with colleagues in other offices or countries (proto-remote collaboration)</li>
        <li>Managing projects independently with minimal oversight</li>
        <li>Strong written communication skills evidenced by documentation, proposals, or reports you've produced</li>
        <li>Use of the same tools common in remote environments (even if used in a hybrid setting)</li>
      </ul>
      <p>Remote employers are often more willing to hire someone with no explicit remote experience if they demonstrate the right mindset and transferable skills — especially for junior and mid-level roles.</p>

      <h2>Location and Time Zone</h2>
      <p>Many remote roles are not fully location-independent — they require candidates to be within a certain time zone or region. Include your location on your resume (city and country), and if you're flexible on time zone, say so in your summary or cover letter.</p>
      <p>If the job description specifies a time zone requirement, confirm you meet it somewhere visible in your application materials.</p>
    </>
  ),

  "sales-resume-keywords": (
    <>
      <p>Sales hiring is fast. Hiring managers screen dozens of resumes looking for one thing: evidence that you can sell. If your resume doesn't show that clearly — in terms they recognise and numbers they can evaluate — you won't get the call.</p>
      <p>Here's how to write a sales resume that passes ATS and makes a recruiter pick up the phone.</p>

      <h2>The Keywords Sales ATS Systems Look For</h2>
      <p>Sales job descriptions are specific about the type of selling they need. Make sure your resume uses the same language.</p>
      <p><strong>Role and process terms:</strong> Business development, account management, account executive, sales development representative (SDR), business development representative (BDR), inside sales, field sales, enterprise sales, SMB sales, mid-market, full-cycle sales, pipeline management, prospecting, lead generation, cold outreach.</p>
      <p><strong>Methodology terms:</strong> MEDDIC, SPIN selling, challenger sale, solution selling, consultative selling, value selling. If you've been trained in a methodology, include it — some hiring managers filter for it explicitly.</p>
      <p><strong>Tools:</strong> Salesforce, HubSpot, Outreach, Salesloft, LinkedIn Sales Navigator, ZoomInfo, Gong, Chorus, Pipedrive. Include every CRM and sales tool you've used.</p>
      <p><strong>Metrics:</strong> Quota attainment, ARR, MRR, ACV (average contract value), pipeline coverage, win rate, deal velocity, churn rate, net revenue retention (NRR).</p>

      <h2>How to Write Sales Bullet Points</h2>
      <p>Every bullet point in your experience section should contain at least one number. Sales is a numbers game, and your resume should reflect that. Hiring managers disqualify candidates who can't quantify their performance — it raises the question of whether they know their numbers or have something to hide.</p>
      <p><strong>Weak:</strong> "Exceeded sales targets and managed a portfolio of enterprise accounts."</p>
      <p><strong>Strong:</strong> "Consistently exceeded quota at 118% of target, managing a portfolio of 40 enterprise accounts with an average ACV of £85K. Closed £2.3M in ARR in FY2025."</p>
      <p>The formula: <strong>[Metric achievement] + [activity or method] + [deal type, account size, or context]</strong>.</p>
      <p>Useful data points to include:</p>
      <ul>
        <li>Quota attainment percentage ("112% of annual quota")</li>
        <li>Revenue closed ("£1.8M ARR")</li>
        <li>Average deal size or ACV</li>
        <li>Number of accounts managed</li>
        <li>Sales cycle length</li>
        <li>Win rate improvement</li>
        <li>Pipeline generated</li>
        <li>Rankings within your team ("ranked 2nd of 14 AEs in Q3 2025")</li>
      </ul>

      <h2>The Skills Section for Sales Resumes</h2>
      <p>Include a clear skills section that lists:</p>
      <ul>
        <li>CRM tools (Salesforce, HubSpot)</li>
        <li>Sales engagement platforms (Outreach, Salesloft)</li>
        <li>Intelligence tools (LinkedIn Sales Navigator, ZoomInfo, Cognism)</li>
        <li>Methodologies (MEDDIC, SPIN, etc.)</li>
        <li>Conversation intelligence (Gong, Chorus)</li>
        <li>Market focus (SaaS, financial services, enterprise, SMB)</li>
      </ul>

      <h2>Professional Summary for Sales Roles</h2>
      <p>Your summary should immediately signal your sales identity: what you sell, who you sell to, and your level of success.</p>
      <p><strong>Example:</strong> "Enterprise account executive with 6 years of B2B SaaS sales experience. Specialised in complex, multi-stakeholder deals with ACV of £80–250K. Consistently ranked in the top quartile of the sales team. Track record of building pipeline from zero in new territories and closing 6-figure contracts within an 8–12 week sales cycle."</p>

      <h2>Common Sales Resume Mistakes</h2>
      <ul>
        <li>Describing activities without outcomes ("responsible for outbound prospecting" — so what?)</li>
        <li>Omitting quota attainment (the first thing any sales hiring manager looks for)</li>
        <li>Listing tools you only know superficially — you'll be asked about them</li>
        <li>Using a multi-column or heavily designed template that breaks ATS parsing</li>
        <li>One page when you have 7+ years of experience — it looks like you have something to hide</li>
      </ul>

      <h2>Tailor by Sales Motion</h2>
      <p>If you're moving from SMB to enterprise, or from outbound to inbound, your resume needs to address that transition directly in your summary. Sales teams hire for pattern recognition — if your background doesn't obviously match their motion, they'll pass. Acknowledge the gap and address it in your cover letter if needed.</p>
    </>
  ),

  "data-analyst-resume-ats": (
    <>
      <p>Data analyst roles attract candidates from statistics, computer science, economics, and finance. The skills overlap considerably between candidates — which means ATS keyword matching and clear formatting become the primary differentiators at the screening stage.</p>
      <p>Here's what to include and how to structure your resume to pass ATS and make a compelling case to the hiring manager who reads it next.</p>

      <h2>The Keywords That Matter Most for Data Analysts</h2>
      <p><strong>Technical skills — exact match required:</strong></p>
      <ul>
        <li>SQL (and specific dialects: PostgreSQL, MySQL, BigQuery, Snowflake)</li>
        <li>Python (pandas, NumPy, scikit-learn, matplotlib)</li>
        <li>R (if relevant to your background)</li>
        <li>Excel and Google Sheets (still widely required, especially in non-tech industries)</li>
        <li>Visualisation tools: Tableau, Power BI, Looker, Metabase</li>
        <li>Data pipelines and ETL: dbt, Airflow, Fivetran, Stitch</li>
        <li>Cloud platforms: AWS, GCP, Azure (and specific services: Redshift, BigQuery, Azure Synapse)</li>
        <li>A/B testing and statistical analysis</li>
      </ul>
      <p><strong>Domain and process terms:</strong></p>
      <ul>
        <li>Data analysis, data modelling, data visualisation</li>
        <li>KPI, metrics, dashboard, reporting</li>
        <li>Business intelligence, analytics engineering</li>
        <li>Stakeholder communication, data storytelling</li>
        <li>Hypothesis testing, regression analysis, cohort analysis</li>
      </ul>

      <h2>How to Write Data Analyst Bullet Points</h2>
      <p>Every bullet should demonstrate three things: what you analysed, what tool or method you used, and what decision or outcome resulted.</p>
      <p><strong>Weak:</strong> "Created dashboards for the marketing team."</p>
      <p><strong>Strong:</strong> "Built a Tableau dashboard tracking 12 marketing KPIs across 4 channels, enabling the team to reallocate £120K in quarterly spend based on ROAS data — improving overall campaign ROI by 28%."</p>
      <p>The strong version includes: Tableau, marketing KPIs, specific decision, and a business outcome. All searchable. All credible.</p>

      <h2>The Skills Section</h2>
      <p>Your skills section should be comprehensive and grouped by category for readability:</p>
      <ul>
        <li><strong>Languages:</strong> Python, SQL, R</li>
        <li><strong>Tools:</strong> Tableau, Power BI, dbt, Airflow</li>
        <li><strong>Databases:</strong> PostgreSQL, BigQuery, Snowflake</li>
        <li><strong>Methods:</strong> A/B testing, cohort analysis, regression modelling</li>
      </ul>

      <h2>Format for Data Analyst Resumes</h2>
      <p>Single column. Standard section headers. Clean PDF export. The visual polish common in data portfolios (interactive notebooks, infographic CVs) does not belong on your application resume — ATS can't read it and recruiters find it distracting.</p>

      <h2>Tailor for the Industry</h2>
      <p>Data analyst roles vary enormously by industry. A fintech analyst role looks for different context than a healthcare analytics role. Read the job description carefully — the industry-specific terminology (credit risk, patient outcomes, ad attribution) should appear in your resume where it's genuinely relevant to your experience.</p>

      <h2>Portfolio Link</h2>
      <p>Include a link to your GitHub, Kaggle profile, or personal site alongside your contact information. A portfolio doesn't replace keywords — but it reinforces them for the human who reads your resume after it passes ATS.</p>
    </>
  ),

  "project-manager-resume-ats": (
    <>
      <p>Project management is one of the most credential-dense fields in hiring. Certifications, methodologies, tools, and industry experience all interact in the ATS keyword model. Getting past screening requires knowing exactly which terms to include — and where.</p>

      <h2>Why PM Resumes Struggle With ATS</h2>
      <p>Project managers often describe their work in outcome language ("delivered the project," "managed stakeholders") without including the specific terminology recruiters search for. ATS systems score against exact or near-exact terms. "Stakeholder management" and "managed stakeholders" score differently. "Agile project delivery" and "delivered projects using Agile" are not equivalent to an ATS parser.</p>
      <p>The fix is straightforward: use the terminology the job description uses, not your natural way of describing your work.</p>

      <h2>The Keywords Every PM Resume Needs</h2>
      <p><strong>Methodology and process:</strong> Agile, Scrum, Waterfall, Prince2, PMP, PMBOK, Kanban, SAFe, hybrid project management, sprint planning, retrospectives, backlog management.</p>
      <p><strong>Delivery and coordination:</strong> Project lifecycle, milestone management, dependency management, risk management, issue resolution, change management, scope management, resource allocation, project governance.</p>
      <p><strong>Stakeholder and communication:</strong> Stakeholder management, executive reporting, status reporting, steering committee, RACI, cross-functional collaboration.</p>
      <p><strong>Tools:</strong> Jira, Confluence, MS Project, Smartsheet, Monday.com, Asana, Trello, SharePoint. Include every tool you've used professionally.</p>
      <p><strong>Certifications:</strong> PMP, Prince2 Practitioner, PMI-ACP, CAPM, Agile Certified Practitioner. These are often filtered for explicitly in ATS.</p>

      <h2>Writing PM Bullet Points</h2>
      <p>PM bullet points should demonstrate scope, complexity, and outcome. Recruiters want to know: how big was the project, how many people were involved, what did you deliver, and what was the impact?</p>
      <p><strong>Weak:</strong> "Managed a product launch project across multiple teams."</p>
      <p><strong>Strong:</strong> "Led end-to-end delivery of a £1.8M ERP migration across 6 departments and 3 third-party vendors, coordinating a team of 22 using Agile/Scrum methodology. Delivered on schedule and 4% under budget."</p>
      <p>Key elements: budget, team size, methodology, cross-functional scope, and outcome.</p>

      <h2>Certifications Section</h2>
      <p>List certifications prominently — either in a dedicated "Certifications" section or within your skills section. Include the full certification name, issuing body, and year.</p>
      <p><strong>Example:</strong> PMP — Project Management Institute (2023)</p>

      <h2>Format</h2>
      <p>Single column. Two pages is acceptable for PMs with 7+ years of experience. Use standard headers. Keep your most complex, high-value projects visible near the top of your experience entries for each role.</p>
    </>
  ),

  "thank-you-email-after-interview": (
    <>
      <p>Sending a thank you email after an interview is one of those things everyone knows they should do — and roughly half of candidates don't do. Which means doing it puts you ahead of half your competition automatically.</p>
      <p>But the impact depends entirely on how it's written. Here's what works.</p>

      <h2>Why Send One?</h2>
      <p>A thank you email does three things a generic candidate doesn't do for themselves:</p>
      <ul>
        <li><strong>Signals professionalism and follow-through.</strong> Hiring managers notice when candidates close the loop. It's a small signal about how you'll operate on the job.</li>
        <li><strong>Keeps you top of mind.</strong> If a decision takes a week and several candidates are close, a well-timed email can tip the balance.</li>
        <li><strong>Gives you a chance to add something.</strong> If you thought of a better answer after leaving, or want to address something you felt was unclear, the thank you email is where you do it.</li>
      </ul>

      <h2>When to Send It</h2>
      <p>Within 24 hours — ideally the same evening or the next morning. The closer to the interview, the more impact it has. After 48 hours, the benefit diminishes.</p>
      <p>If you interviewed with multiple people, send individual emails to each one — personalised, not copies of each other.</p>

      <h2>The Structure</h2>

      <h3>Subject line</h3>
      <p>Keep it simple and scannable: "Thank you — [Your Name]" or "Following up: [Role] interview". Avoid vague subjects like "Great meeting you!" which can look informal in an inbox.</p>

      <h3>Opening</h3>
      <p>Thank them for their time specifically — mention the role and the date if it helps with context. Don't open with "I just wanted to reach out to say…" — just say the thing.</p>
      <p><strong>Example:</strong> "Thank you for taking the time to speak with me yesterday about the Senior Product Manager role. I really appreciated the conversation."</p>

      <h3>One specific takeaway</h3>
      <p>Reference something from the actual conversation — a challenge they mentioned, a detail about the team, a product decision they described. This proves you were listening and differentiates your email from a templated one.</p>
      <p><strong>Example:</strong> "The context you shared about the platform scaling challenges as you move upmarket is exactly the kind of problem I find compelling — it's very similar to what I worked through at [Company]."</p>

      <h3>Brief reinforcement</h3>
      <p>One sentence confirming your interest and the most relevant thing you bring to the role. Keep it tight — this isn't a cover letter.</p>

      <h3>Close</h3>
      <p>Express that you look forward to next steps. Don't ask for a timeline unless it's been more than a week — that's a follow-up email, not a thank you.</p>

      <h2>What Not to Include</h2>
      <ul>
        <li>Long paragraphs — keep the whole email to 150–200 words</li>
        <li>"I feel I would be a great fit" — show, don't tell</li>
        <li>Desperation signals ("I really hope to hear from you soon")</li>
        <li>Attachments — unless they specifically asked for something</li>
        <li>A follow-up question about compensation or start date — wrong context</li>
      </ul>

      <h2>When You Bombed an Answer</h2>
      <p>If there was a question you answered poorly, the thank you email is the appropriate place to briefly address it. Keep it short: "I wanted to add some context to the question about [topic] — I think I could have answered more clearly. In practice, how I handle this is…"</p>
      <p>Don't over-explain. One or two sentences is enough to correct the record without drawing more attention to it.</p>
    </>
  ),

  "finance-resume-keywords": (
    <>
      <p>Finance hiring is structured, competitive, and credential-sensitive. Whether you're an accountant, financial analyst, controller, or aspiring CFO, your resume needs to speak the language of the specific role you're targeting — and pass ATS screening before a hiring manager sees it.</p>
      <p>Here's how to do both.</p>

      <h2>The Keywords Every Finance Resume Should Cover</h2>
      <p><strong>Core finance and accounting terms:</strong> Financial analysis, financial modelling, financial reporting, variance analysis, budgeting, forecasting, cash flow management, P&L management, balance sheet, income statement.</p>
      <p><strong>Accounting-specific:</strong> GAAP, IFRS, accounts payable, accounts receivable, general ledger, month-end close, year-end close, audit, internal controls, reconciliation, journal entries.</p>
      <p><strong>FP&A and corporate finance:</strong> FP&A, financial planning and analysis, business partnering, scenario modelling, DCF analysis, IRR, NPV, capital budgeting, M&A, due diligence, investor relations.</p>
      <p><strong>Tools and systems:</strong> Excel (advanced), SAP, Oracle, NetSuite, QuickBooks, Workday, Anaplan, Power BI, Tableau, SQL (increasingly common in finance roles).</p>
      <p><strong>Certifications:</strong> CPA, CFA, ACCA, CIMA, ACA, CMA — include the full name and the issuing body. These are commonly used as ATS filters for senior roles.</p>

      <h2>How to Write Finance Bullet Points</h2>
      <p>Finance hiring managers are accustomed to numbers. Your bullet points should be loaded with them.</p>
      <p><strong>Weak:</strong> "Prepared monthly financial reports for senior leadership."</p>
      <p><strong>Strong:</strong> "Produced monthly consolidated P&L, balance sheet, and cash flow reports for a £45M revenue business, reducing reporting cycle from 7 to 3 days through process automation in Excel and SAP."</p>
      <p>Key elements: company size or revenue, what you built, the tool, and the outcome (time saved, cost reduced, accuracy improved, decision enabled).</p>

      <h2>Quantify Differently at Each Level</h2>
      <ul>
        <li><strong>Analyst level:</strong> datasets managed, reports produced, time saved on manual processes</li>
        <li><strong>Manager level:</strong> budget size owned, team size, forecast accuracy</li>
        <li><strong>Director/VP:</strong> revenue or cost impact, M&A deal size, board reporting, transformation projects</li>
      </ul>

      <h2>Certifications Section</h2>
      <p>Finance credentials matter more than in most other fields. Create a dedicated certifications section and list each credential with full name, issuing body, and year obtained. If you're in progress towards a qualification (e.g., CFA Level II), include "In progress — expected [year]."</p>

      <h2>Format</h2>
      <p>Conservative and clean. Finance culture is traditional — a heavily designed creative template signals you don't understand the context. Single column, standard fonts, no graphics. Two pages is standard for candidates with 5+ years of experience.</p>
    </>
  ),

  "marketing-resume-ats": (
    <>
      <p>Marketing is one of the broadest fields in hiring — which creates an ATS challenge. "Marketing" covers everything from paid acquisition to brand strategy to email automation. A generic marketing resume won't match any specific role well.</p>
      <p>The key is knowing which type of marketer you are, using the language of that specialism, and structuring your resume to show measurable results alongside the keywords. Here's how.</p>

      <h2>Marketing Specialisms and Their Keywords</h2>
      <p>Identify your primary track and make sure those keywords are prominent:</p>
      <p><strong>Performance / Growth Marketing:</strong> PPC, paid search, paid social, Google Ads, Meta Ads, programmatic, CPC, CPL, ROAS, conversion rate optimisation (CRO), A/B testing, attribution, Google Analytics, GTM, demand generation.</p>
      <p><strong>Content & SEO:</strong> SEO, content marketing, content strategy, editorial calendar, keyword research, on-page optimisation, backlink building, organic traffic, blog, thought leadership, Ahrefs, SEMrush, Surfer SEO.</p>
      <p><strong>Email & CRM:</strong> Email marketing, marketing automation, lifecycle marketing, customer segmentation, Mailchimp, HubSpot, Klaviyo, Salesforce Marketing Cloud, drip campaigns, open rate, click-through rate, list management.</p>
      <p><strong>Brand & Communications:</strong> Brand strategy, brand identity, messaging, positioning, integrated marketing, campaign management, PR, media relations, copywriting, creative direction.</p>
      <p><strong>Product Marketing:</strong> Go-to-market strategy, product launch, competitive analysis, customer research, sales enablement, persona development, positioning and messaging, win/loss analysis.</p>

      <h2>How to Write Marketing Bullet Points</h2>
      <p>Marketing bullet points live or die by metrics. Every campaign you ran, every channel you owned, every audience you grew — quantify it.</p>
      <p><strong>Weak:</strong> "Managed the company's social media channels and grew the following."</p>
      <p><strong>Strong:</strong> "Grew LinkedIn following from 3,200 to 18,000 in 10 months through a weekly thought leadership content series, generating 400+ marketing-qualified leads per quarter."</p>
      <p>Key metrics to include:</p>
      <ul>
        <li>Audience growth (followers, subscribers, reach)</li>
        <li>Pipeline and revenue generated</li>
        <li>ROAS and cost-per-lead for paid campaigns</li>
        <li>Email open rates and CTR vs. industry benchmarks</li>
        <li>Organic traffic growth and SEO ranking improvements</li>
        <li>Campaign performance vs. targets</li>
      </ul>

      <h2>Tools Section</h2>
      <p>Marketing is highly tool-specific and ATS systems filter by tool names. Include a comprehensive tools section: Google Ads, Meta Business Suite, HubSpot, Salesforce, Mailchimp, Klaviyo, Hootsuite, Buffer, Google Analytics 4, Ahrefs, SEMrush, Canva, Figma, Adobe Creative Suite — list everything you've genuinely used.</p>

      <h2>The Tailoring Problem in Marketing</h2>
      <p>A performance marketer applying for a content role (or vice versa) needs to address the gap directly in their summary rather than sending a generic resume. Marketing hiring managers are attuned to specialism — a generalist resume for a specialist role signals you don't understand what the job actually is.</p>
      <p>Tailor your summary for every application. It takes five minutes and makes the difference between "relevant candidate" and "wrong profile."</p>
    </>
  ),

  "internship-resume-guide": (
    <>
      <p>Internship applications are uniquely competitive. You're often competing against hundreds of candidates for a handful of spots — most of whom, like you, have little or no work experience. The ones who get interviews are the ones who present what they do have most effectively.</p>
      <p>Here's how to build an internship resume that passes ATS and makes a recruiter want to bring you in.</p>

      <h2>What Internship Recruiters Are Actually Screening For</h2>
      <p>Unlike full-time hiring, internship recruiters know you don't have a track record. They're screening for:</p>
      <ul>
        <li><strong>Evidence of relevant skills</strong> — even if from coursework or personal projects</li>
        <li><strong>Academic achievement</strong> — GPA, relevant modules, academic awards</li>
        <li><strong>Drive and initiative</strong> — clubs, societies, side projects, freelance work</li>
        <li><strong>Keyword match</strong> — the same ATS screening applies to internship roles</li>
        <li><strong>Basic professionalism</strong> — formatting, spelling, clear contact information</li>
      </ul>

      <h2>Resume Structure for an Internship Application</h2>

      <h3>Education first</h3>
      <p>For internship candidates, education should lead the resume — not trail it. Include: degree, institution, expected graduation, and GPA if it's 3.5+ or above a 2:1.</p>
      <p>Under your education, add a "Relevant Coursework" section listing modules that relate directly to the internship role. This is a simple keyword strategy that many candidates miss.</p>

      <h3>Skills section</h3>
      <p>List technical skills, tools, and software — even if you've only used them in a university context. For a data internship: Python, SQL, Excel, SPSS, Tableau. For a marketing internship: Google Analytics, Canva, HubSpot, social media platforms. For a finance internship: Excel, Bloomberg (if you've had access), financial modelling, GAAP basics.</p>

      <h3>Experience section</h3>
      <p>Include everything: part-time jobs, volunteer roles, freelance work, society positions. Even a barista role demonstrates reliability, customer service, and working under pressure — describe it that way.</p>
      <p>For university projects and coursework, create a "Projects" section and describe them as you would professional roles: what you did, what tools you used, what the outcome was.</p>

      <h2>Writing Bullet Points With No Professional Experience</h2>
      <p>The formula works the same as for professional roles — you just draw from different sources:</p>
      <ul>
        <li>"Led a 4-person team project analysing consumer sentiment data using Python and pandas, presenting findings to a panel of 3 industry judges — awarded best project in module cohort"</li>
        <li>"Grew the Marketing Society's Instagram account from 200 to 1,400 followers in one semester through a twice-weekly content schedule"</li>
        <li>"Developed a personal finance web app in React with 150+ active users, built in 6 weeks alongside full-time coursework"</li>
      </ul>

      <h2>Length and Format</h2>
      <p>One page. No exceptions for an internship resume. Single column, standard font, no graphics. If your content doesn't fill a page cleanly, that's normal — don't pad it. A tight, well-structured half-page is better than a padded full page.</p>

      <h2>Cover Letter</h2>
      <p>For competitive internship programmes, write a strong cover letter. Internship hiring teams often read them because the resume alone doesn't differentiate candidates who have similar academic backgrounds. Use it to show genuine interest in the company and make a case for why you specifically — given what you have — are worth a conversation.</p>
    </>
  ),

  "how-many-jobs-to-apply-to": (
    <>
      <p>The advice varies wildly. Some career coaches say "apply to everything." Others say "be selective." The truth, as usual, is more specific — and it depends on where you are in the process.</p>

      <h2>What the Data Actually Shows</h2>
      <p>Industry benchmarks from recruiting platforms consistently show:</p>
      <ul>
        <li>The average job application response rate is <strong>2–8%</strong> (meaning 1 interview for every 12–50 applications)</li>
        <li>Response rates improve significantly when resumes are tailored (some studies show 2–3× improvement)</li>
        <li>Most job seekers give up after 20–30 applications if they see no results — before reaching statistical significance</li>
        <li>The median successful job search takes 3–6 months and involves 50–150+ applications at various stages of effort</li>
      </ul>
      <p>The implication: volume matters, but undirected volume without tailoring produces poor results and burns out candidates.</p>

      <h2>The Right Framework: Quality × Volume</h2>
      <p>Think of your job search as two tracks operating in parallel:</p>
      <p><strong>Track 1 — targeted applications (10–15% of your effort, 80% of your quality):</strong> These are roles you're genuinely excited about, well-suited for, and willing to tailor your resume and write a cover letter for. Spend time on these. Follow up. Research the company. Do them right.</p>
      <p><strong>Track 2 — volume applications (85–90% of your effort, 20% of your quality):</strong> Roles that are a reasonable fit where you make targeted keyword adjustments but don't write a full cover letter. These generate pipeline. Most responses will come from here — and if something looks interesting, you can invest more at the interview stage.</p>

      <h2>How Many to Apply to Per Week</h2>
      <p>As a rough guide:</p>
      <ul>
        <li><strong>Actively searching, available now:</strong> 15–30 applications per week. At this volume, expect 1–3 interview requests per week after 2–4 weeks of building momentum.</li>
        <li><strong>Passively searching (currently employed):</strong> 5–10 per week. Focus on quality. You have less urgency and can be more selective.</li>
        <li><strong>Specialist or senior roles:</strong> Lower volume (5–15/week) because the pool is smaller and each application requires more tailoring.</li>
      </ul>

      <h2>When to Stop and Diagnose</h2>
      <p>If you've sent 50+ applications over 4+ weeks and received fewer than 3 responses, something is wrong with the resume — not the volume.</p>
      <p>The most common culprits:</p>
      <ul>
        <li>ATS score is low — your keywords don't match the job descriptions you're applying for</li>
        <li>You're applying to the wrong level (overqualified or underqualified)</li>
        <li>Your resume has a formatting issue that's causing ATS parsing failures</li>
        <li>You're applying to a hyper-competitive role category without differentiation</li>
      </ul>
      <p>Stop adding to the pile and diagnose first. Run your resume through an ATS checker against the job descriptions you've been targeting. If your score is below 65, that's your problem — fix the resume before sending more applications.</p>

      <h2>Referrals Change the Math Entirely</h2>
      <p>A referred application has a response rate of 30–50% compared to 2–8% for cold applications. If you have any connection to a company you're targeting — even a second-degree LinkedIn connection — reaching out before applying dramatically improves your chances.</p>
      <p>The most efficient job search combines moderate application volume with active networking. Applications alone are the slowest path.</p>
    </>
  ),

  "linkedin-vs-resume-differences": (
    <>
      <p>Most people treat their LinkedIn profile as an online version of their resume. It's not — and treating it that way means you're underusing one of them, or possibly both.</p>
      <p>Your resume and LinkedIn profile serve different purposes, reach different audiences, and operate under different rules. Here's how to use each one strategically.</p>

      <h2>The Fundamental Difference</h2>
      <p><strong>Your resume</strong> is a targeted document you send to specific companies in response to specific opportunities. It's tailored, concise, and designed to pass ATS screening and make one decision: should this person get an interview?</p>
      <p><strong>Your LinkedIn profile</strong> is a permanent, public-facing professional identity. It works while you're not actively applying — recruiters find you through search, connections reach out with referrals, and anyone who Googles your name will see it. It's designed to be discoverable and to build a longer-term impression.</p>

      <h2>Tone and Length</h2>
      <p><strong>Resume:</strong> Formal, concise, tight. No word wasted. Bullet points over paragraphs. Third-person implied (you don't say "I managed" — you say "Managed"). Length: 1–2 pages.</p>
      <p><strong>LinkedIn:</strong> More personal and conversational. You can use "I" and write in first person — it's expected. You have more space for narrative, context, and personality. A LinkedIn About section that reads like a formal CV summary misses the point of the platform.</p>

      <h2>What to Include That's Different</h2>
      <p><strong>LinkedIn but not resume:</strong></p>
      <ul>
        <li>Recommendations (written testimonials from colleagues and managers)</li>
        <li>Endorsements for specific skills</li>
        <li>Articles and posts you've written</li>
        <li>Volunteer roles and causes</li>
        <li>Media: links to presentations, videos, published work, case studies</li>
        <li>Education details including clubs and activities</li>
        <li>Professional interests and groups</li>
        <li>Your "Open to Work" or "Hiring" signal</li>
      </ul>
      <p><strong>Resume but not LinkedIn (or handled differently):</strong></p>
      <ul>
        <li>Tailored content for a specific role — your resume should be customised; LinkedIn is one-size-fits-the-world</li>
        <li>Objective statement targeted to a specific position</li>
        <li>Specific formatting choices to pass ATS parsing</li>
      </ul>

      <h2>Keywords: Same Principle, Different Execution</h2>
      <p>Both your resume and LinkedIn profile need to include relevant keywords to be found and scored correctly. But the way you embed them differs.</p>
      <p>On your resume, keywords should appear in specific, strategic places: summary, skills section, and bullet points.</p>
      <p>On LinkedIn, keywords should appear throughout: your headline (220 characters of prime search-indexed text), your About section, your job titles, and your skills list (LinkedIn allows 50 — use them all).</p>
      <p>LinkedIn's search algorithm weights your headline and current job title most heavily. If your title at work is something unusual or internal, consider adding the industry-standard equivalent in your headline: "Head of Customer Success (Account Management | Enterprise | SaaS)".</p>

      <h2>Activity and Consistency</h2>
      <p>LinkedIn rewards activity. Profiles that post, comment, share, and engage rank higher in recruiter searches and get more connection requests. Your resume doesn't care how often you update it (though you should update it before applying).</p>
      <p>Consistency between the two matters. If your resume says you were a "Senior Marketing Manager" at Company X from 2022–2024, your LinkedIn should say the same. Recruiters cross-check. Discrepancies raise flags.</p>

      <h2>The Strategic View</h2>
      <p>Your resume is your active job-search tool — it works when you're looking. Your LinkedIn profile is your passive job-search tool — it works when you're not. Together, they should tell the same career story in different registers.</p>
      <p>Invest in both. A strong LinkedIn profile means you'll hear about opportunities you never would have found yourself. A strong resume means you can act on those opportunities when they arrive.</p>
    </>
  ),

  "software-engineer-resume-ats": (
    <>
      <p>Software engineering roles attract hundreds of applicants. Most of them have the technical skills. The ones who get interviews are the ones whose resumes make it past ATS screening first.</p>
      <p>Tech resumes fail ATS for specific, predictable reasons. Here's what to fix.</p>

      <h2>Why Tech Resumes Specifically Struggle With ATS</h2>
      <p>Software engineers often have beautifully formatted resumes — two columns, custom fonts, project icons, GitHub link badges. These look great as a PDF in someone's email. They look terrible when an ATS tries to parse them.</p>
      <p>Multi-column layouts, in particular, are a parsing disaster. ATS software reads left-to-right across the full width of the page. A two-column layout gets jumbled — your job title might be read next to your education institution, creating nonsense entries that score zero.</p>
      <p>Additionally, tech roles often have highly specific keyword requirements: programming languages, frameworks, cloud platforms, methodologies. If you don't use the exact terms from the job description, your match score suffers even if you have the skill.</p>

      <h2>The Keywords That Matter Most for Software Engineers</h2>
      <p>There are two types of keywords to focus on:</p>
      <p><strong>Technical skills (exact match required):</strong> Programming languages (Python, TypeScript, Go, Rust), frameworks (React, Next.js, Django, FastAPI), databases (PostgreSQL, MongoDB, Redis), cloud platforms (AWS, GCP, Azure), DevOps tools (Docker, Kubernetes, GitHub Actions, Terraform), and methodologies (Agile, Scrum, CI/CD, TDD).</p>
      <p>ATS systems match these exactly. "Node" and "Node.js" may not both match the same query. List the full name and common abbreviations where relevant.</p>
      <p><strong>Soft and contextual keywords:</strong> "Cross-functional collaboration," "stakeholder management," "technical leadership," "system design," "code review," "mentoring." These appear less often in tech resumes but recruiters search for them — especially at senior levels.</p>

      <h2>Format That Passes ATS and Looks Professional</h2>
      <ul>
        <li><strong>Single column only.</strong> Sidebars and multi-column layouts cause parsing errors. Keep everything in a single linear flow.</li>
        <li><strong>Standard section headers.</strong> Use "Work Experience," "Education," "Skills," "Projects." Avoid creative alternatives.</li>
        <li><strong>Skills section near the top.</strong> A dedicated skills section listing your languages, frameworks, and tools is essential for tech roles. Place it before or immediately after your professional summary.</li>
        <li><strong>Clean PDF export.</strong> Export from a word processor or professional tool — not from a design tool that embeds text in SVGs or images.</li>
        <li><strong>Avoid icons and graphics.</strong> ATS can't read them. Stick to text.</li>
      </ul>

      <h2>Writing Bullet Points That Pass ATS and Impress Humans</h2>
      <p>Your experience bullets need to do two things: include keywords, and demonstrate impact. The formula that works:</p>
      <p><strong>[Action verb] + [what you built/did] + [technology used] + [measurable outcome]</strong></p>
      <p><strong>Weak:</strong> "Responsible for backend development and maintaining APIs."</p>
      <p><strong>Strong:</strong> "Designed and built RESTful APIs in Go serving 2M+ daily requests, reducing average latency by 40% through query optimisation and Redis caching."</p>
      <p>The strong version includes: Go, RESTful APIs, Redis — all searchable keywords — plus a concrete outcome that tells a recruiter the scale and impact of your work.</p>

      <h2>Projects Section</h2>
      <p>For engineers earlier in their career, a projects section is critical. Include personal projects, open source contributions, and anything you've built independently. Each entry should mention the technologies used (keywords) and what the project does or achieved.</p>

      <h2>Check Your Score Before You Apply</h2>
      <p>Every job description has a different keyword profile. A resume that scores 85 for a backend Go role at a fintech company might score 55 for a full-stack TypeScript role at a SaaS startup. Tailor before you submit.</p>
      <p>HireBee lets you paste in your resume and the job description, and instantly shows you which keywords you're missing, your match score, and the specific changes that will have the most impact. For software engineers applying to multiple roles, this removes the guesswork from tailoring entirely.</p>
    </>
  ),
}
