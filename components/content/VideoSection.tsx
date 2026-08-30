import { videos } from "@/content/videos";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { YouTubeFacade } from "@/components/content/YouTubeFacade";

/** content/videos.ts に動画があるときだけ表示する */
export function VideoSection() {
  if (!videos.length) return null;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading en="Video" title="院内・施術の様子（動画）" lead="院内の雰囲気や施術の流れを動画でご覧いただけます。" />
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {videos.map((v) => (
            <li key={v.id}>
              <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-soft">
                <YouTubeFacade id={v.id} title={v.title} />
              </div>
              <p className="mt-3 font-bold text-ink">{v.title}</p>
              {v.description && <p className="mt-1 text-sm text-muted">{v.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
