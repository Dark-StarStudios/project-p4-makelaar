import { listings } from "@/lib/listings";
import { ListingCard } from "./ListingCard";

export function ListingGrid({ repeat = 1 }: { repeat?: number }) {
  const items = Array.from({ length: repeat }).flatMap(() => listings);

  return (
    <div className="card grid grid-cols-1 justify-items-center gap-10 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((listing, index) => (
        <ListingCard key={`${listing.slug}-${index}`} listing={listing} />
      ))}
    </div>
  );
}
