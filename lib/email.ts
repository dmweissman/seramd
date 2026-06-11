const resendKey = process.env.RESEND_API_KEY;
const notifyTo = process.env.NOTIFY_EMAIL || "david@seramd.com";
// Until seramd.com is verified in Resend, the onboarding sender is the only
// address Resend accepts; swap to hello@seramd.com after DNS setup (Phase 5).
const notifyFrom = process.env.NOTIFY_FROM || "SeraMD <onboarding@resend.dev>";

export async function notifySignup({
  email,
  source,
  detail,
}: {
  email: string;
  source: string;
  detail?: string;
}) {
  if (!resendKey) {
    return;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${resendKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: notifyFrom,
        to: [notifyTo],
        subject: `SeraMD signup: ${email}`,
        text: `${email} joined via ${source}.${detail ? `\n\n${detail}` : ""}`,
      }),
    });

    if (!response.ok) {
      console.error(`Resend notification failed with status ${response.status}.`);
    }
  } catch (error) {
    // Notification failure must never fail the signup itself.
    console.error(error);
  }
}
