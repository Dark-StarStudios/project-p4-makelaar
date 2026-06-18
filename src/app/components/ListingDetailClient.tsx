"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Euro, Home, Ruler, ShieldCheck } from "lucide-react";
import { getListingBySlug, type AppListing } from "@/lib/payloadClient";
import { ListingImageGallery } from "./ListingImageGallery";

export function ListingDetailClient({ slug }: { slug: string }) {
  const [listing, setListing] = useState<AppListing | null>(null);

  useEffect(() => {
    getListingBySlug(slug).then(setListing).catch(() => setListing(null));
  }, [slug]);

  if (!listing) return <section className="container py-16 text-red-600">Woning niet gevonden of de database is niet bereikbaar.</section>;

  return (
    <>
      <ListingImageGallery title={listing.title} images={listing.images} />

      <section className="container mt-10 grid gap-10 lg:grid-cols-[1fr_430px]">
        <article>
          <h1 className="text-3xl">{listing.title}</h1>
          <p className="mt-2 text-lg">{listing.city}</p>
          <p className="text-lg">{listing.address}</p>
          <p className="mt-7 max-w-2xl text-base leading-8">{listing.description}</p>
        </article>
        <aside className="card p-8">
          <h2 className="mb-5 text-lg">Overzicht</h2>
          <dl className="space-y-5 text-sm">
            <div className="flex justify-between gap-6"><dt className="flex gap-2"><Euro className="h-4 w-4" />Prijs</dt><dd>{listing.price}</dd></div>
            <div className="flex justify-between gap-6"><dt className="flex gap-2"><Ruler className="h-4 w-4" />Prijs per m2</dt><dd>{listing.pricePerMeter}</dd></div>
            <div className="flex justify-between gap-6"><dt className="flex gap-2"><CalendarDays className="h-4 w-4" />Aangeboden sinds</dt><dd>17-04-2026</dd></div>
            <div className="flex justify-between gap-6"><dt className="flex gap-2"><ShieldCheck className="h-4 w-4" />Status</dt><dd>{listing.status}</dd></div>
            <div className="flex justify-between gap-6"><dt className="flex gap-2"><Home className="h-4 w-4" />Beschikbaar</dt><dd>{listing.available}</dd></div>
            <div className="flex justify-between gap-6"><dt>Kamers</dt><dd>{listing.rooms}</dd></div>
            <div className="flex justify-between gap-6"><dt>Keukens</dt><dd>{listing.kitchens}</dd></div>
            <div className="flex justify-between gap-6"><dt>WC's</dt><dd>{listing.toilets}</dd></div>
            <div className="flex justify-between gap-6"><dt>Tuinen</dt><dd>{listing.gardens}</dd></div>
          </dl>
          <a className="btn mt-10 w-full" href="/contact">Reageer op deze woning</a>
        </aside>
      </section>
    </>
  );
}
