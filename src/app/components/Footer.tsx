import { Facebook, Instagram, Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 bg-[#101112] text-neutral-300">
      <div className="container py-10">
        <div className="grid gap-10 border-b border-white/10 pb-8 md:grid-cols-3">
          <section>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-[#c49a5a]">Contactgegevens</h2>
            <p className="mb-3 flex items-center gap-3"><Phone className="h-4 w-4 text-[#c49a5a]" />06 12345678</p>
            <p className="mb-3 flex items-center gap-3"><Mail className="h-4 w-4 text-[#c49a5a]" />info@jouwwoning.nl</p>
            <p className="mb-5 flex items-center gap-3"><MapPin className="h-4 w-4 text-[#c49a5a]" />Amsterdam, Nederland</p>
            <div className="flex gap-4">
              <Instagram className="h-6 w-6 text-[#c49a5a]" />
              <Facebook className="h-6 w-6 text-blue-400" />
              <Send className="h-6 w-6 text-green-400" />
            </div>
          </section>
          <section>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-[#c49a5a]">Over Jouw Woning</h2>
            <p className="max-w-sm leading-7">Wij zijn uw betrouwbare partner voor woningen, verkoop en aankoopadvies. Van eerste bezichtiging tot sleuteloverdracht, wij staan voor u klaar.</p>
            <a className="mt-5 inline-flex rounded border border-[#c49a5a] px-6 py-3 text-sm text-white" href="/over-ons">Meer over ons</a>
          </section>
          <section>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-wide text-[#c49a5a]">Bereikbaarheid</h2>
            <p className="mb-5 flex justify-between gap-8"><span>Maandag - Vrijdag</span><span>07:00 - 18:00</span></p>
            <p className="mb-5 flex justify-between gap-8"><span>Zaterdag</span><span>08:00 - 16:00</span></p>
            <p className="flex justify-between gap-8"><span>Zondag</span><span>Gesloten</span></p>
          </section>
        </div>
        <div className="flex flex-col gap-4 pt-6 text-sm md:flex-row md:items-center md:justify-between">
          <p>© 2026 Jouw Woning. Alle rechten voorbehouden.</p>
          <nav className="flex gap-8">
            <a className="inline-flex items-center gap-2" href="/account"><ShieldCheck className="h-4 w-4" />Privacybeleid</a>
            <a href="/account">Algemene voorwaarden</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
