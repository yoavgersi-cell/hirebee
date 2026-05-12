import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms and conditions that govern your use of HireBee.",
  alternates: { canonical: "https://hirebee.app/terms" },
  robots: { index: true, follow: true },
  openGraph: { title: "Terms of Service | HireBee", description: "The terms and conditions that govern your use of HireBee.", url: "https://hirebee.app/terms" },
}

export default function TermsPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 3, 2026</p>

      <p className="text-gray-600 leading-relaxed">
        HireBee is operated by <strong>Planner hub</strong>. These Terms of Service (&ldquo;Terms&rdquo;) govern your
        access to and use of HireBee (&ldquo;Service&rdquo;), operated by Planner hub (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
        By creating an account or using the Service you agree to these Terms. If you do not agree, do not use HireBee.
      </p>

      <Section title="1. The Service">
        <p>
          HireBee provides AI-powered resume analysis, CV building, cover letter generation, and LinkedIn profile
          optimization tools. The Service is provided &ldquo;as is&rdquo; and may be modified, updated, or discontinued
          at any time with reasonable notice.
        </p>
      </Section>

      <Section title="2. Accounts">
        <ul>
          <li>You must be at least 16 years old to use HireBee.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>You are responsible for all activity that occurs under your account.</li>
          <li>You must provide accurate information when creating your account.</li>
          <li>One account per person. Creating multiple accounts to circumvent plan limits is prohibited.</li>
        </ul>
      </Section>

      <Section title="3. Acceptable Use">
        <p>You agree not to:</p>
        <ul>
          <li>Use HireBee for any unlawful purpose or in violation of any applicable law.</li>
          <li>Submit content that infringes any third party&apos;s intellectual property rights.</li>
          <li>Attempt to reverse engineer, scrape, or extract data from the Service.</li>
          <li>Use automated tools to access the Service at a rate that burdens our infrastructure.</li>
          <li>Resell, sublicense, or redistribute access to the Service without written permission.</li>
          <li>Submit false, misleading, or fraudulent resume or job content.</li>
        </ul>
      </Section>

      <Section title="4. Subscriptions &amp; Billing">
        <ul>
          <li>HireBee offers a <strong>7-day free trial</strong>. You will not be charged until the trial ends.</li>
          <li>After the trial, your subscription is <strong>$19/month</strong> and renews automatically each month.</li>
          <li>Payments are processed by <strong>Paddle</strong>, our Merchant of Record. Paddle handles all billing, invoices, and tax compliance.</li>
          <li>You can cancel your subscription at any time from your account settings. Cancellation takes effect at the end of the current billing period — you retain access until then.</li>
          <li>We reserve the right to change pricing with at least 30 days&apos; notice to existing subscribers.</li>
        </ul>
      </Section>

      <Section title="5. Refunds">
        <p>
          Please see our <a href="/refund">Refund Policy</a> for full details. In summary: we offer a full refund
          within 14 days of any paid charge, no questions asked. Payments are processed by Paddle, our Merchant of Record.
        </p>
      </Section>

      <Section title="6. Your Content">
        <p>
          You retain ownership of all content you submit to HireBee (resumes, cover letters, job descriptions).
          By submitting content, you grant us a limited, non-exclusive licence to process it solely for the
          purpose of delivering the Service to you. We do not claim any ownership rights over your content.
        </p>
      </Section>

      <Section title="7. AI-Generated Output">
        <p>
          HireBee uses AI to generate suggestions, rewrites, and analyses. AI output is provided for informational
          purposes only. We make no guarantee that AI-generated content will result in job interviews, offers, or
          any specific outcome. You are responsible for reviewing and verifying any AI-generated text before use.
        </p>
      </Section>

      <Section title="8. Intellectual Property">
        <p>
          The HireBee name, logo, website design, and software are owned by us and protected by intellectual
          property law. Nothing in these Terms grants you a right to use our trademarks or brand assets without
          prior written consent.
        </p>
      </Section>

      <Section title="9. Disclaimers">
        <p>
          The Service is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. We do not warrant
          that the Service will be uninterrupted, error-free, or free from harmful components. ATS scores and AI
          suggestions are estimates — we cannot guarantee any specific hiring outcome.
        </p>
      </Section>

      <Section title="10. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, HireBee shall not be liable for any indirect, incidental,
          special, consequential, or punitive damages, or any loss of profits or revenue, whether incurred
          directly or indirectly. Our total aggregate liability to you for any claims arising from these Terms
          shall not exceed the amount you paid us in the 3 months preceding the claim.
        </p>
      </Section>

      <Section title="11. Termination">
        <p>
          We may suspend or terminate your account if you violate these Terms. You may delete your account at
          any time. Upon termination, your data will be deleted in accordance with our Privacy Policy.
        </p>
      </Section>

      <Section title="12. Governing Law">
        <p>
          These Terms are governed by the laws of the jurisdiction in which HireBee is incorporated. Any disputes
          shall be resolved through binding arbitration or in the courts of that jurisdiction, at our election.
        </p>
      </Section>

      <Section title="13. Changes to These Terms">
        <p>
          We may update these Terms from time to time. We will provide at least 14 days&apos; notice of material
          changes via email or in-app notification. Continued use of the Service after changes take effect
          constitutes acceptance of the revised Terms.
        </p>
      </Section>

      <Section title="14. Contact">
        <p>
          Questions about these Terms? Email us at{" "}
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
