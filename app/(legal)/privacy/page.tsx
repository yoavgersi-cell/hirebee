import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HireBee collects, uses, and protects your personal data.",
  alternates: { canonical: "https://hirebee.app/privacy" },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 3, 2026</p>

      <p className="text-gray-600 leading-relaxed">
        HireBee (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates hirebee.app. This policy explains what data we
        collect, why we collect it, and how we protect it. By using HireBee you agree to this policy.
      </p>

      <Section title="1. Data We Collect">
        <ul>
          <li><strong>Account data</strong> — email address and hashed password when you register.</li>
          <li><strong>Resume &amp; job content</strong> — resume text, job descriptions, and cover letters you submit for analysis or storage.</li>
          <li><strong>Usage data</strong> — pages visited, features used, and timestamps (via Vercel Analytics — anonymised, no cookies).</li>
          <li><strong>Payment data</strong> — subscription status and plan. Card details are handled entirely by Paddle and never reach our servers.</li>
        </ul>
      </Section>

      <Section title="2. How We Use Your Data">
        <ul>
          <li>To provide the AI analysis, CV builder, cover letter, and LinkedIn optimization features.</li>
          <li>To manage your account and subscription.</li>
          <li>To improve product quality (aggregate, anonymised usage patterns only).</li>
          <li>To send transactional emails (account confirmation, billing receipts). We do not send marketing emails without your explicit opt-in.</li>
        </ul>
      </Section>

      <Section title="3. AI Processing">
        <p>
          Resume and job description text you submit is sent to Anthropic&apos;s Claude API for analysis. Anthropic
          processes this data on our behalf under their{" "}
          <a href="https://www.anthropic.com/privacy" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">
            privacy policy
          </a>
          . Your data is not used to train Anthropic&apos;s models under our API agreement.
        </p>
      </Section>

      <Section title="4. Third-Party Services">
        <ul>
          <li><strong>Supabase</strong> — database hosting (EU/US). Your data is encrypted at rest and in transit.</li>
          <li><strong>Vercel</strong> — application hosting and anonymised analytics.</li>
          <li><strong>Paddle</strong> — payment processing and subscription management.</li>
          <li><strong>Anthropic</strong> — AI analysis via Claude API.</li>
        </ul>
        <p>We do not sell your data to any third party, ever.</p>
      </Section>

      <Section title="5. Data Retention">
        <p>
          We retain your account data for as long as your account is active. If you delete your account, all
          associated resumes, cover letters, and analysis results are permanently deleted within 30 days.
          Anonymised, aggregated usage statistics are retained indefinitely.
        </p>
      </Section>

      <Section title="6. Your Rights (GDPR &amp; CCPA)">
        <p>You have the right to:</p>
        <ul>
          <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
          <li><strong>Rectification</strong> — correct inaccurate data.</li>
          <li><strong>Erasure</strong> — request deletion of your account and all associated data.</li>
          <li><strong>Portability</strong> — receive your data in a machine-readable format.</li>
          <li><strong>Objection</strong> — object to processing for direct marketing at any time.</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href="mailto:hello@hirebee.app" className="text-teal-600 hover:underline">hello@hirebee.app</a>.
          We will respond within 30 days.
        </p>
      </Section>

      <Section title="7. Cookies">
        <p>
          HireBee uses only a single session cookie for authentication (NextAuth). We do not use advertising
          cookies or third-party tracking cookies. Vercel Analytics is cookieless and privacy-friendly.
        </p>
      </Section>

      <Section title="8. Security">
        <p>
          All data is transmitted over HTTPS. Passwords are hashed with bcrypt and never stored in plain text.
          Database access is restricted to our application servers. We follow industry-standard security practices
          and review them regularly.
        </p>
      </Section>

      <Section title="9. Changes to This Policy">
        <p>
          We may update this policy from time to time. We will notify you by email or an in-app notice at least
          14 days before any material changes take effect. Continued use after that date constitutes acceptance.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          Questions or concerns? Email us at{" "}
          <a href="mailto:hello@hirebee.app" className="text-teal-600 hover:underline">hello@hirebee.app</a>.
        </p>
      </Section>
    </article>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-teal-600 [&_a:hover]:underline">
        {children}
      </div>
    </div>
  )
}
