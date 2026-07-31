import { notifyEmail } from "@/lib/storage";

const resendKey = process.env.RESEND_API_KEY;
// Until seramd.com is verified in Resend, the onboarding sender is the only
// address Resend accepts; swap after email DNS is configured.
const notifyFrom = process.env.NOTIFY_FROM || "SERA MD <onboarding@resend.dev>";

export async function notifyLead(lead: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
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
        to: [notifyEmail],
        subject: `SERA MD founding access: ${lead.firstName} ${lead.lastName} (${lead.interest})`,
        text: [
          `Name: ${lead.firstName} ${lead.lastName}`,
          `Email: ${lead.email}`,
          `Mobile: ${lead.phone}`,
          `Primary interest: ${lead.interest}`,
          `Consent to email/SMS: yes`,
        ].join("\n"),
      }),
    });

    if (!response.ok) {
      console.error(`Resend notification failed with status ${response.status}.`);
    }
  } catch (error) {
    // Notification failure must never fail the lead capture itself.
    console.error(error);
  }
}
