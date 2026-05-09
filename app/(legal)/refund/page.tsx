import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "HireBee's refund and cancellation policy for paid subscriptions.",
  alternates: { canonical: "https://hirebee.app/refund" },
  robots: { index: true, follow: true },
}

export default function RefundPage() {
  return (
    <article className="prose prose-gray max-w-none">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Refund Policy</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: May 3, 2026</p>

      <p className="text-gray-600 leading-relaxed">
        We want you to feel confident using HireBee. If you&apos;re not happy, we make it easy to get your money back.
      </p>

      <Section title="Free Trial">
        <p>
          HireBee offers a <strong>7-day free trial</strong>. You will not be charged until the trial ends.
          Cancel anytime during the trial and you will not be billed — no refund request needed.
        </p>
      </Section>

      <Section title="14-Day Refund Guarantee">
        <p>
          If you are charged and are not satisfied for any reason, you are entitled to a <strong>full refund
          within 14 days of payment</strong>. No questions asked. No conditions. No exceptions.
        </p>
        <p>
          To request a refund, email us at{" "}
          <a href="mailto:hello@hirebee.app" className="text-teal-600 hover:underline">hello@hirebee.app</a>{" "}
          with the subject line &ldquo;Refund Request&rdquo; and the email address on your account.
          We will process your refund within 5 business days.
        </p>
      </Section>

      <Section title="Cancellation">
        <p>
          You can cancel your subscription at any time from your account settings. Cancellation takes effect
          at the end of your current billing period — you keep full access until then and will not be charged again.
        </p>
      </Section>

      <Section title="How Refunds Are Processed">
        <p>
          Payments are processed by <strong>Paddle</strong>, our Merchant of Record. Refunds are returned to
          your original payment method and typically appear within 5–10 business days depending on your bank.
          You will receive a confirmation email once issued.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions? Email us at{" "}
          <a href="mailto:hello@hirebee.app" className="text-teal-600 hover:underline">hello@hirebee.app</a>.
          We respond within one business day.
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
