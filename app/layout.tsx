import type { Metadata } from "next";
import "@fontsource/instrument-serif";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: {
    default: "SeraMD — Peptide medicine without the guesswork",
    template: "%s — SeraMD",
  },
  description:
    "SeraMD is a clinical platform for peptide medicine: independently lab-verified batches, US physician oversight, and protocols calibrated to your bloodwork.",
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
