import { Resend } from "resend"

const FROM = "HireBee <hello@hirebee.app>"

function getResend() {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set")
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendTrialStartedEmail(to: string, trialEndsAt: Date) {
  const chargeDate = trialEndsAt.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  })

  await getResend().emails.send({
    from: FROM,
    to,
    subject: "Your HireBee trial has started",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">

        <!-- Header -->
        <tr><td style="background:#030712;padding:28px 32px;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.3px;">🐝 HireBee</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;letter-spacing:-0.3px;">
            Your 7-day trial has started
          </h1>
          <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
            You now have full access to everything HireBee offers. Here&rsquo;s what&rsquo;s unlocked:
          </p>

          <!-- Features -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:12px;padding:4px 0;margin-bottom:24px;">
            ${[
              ["ATS Resume Scanner", "Unlimited scans with keyword analysis"],
              ["CV Builder", "Build and export ATS-optimized PDFs"],
              ["Cover Letter Generator", "AI-written cover letters in seconds"],
              ["LinkedIn Optimizer", "Score and improve your LinkedIn profile"],
            ].map(([title, desc]) => `
            <tr><td style="padding:10px 16px;">
              <p style="margin:0;font-size:14px;"><span style="color:#0d9488;font-weight:700;">✓</span>&nbsp; <strong style="color:#111827;">${title}</strong> &mdash; <span style="color:#6b7280;">${desc}</span></p>
            </td></tr>`).join("")}
          </table>

          <!-- Billing notice -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin-bottom:24px;">
            <tr><td style="padding:16px 20px;">
              <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#92400e;">Billing reminder</p>
              <p style="margin:0;font-size:14px;color:#78350f;line-height:1.5;">
                Your card will be charged on <strong>${chargeDate}</strong> unless you cancel before then.
                You can cancel anytime from your account settings — no questions asked.
              </p>
            </td></tr>
          </table>

          <!-- CTA -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="https://hirebee.app/analyze"
                 style="display:inline-block;background:#0d9488;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 28px;border-radius:50px;">
                Scan your resume now →
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 32px;border-top:1px solid #f3f4f6;">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
            Questions? Reply to this email or reach us at <a href="mailto:hello@hirebee.app" style="color:#0d9488;">hello@hirebee.app</a>.<br>
            © 2026 HireBee · <a href="https://hirebee.app/privacy" style="color:#9ca3af;">Privacy</a> · <a href="https://hirebee.app/terms" style="color:#9ca3af;">Terms</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}

export async function sendTrialEndingEmail(to: string, chargeDate: Date) {
  const chargeDateStr = chargeDate.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  })

  await getResend().emails.send({
    from: FROM,
    to,
    subject: "Your HireBee trial ends in 2 days",
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">

        <tr><td style="background:#030712;padding:28px 32px;">
          <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;">🐝 HireBee</p>
        </td></tr>

        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111827;letter-spacing:-0.3px;">
            Your trial ends in 2 days
          </h1>
          <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
            Your card will be charged on <strong style="color:#111827;">${chargeDateStr}</strong>.
            If you&rsquo;re happy with HireBee, no action needed — you&rsquo;ll keep full access automatically.
          </p>
          <p style="margin:0 0 24px;font-size:15px;color:#6b7280;line-height:1.6;">
            Want to cancel? Head to your account settings before then — takes 10 seconds.
          </p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:8px;">
                <a href="https://hirebee.app/analyze"
                   style="display:block;text-align:center;background:#0d9488;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 20px;border-radius:50px;">
                  Keep using HireBee →
                </a>
              </td>
              <td>
                <a href="https://hirebee.app/dashboard"
                   style="display:block;text-align:center;background:#f9fafb;color:#6b7280;text-decoration:none;font-weight:600;font-size:14px;padding:13px 20px;border-radius:50px;border:1px solid #e5e7eb;">
                  Manage subscription
                </a>
              </td>
            </tr>
          </table>
        </td></tr>

        <tr><td style="padding:20px 32px;border-top:1px solid #f3f4f6;">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
            Questions? Reply to this email or reach us at <a href="mailto:hello@hirebee.app" style="color:#0d9488;">hello@hirebee.app</a>.<br>
            © 2026 HireBee · <a href="https://hirebee.app/privacy" style="color:#9ca3af;">Privacy</a> · <a href="https://hirebee.app/terms" style="color:#9ca3af;">Terms</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  })
}
