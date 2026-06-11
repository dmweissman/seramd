import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

const siteTitle = "SeraMD — Medicine, calibrated to you.";
const siteDescription =
  "Verified peptide medicine, personalized to your biomarkers and guided by US-licensed physicians.";

export const metadata: Metadata = {
  metadataBase: new URL("https://seramd.com"),
  title: {
    default: siteTitle,
    template: "%s — SeraMD",
  },
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://seramd.com",
    siteName: "SeraMD",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
