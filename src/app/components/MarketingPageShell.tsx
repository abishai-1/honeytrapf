import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface MarketingPageShellProps {
  eyebrow: string;
  title: string;
  lede: string;
  primaryHref: string;
  primaryLabel: string;
  children: ReactNode;
}

export default function MarketingPageShell({
  eyebrow,
  title,
  lede,
  primaryHref,
  primaryLabel,
  children,
}: MarketingPageShellProps) {
  return (
    <div className="bg-slate-100 flex-1">
      <section className="bg-gradient-to-br from-[#003366] via-[#002244] to-[#7f1d1d] text-white py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-red-300 flex items-center gap-1">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{eyebrow}</span>
          </p>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-3xl">{title}</h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed font-medium">{lede}</p>
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold shadow"
          >
            {primaryLabel} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">{children}</div>
    </div>
  );
}

export function MarketingBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
      <h2 className="text-xl font-black text-[#003366]">{title}</h2>
      <div className="text-sm text-slate-600 leading-relaxed space-y-3 font-medium">{children}</div>
    </section>
  );
}
