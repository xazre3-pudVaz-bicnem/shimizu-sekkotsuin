import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { Photo } from "@/components/ui/Photo";
import type { ImageKey } from "@/content/images";
import { cx } from "@/lib/utils";

type Props = {
  /** 見出しの上に置く短い日本語ラベル（任意） */
  kicker?: string;
  title: string;
  lead?: ReactNode;
  image?: ImageKey;
  /** 画像がAI生成のイメージ画像のとき true（キャプションを表示） */
  imageIsIllustration?: boolean;
  breadcrumb: Crumb[];
  children?: ReactNode;
  /** 画像の縦横比（Tailwindのaspectクラス） */
  imageAspect?: string;
};

export function PageHero({ kicker, title, lead, image, imageIsIllustration, breadcrumb, children, imageAspect = "aspect-[4/3]" }: Props) {
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-x pt-5 pb-10 sm:pb-14">
        <Breadcrumb items={breadcrumb} />
        <div className={cx("mt-6 grid items-center gap-8", image && "lg:grid-cols-[1.15fr_1fr] lg:gap-14")}>
          <div>
            {kicker && <p className="mb-2.5 text-sm font-bold tracking-wide text-brand-700">{kicker}</p>}
            <h1 className="text-[1.75rem] leading-snug sm:text-4xl lg:text-[2.5rem]">{title}</h1>
            {lead && <div className="mt-5 max-w-2xl text-base leading-[1.85] text-ink-soft sm:text-[17px]">{lead}</div>}
            {children}
          </div>
          {image && (
            <div>
              <div className={cx("relative overflow-hidden rounded-3xl bg-white shadow-soft", imageAspect)}>
                <Photo id={image} fill sizes="(min-width: 1024px) 45vw, 100vw" priority />
              </div>
              {imageIsIllustration && <p className="mt-2 text-right text-xs text-muted">※イラスト・写真はイメージです</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
