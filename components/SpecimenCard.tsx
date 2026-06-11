// The signature "diagnostic printout" protocol card from seramd-landing.html.
const CheckIcon = () => (
  <span className="check-line" aria-hidden="true">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const rows = [
  { label: "Biomarker panel reviewed", status: "Complete" },
  { label: "US physician oversight", status: "Signed" },
  { label: "Computational lab processing", status: "AI supported", ai: true },
  { label: "Verified sourcing", status: "503A · Audited" },
  { label: "Calibrated dosing protocol", status: "Active" },
  { label: "Certificate of analysis", status: "On file" },
];

export default function SpecimenCard() {
  return (
    <aside className="protocol" aria-label="Sample patient protocol preview">
      <div className="protocol-head">
        <span className="protocol-head-l">Protocol · Sample</span>
        <span className="protocol-head-r">001 / 24</span>
      </div>
      <div className="protocol-title-row">
        <p className="protocol-title">
          Calibrated for the <span className="highlight">biology of one.</span>
        </p>
      </div>
      <ul className="protocol-list">
        {rows.map((row) => (
          <li key={row.label} className={row.ai ? "protocol-list-ai" : undefined}>
            <span className="protocol-list-l">
              {row.ai ? <span className="ai-dot" aria-hidden="true" /> : <CheckIcon />}
              {row.label}
            </span>
            <span className="protocol-list-r">{row.status}</span>
          </li>
        ))}
      </ul>
      <div className="protocol-footer">
        <span className="protocol-status-label">Status</span>
        <span className="protocol-status-val">CALIBRATED</span>
      </div>
    </aside>
  );
}
