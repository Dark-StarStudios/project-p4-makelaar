import { GalleryStrip } from "@/components/GalleryStrip";
import { HeroTitle } from "@/components/HeroTitle";
import { ListingsBrowser } from "@/components/ListingsBrowser";
import { PageShell } from "@/components/PageShell";
import { SearchBar } from "@/components/SearchBar";

type WoningaanbodPageProps = {
  searchParams?: Promise<{
    q?: string;
    min?: string;
    max?: string;
  }>;
};

export default async function WoningaanbodPage({
  searchParams,
}: WoningaanbodPageProps) {
  const params = await searchParams;

  const query = params?.q || "";
  const min = params?.min || "";
  const max = params?.max || "";

  return (
    <PageShell>
      <HeroTitle title="Woningaanbod" />

      <section className="container mt-8">
        <SearchBar
          compact
          defaultQuery={query}
          defaultMin={min}
          defaultMax={max}
        />
      </section>

      <section className="container mt-8">
        <h2 className="section-title text-xl">
          Zoek op {query || "Uw locatie"}
        </h2>

        {(query || min || max) && (
          <p className="mt-2 text-sm text-neutral-600">
            Zoekopdracht: {query || "Geen locatie"}
            {min && ` · vanaf € ${Number(min).toLocaleString("nl-NL")}`}
            {max && ` · tot € ${Number(max).toLocaleString("nl-NL")}`}
          </p>
        )}

        <ListingsBrowser />
      </section>

      <section className="container mt-12">
        <h2 className="section-title text-xl">Populaire aanbiedingen</h2>
        <ListingsBrowser />
      </section>

      <GalleryStrip />
    </PageShell>
  );
}