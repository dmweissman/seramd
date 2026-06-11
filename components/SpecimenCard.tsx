type MetaEntry = {
  label: string;
  value: string;
};

type SpecimenCardProps = {
  recordLabel?: string;
  recordId?: string;
  sequenceHeader?: string;
  sequence?: string;
  meta?: MetaEntry[];
};

// Placeholder specimen data until seramd-landing.html supplies the real card
// content. The sequence is illustrative notation, not a named compound.
const defaultMeta: MetaEntry[] = [
  { label: "Purity", value: "≥ 99% (HPLC)" },
  { label: "Verification", value: "Independent third-party lab" },
  { label: "Documentation", value: "COA with every shipment" },
  { label: "Oversight", value: "US licensed physicians" },
];

export default function SpecimenCard({
  recordLabel = "Specimen Record",
  recordId = "SER-001",
  sequenceHeader = ">SER-001 · synthetic peptide · reference notation",
  sequence = "GLSDP ATKSF VEQNR ILGDH TYWAE",
  meta = defaultMeta,
}: SpecimenCardProps) {
  return (
    <article className="border border-hairline bg-paper">
      <header className="flex items-baseline justify-between gap-4 border-b border-hairline px-6 py-4">
        <span className="eyebrow text-ink">{recordLabel}</span>
        <span className="eyebrow text-accent">{recordId}</span>
      </header>

      <div className="px-6 py-8">
        <p className="font-mono text-[11px] tracking-[0.08em] text-muted">
          {sequenceHeader}
        </p>
        <p className="mt-4 font-mono text-[15px] leading-[2] tracking-[0.32em] break-words md:text-[17px]">
          {sequence}
        </p>
      </div>

      <dl className="grid grid-cols-1 border-t border-hairline sm:grid-cols-2">
        {meta.map((entry, index) => (
          <div
            key={entry.label}
            className={`px-6 py-4 ${index > 0 ? "border-t border-hairline sm:border-t-0" : ""} ${
              index >= 2 ? "sm:border-t" : ""
            } ${index % 2 === 1 ? "sm:border-l" : ""} sm:border-hairline`}
          >
            <dt className="eyebrow text-muted">{entry.label}</dt>
            <dd className="mt-1.5 text-[14px] leading-snug">{entry.value}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
