const resendKey = process.env.RESEND_API_KEY;
const notifyTo = process.env.NOTIFY_EMAIL || "david@seramd.com";
// Until seramd.com is verified in Resend, the onboarding sender is the only
// address Resend accepts; swap to hello@seramd.com after DNS setup (Phase 5).
const notifyFrom = process.env.NOTIFY_FROM || "SeraMD <onboarding@resend.dev>";

async function sendNotification(subject: string, text: string) {
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
        subject,
        text,
      }),
    });

    if (!response.ok) {
      console.error(`Resend notification failed with status ${response.status}.`);
    }
  } catch (error) {
    // Notification failure must never fail the submission itself.
    console.error(error);
  }
}

export async function notifySignup({
  email,
  source,
  detail,
}: {
  email: string;
  source: string;
  detail?: string;
}) {
  await sendNotification(
    `SeraMD signup: ${email}`,
    `${email} joined via ${source}.${detail ? `\n\n${detail}` : ""}`,
  );
}

export async function notifyContact({
  name,
  email,
  type,
  organization,
  message,
}: {
  name: string;
  email: string;
  type: string;
  organization?: string;
  message: string;
}) {
  await sendNotification(
    `SeraMD ${type} inquiry: ${name}`,
    [
      `Name: ${name}`,
      `Email: ${email}`,
      organization ? `Organization: ${organization}` : null,
      `Type: ${type}`,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  );
}
