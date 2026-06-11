import type { ReactNode } from "react";

export default function PullQuote({ children }: { children: ReactNode }) {
  return (
    <p className="display mx-auto max-w-[38ch] text-[26px] leading-[1.3] md:text-[34px]">
      {children}
    </p>
  );
}
