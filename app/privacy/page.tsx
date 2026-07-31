import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="legal-page">
        <div className="container">
          <Link href="/" className="text-link" style={{ marginBottom: 48, display: "inline-flex" }}>
            ← Sera·MD
          </Link>
          <h1 className="display" style={{ marginTop: 40 }}>
            Privacy <em>Policy.</em>
          </h1>
          <p style={{ marginTop: 32 }}>
            SERA MD (&quot;we&quot;) operates this pre-launch website. When you
            join our founding list, we collect the information you submit —
            name, email address, mobile number, and stated interest — solely
            to send you opening updates, previews, and founding access
            communications you have consented to receive.
          </p>
          <h2>What we do with your information</h2>
          <p>
            We store your submission securely, do not sell it, and do not
            share it with third parties except for the service providers that
            deliver our communications. You can opt out at any time: reply
            STOP to any text message, use the unsubscribe link in any email,
            or contact us at david@seramd.com to have your information
            removed.
          </p>
          <h2>Not a patient relationship</h2>
          <p>
            This website does not collect health information and joining the
            list does not create a physician–patient relationship. Please do
            not submit medical details through this site.
          </p>
          <p>
            Questions? Contact{" "}
            <a href="mailto:david@seramd.com">david@seramd.com</a>. This
            policy will be expanded before services launch.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
