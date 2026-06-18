"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type ListingImageGalleryProps = {
  title: string;
  images: string[];
};

export function ListingImageGallery({ title, images }: ListingImageGalleryProps) {
  const galleryImages = images.length ? images : ["/images/house-exterior.png"];
  const [active, setActive] = useState(0);
  const canSlide = galleryImages.length > 1;

  function previousImage() {
    setActive((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  }

  function nextImage() {
    setActive((current) => (current + 1) % galleryImages.length);
  }

  return (
    <section className="container mt-8">
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="relative overflow-hidden rounded-md bg-white shadow-soft">
          <div className="aspect-[16/9]">
            <img src={galleryImages[active]} alt={`${title} foto ${active + 1}`} className="h-full w-full object-cover" />
          </div>
          {canSlide ? (
            <>
              <button className="btn absolute left-4 top-1/2 h-11 w-11 -translate-y-1/2 px-0" type="button" aria-label="Vorige foto" onClick={previousImage}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="btn absolute right-4 top-1/2 h-11 w-11 -translate-y-1/2 px-0" type="button" aria-label="Volgende foto" onClick={nextImage}>
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>

        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              className={`overflow-hidden rounded-md border bg-white p-0 shadow-soft transition ${index === active ? "border-neutral-900" : "border-[#d7c8bf] opacity-75 hover:opacity-100"}`}
              aria-label={`Toon foto ${index + 1}`}
              onClick={() => setActive(index)}
            >
              <span className="block aspect-[16/10]">
                <img src={image} alt={`${title} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {canSlide ? (
        <div className="mt-5 flex justify-center gap-2" aria-label="Foto navigatie">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-dot-${index}`}
              type="button"
              className={`h-2.5 w-2.5 rounded-full ${index === active ? "bg-neutral-900" : "bg-neutral-400"}`}
              aria-label={`Ga naar foto ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
