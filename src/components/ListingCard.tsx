import Image from "next/image";
import { Listing } from "@/lib/listings";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="w-full max-w-[230px] bg-white p-3 shadow-soft">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image src={listing.image} alt={listing.title} fill className="object-cover" sizes="230px" />
      </div>
      <h3 className="mt-3 text-[17px] leading-tight">{listing.title}</h3>
      <p className="text-sm text-neutral-700">{listing.city}</p>
      <p className="mt-1 text-sm">{listing.price}</p>
      <a href={`/woningaanbod/${listing.slug}`} className="btn mt-5 w-full text-xs">
        bekijk aanbod
      </a>
    </article>
  );
}
