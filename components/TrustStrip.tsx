const items = [
  "Prescribed by licensed physicians",
  "503A pharmacy-compounded",
  "Bloodwork-personalized",
  "HIPAA-secure end to end",
];

export default function TrustStrip() {
  return (
    <ul className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-8 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <li key={item} className="border-t border-hairline pt-5">
          <p className="eyebrow text-accent">
            · {String(index + 1).padStart(2, "0")}
          </p>
          <p className="font-display mt-3 text-[21px] leading-[1.15]">
            {item}
          </p>
        </li>
      ))}
    </ul>
  );
}
