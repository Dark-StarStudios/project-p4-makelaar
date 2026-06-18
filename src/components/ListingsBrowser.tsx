"use client";

import { useEffect, useMemo, useState } from "react";
import { getListings, type AppListing } from "@/lib/payloadClient";

function priceNumber(price: string) {
  return Number(price.replace(/[^\d]/g, "")) || 0;
}

export function ListingsBrowser({ repeat = 1 }: { repeat?: number }) {
  const [listings, setListings] = useState<AppListing[]>([]);
  const [query, setQuery] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    setMin(params.get("min") || "");
    setMax(params.get("max") || "");
    getListings()
      .then(setListings)
      .catch(() => setError("De database is niet bereikbaar. Controleer PostgreSQL en probeer het opnieuw."));
  }, []);

  const filtered = useMemo(() => {
    const minPrice = Number(min) || 0;
    const maxPrice = Number(max) || Number.MAX_SAFE_INTEGER;
    const text = query.toLowerCase();
    return listings.filter((listing) => {
      const searchable = `${listing.title} ${listing.city} ${listing.address}`.toLowerCase();
      const price = priceNumber(listing.price);
      return searchable.includes(text) && price >= minPrice && price <= maxPrice;
    });
  }, [listings, query, min, max]);

  const items = Array.from({ length: repeat }).flatMap(() => filtered);

  return (
    <div className="card border-none grid grid-cols-1 justify-items-center gap-10 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {error ? <p className="col-span-full py-8 text-red-600">{error}</p> : null}
      {items.map((listing, index) => (
        <article key={`${listing.id}-${index}`} className="w-full max-w-[230px] bg-white p-3 shadow-soft rounded-md">
          <a href={`/woningaanbod/${listing.slug}`} className="block">
            <div className="aspect-[4/3] overflow-hidden">
              <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-3 text-[17px] leading-tight">{listing.title}</h3>
            <p className="text-sm text-neutral-700">{listing.city}</p>
            <p className="mt-1 text-sm">{listing.price}</p>
          </a>
          <a href={`/woningaanbod/${listing.slug}`} className="btn mt-5 w-full text-xs">bekijk aanbod</a>
        </article>
      ))}
      {!error && items.length === 0 ? <p className="col-span-full py-8">Geen woningen gevonden.</p> : null}
    </div>
  );
}
