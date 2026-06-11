import type { ReactNode } from "react";

type ProtocolRow = {
  label: string;
  status: string;
  accent?: boolean;
};

type SpecimenCardProps = {
  headLabel?: string;
  headId?: string;
  title?: ReactNode;
  rows?: ProtocolRow[];
  statusLabel?: string;
  statusValue?: string;
};

// Signature element. Content mirrors the protocol card in
// seramd-landing.html, rendered in the hairline/mono specimen treatment.
const defaultRows: ProtocolRow[] = [
  { label: "Biomarker panel reviewed", status: "Complete" },
  { label: "US physician oversight", status: "Signed" },
  { label: "Computational lab processing", status: "AI supported", accent: true },
  { label: "Verified sourcing", status: "503A · Audited" },
  { label: "Calibrated dosing protocol", status: "Active" },
  { label: "Certificate of analysis", status: "On file" },
];

export default function SpecimenCard({
  headLabel = "Protocol · Sample",
  headId = "SER-001",
  title = (
    <>
      Calibrated for the <em className="text-accent">biology of one.</em>
    </>
  ),
  rows = defaultRows,
  statusLabel = "Status",
  statusValue = "Calibrated",
}: SpecimenCardProps) {
  return (
    <article className="border border-hairline bg-paper">
      <header className="flex items-baseline justify-between gap-4 border-b border-hairline bg-surface px-6 py-4">
        <span className="eyebrow text-muted">{headLabel}</span>
        <span className="eyebrow text-accent">{headId}</span>
      </header>

      <p className="display border-b border-hairline px-6 py-6 text-[24px] italic md:text-[26px]">
        {title}
      </p>

      <ul className="m-0 list-none p-0">
        {rows.map((row, index) => (
          <li
            key={row.label}
            className={`flex items-baseline justify-between gap-4 px-6 py-3.5 ${
              index > 0 ? "border-t border-dashed border-hairline" : ""
            }`}
          >
            <span className="flex items-baseline gap-3 text-[14px] font-medium">
              <span
                className={`font-mono text-[10px] tracking-[0.14em] ${
                  row.accent ? "text-accent" : "text-muted"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {row.label}
            </span>
            <span
              className={`font-mono text-[10.5px] uppercase tracking-[0.14em] ${
                row.accent ? "text-accent" : "text-muted"
              }`}
            >
              {row.status}
            </span>
          </li>
        ))}
      </ul>

      <footer className="flex items-center justify-between border-t border-hairline bg-surface px-6 py-3.5">
        <span className="eyebrow text-muted">{statusLabel}</span>
        <span className="bg-accent-soft px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent">
          {statusValue}
        </span>
      </footer>
    </article>
  );
}
