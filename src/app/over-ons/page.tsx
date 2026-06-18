import Image from "next/image";
import { FaqList } from "@/components/FaqList";
import { GalleryStrip } from "@/components/GalleryStrip";
import { HeroTitle } from "@/components/HeroTitle";
import { PageShell } from "@/components/PageShell";

export default function OverOnsPage() {
  return (
    <PageShell>
      <HeroTitle title="Over ons" />
      <section className="container mt-14 grid gap-8 md:grid-cols-2">
        <article className="card p-8">
          <h2 className="text-2xl">Over ons</h2>
          <h3 className="mt-4 font-semibold">Wie zijn wij?</h3>
          <p className="text-sm leading-6">Wij zijn een betrokken team dat zich inzet om kopers en verkopers op de juiste manier samen te brengen.</p>
          <h3 className="mt-4 font-semibold">Onze missie</h3>
          <p className="text-sm leading-6">Ons doel is om kwalitatieve woningen bereikbaar te maken voor iedereen. Wij geloven in eerlijkheid, vertrouwen en langdurige relaties met onze klanten.</p>
          <p className="mt-7 text-sm">Heb u vragen? Kijk op FAQ of...</p>
          <a href="/contact" className="btn mt-4">Contact met ons</a>
        </article>
        <div className="relative min-h-[360px] overflow-hidden rounded-lg shadow-soft">
          <Image src="/images/handover.png" alt="Over Jouw Woning" fill className="object-cover" sizes="50vw" />
        </div>
      </section>

      <FaqList />
      <GalleryStrip />
    </PageShell>
  );
}
