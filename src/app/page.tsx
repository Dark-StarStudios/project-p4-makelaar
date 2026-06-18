import Image from "next/image";
import { GalleryStrip } from "@/components/GalleryStrip";
import { ListingsBrowser } from "@/components/ListingsBrowser";
import { PageShell } from "@/components/PageShell";
import { SearchBar } from "@/components/SearchBar";

export default function HomePage() {
  return (
    <PageShell>
      <section className="image-band">
        <div className="container flex min-h-[360px] flex-col justify-center py-12">
          <h1 className="max-w-2xl text-5xl leading-tight md:text-6xl">Vind je nieuwe woning</h1>
          <p className="mt-2 text-xl">Op de grootste woningmarktplaats van Nederland</p>
          <div className="mt-7 max-w-5xl">
            <SearchBar />
          </div>
        </div>
      </section>

      <section className="container mt-14">
        <h2 className="section-title text-xl">Populaire aanbiedingen</h2>
        <ListingsBrowser />
      </section>

      <section className="container mt-16 grid gap-8 md:grid-cols-2">
        <article className="card p-8">
          <h2 className="text-2xl">Vind je nieuwe woning</h2>
          <h3 className="mt-3 text-lg font-semibold">Wie zijn wij?</h3>
          <p className="mt-1 text-sm leading-6">
            Wij zijn een betrokken team dat zich inzet om kopers en verkopers op de juiste manier samen te brengen.
          </p>
          <h3 className="mt-3 text-lg font-semibold">Onze missie</h3>
          <p className="mt-1 text-sm leading-6">
            Ons doel is om betrouwbare woningen bereikbaar te maken voor iedereen. Wij geloven in eerlijkheid, vertrouwen
            en langdurige relaties met onze klanten.
          </p>
          <a className="btn mt-8" href="/over-ons">
            Over ons
          </a>
        </article>
        <div className="relative min-h-[380px] overflow-hidden rounded-lg shadow-soft">
          <Image src="/images/handover.png" alt="Makelaar met klant" fill className="object-cover" sizes="50vw" />
        </div>
      </section>

      <GalleryStrip />
    </PageShell>
  );
}
