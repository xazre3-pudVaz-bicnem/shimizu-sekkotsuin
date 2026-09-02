import Image from "next/image";
import { images, type ImageKey } from "@/content/images";
import { cx } from "@/lib/utils";

type Props = {
  id: ImageKey;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** 親要素（relative + アスペクト比指定）いっぱいに表示する */
  fill?: boolean;
  alt?: string;
  quality?: number;
  /** 切り抜き位置を呼び出し側で上書きする（未指定なら content/images.ts の position を使う） */
  position?: string;
};

/**
 * next/image の薄いラッパー。width/height を必ず渡して CLS を防ぐ。
 * fill を使う場合は呼び出し側で relative とアスペクト比（aspect-[4/3] など）を指定する。
 *
 * 縦長写真を横長の枠に入れると中央基準では顔が切れるため、
 * content/images.ts に position を持つ画像はその位置で切り抜く。
 */
export function Photo({ id, sizes = "100vw", priority = false, className, fill = false, alt, quality = 78, position }: Props) {
  const img = images[id];
  const objectPosition = position ?? ("position" in img ? img.position : undefined);
  if (fill) {
    return (
      <Image
        src={img.src}
        alt={alt ?? img.alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : undefined}
        quality={quality}
        style={objectPosition ? { objectPosition } : undefined}
        className={cx("object-cover", className)}
      />
    );
  }
  return (
    <Image
      src={img.src}
      alt={alt ?? img.alt}
      width={img.width}
      height={img.height}
      sizes={sizes}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      quality={quality}
      className={cx("h-auto w-full", className)}
    />
  );
}
