import type { Metadata } from "next";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/fraunces/full-italic.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: {
    default: "SeraMD — Medicine, calibrated to you.",
    template: "%s — SeraMD",
  },
  description:
    "Verified peptide medicine, personalized to your biology and guided by real physicians.",
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
