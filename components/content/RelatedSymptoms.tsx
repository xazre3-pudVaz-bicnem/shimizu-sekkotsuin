import { getSymptom } from "@/content/symptoms";
import { SymptomCard } from "@/components/content/SymptomCard";

export function RelatedSymptoms({ slugs, title = "関連する症状", exclude }: { slugs: readonly string[]; title?: string; exclude?: string }) {
  const list = slugs
    .filter((s) => s !== exclude)
    .map((s) => getSymptom(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  if (!list.length) return null;
  return (
    <section aria-labelledby="related-symptoms">
      <h2 id="related-symptoms" className="text-xl font-bold text-ink sm:text-2xl">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <li key={s.slug}>
            <SymptomCard symptom={s} compact />
          </li>
        ))}
      </ul>
    </section>
  );
}
