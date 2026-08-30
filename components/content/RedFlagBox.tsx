import { AlertIcon } from "@/components/ui/Icons";

type Props = { intro: string; items: string[]; outro: string; title?: string };

/** 医療機関の受診を優先すべき状態（レッドフラッグ）の案内 */
export function RedFlagBox({ intro, items, outro, title = "次のような状態のときは、まず医療機関（整形外科など）を受診してください" }: Props) {
  return (
    <div className="rounded-2xl border border-warn-line bg-warn-bg p-5 sm:p-7">
      <p className="flex items-start gap-3 text-lg font-bold leading-snug text-warn">
        <AlertIcon size={24} className="mt-0.5 shrink-0" />
        <span>{title}</span>
      </p>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft sm:text-base">{intro}</p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink sm:text-base">
            <span aria-hidden="true" className="mt-[0.75em] block h-2 w-2 shrink-0 rounded-full bg-warn" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft sm:text-base">{outro}</p>
    </div>
  );
}
