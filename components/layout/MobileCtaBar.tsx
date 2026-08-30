import { clinic } from "@/content/clinic";
import { LineIcon, PhoneIcon } from "@/components/ui/Icons";

/** スマホ下部固定のCTA。PC（md以上）では非表示。 */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/98 pb-[env(safe-area-inset-bottom)] md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a href={clinic.telHref} className="btn btn-primary min-h-14 rounded-2xl px-2 text-base">
          <PhoneIcon size={20} />
          <span className="leading-tight">
            <span className="block text-[11px] font-medium opacity-90">電話で相談・予約</span>
            <span className="tel-link block text-[15px]">{clinic.tel}</span>
          </span>
        </a>
        <a href={clinic.line.url} target="_blank" rel="noopener noreferrer" className="btn btn-line min-h-14 rounded-2xl px-2 text-base">
          <LineIcon size={22} />
          <span className="leading-tight">
            <span className="block text-[11px] font-medium opacity-90">24時間受付</span>
            <span className="block text-[15px]">LINEで予約</span>
          </span>
        </a>
      </div>
    </div>
  );
}
