type Step = {
  num: string;
  tag: string;
  title: string;
  body: string;
};

export default function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-x-8 gap-y-10 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <li key={step.num} className="border-t border-ink pt-5">
          <p className="eyebrow text-accent">
            {step.num} · {step.tag}
          </p>
          <p className="font-display mt-3 text-[24px] leading-[1.1]">
            {step.title}
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.6] text-muted">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
