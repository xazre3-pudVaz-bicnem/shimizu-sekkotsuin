"use client";

import Image from "next/image";
import { useState } from "react";

/** クリックするまで iframe を読み込まない軽量なYouTube埋め込み */
export function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false);
  if (play) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlay(true)}
      aria-label={`動画を再生：${title}`}
      className="group absolute inset-0 h-full w-full"
    >
      <Image src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-brand-700 shadow-soft">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
