import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { Photo } from "@/components/ui/Photo";
import type { ImageKey } from "@/content/images";
import { cx } from "@/lib/utils";

type Props = {
  en?: string;
  title: string;
  lead?: ReactNode;
  image?: ImageKey;
  breadcrumb: Crumb[];
  children?: ReactNode;
  /** 画像の縦横比（Tailwindのaspectクラス） */
  imageAspect?: string;
};

export function PageHero({ en, title, lead, image, breadcrumb, children, imageAspect = "aspect-[4/3]" }: Props) {
  return (
    <section className="border-b border-line bg-mist">
      <div className="container-x pt-5 pb-10 sm:pb-14">
        <Breadcrumb items={breadcrumb} />
        <div className={cx("mt-6 grid items-center gap-8", image && "lg:grid-cols-[1.15fr_1fr] lg:gap-14")}>
          <div>
            {en && <p className="label-en mb-3">{en}</p>}
            <h1 className="text-[1.75rem] leading-snug sm:text-4xl lg:text-[2.5rem]">{title}</h1>
            {lead && <div className="mt-5 max-w-2xl text-base leading-[1.9] text-ink-soft sm:text-lg">{lead}</div>}
            {children}
          </div>
          {image && (
            <div className={cx("relative overflow-hidden rounded-3xl shadow-soft", imageAspect)}>
              <Photo id={image} fill sizes="(min-width: 1024px) 45vw, 100vw" priority />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
