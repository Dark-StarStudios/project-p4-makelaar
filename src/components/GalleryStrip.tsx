"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getListings } from "@/lib/payloadClient";

type Slide = {
  id: string;
  href: string;
  image: string;
  title: string;
  city: string;
  price: string;
};

export function GalleryStrip() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [start, setStart] = useState(0);

  useEffect(() => {
    getListings()
      .then((listings) => {
        const nextSlides = listings.map((listing) => ({
          id: listing.id,
          href: `/woningaanbod/${listing.slug}`,
          image: listing.image,
          title: listing.title,
          city: listing.city,
          price: listing.price
        }));
        setSlides(nextSlides);
        setStart(0);
      })
      .catch(() => setSlides([]));
  }, []);

  const visibleCount = Math.min(3, slides.length);
  const visible = slides.length > 3
    ? Array.from({ length: visibleCount }, (_, index) => slides[(start + index) % slides.length])
    : slides;
  const canSlide = slides.length > 3;

  return (
    <section className="mt-16 bg-[#f4eaea] py-10">
      <div className="container flex items-center gap-5">
        <button className="btn hidden h-14 w-14 rounded-md px-0 disabled:cursor-not-allowed disabled:opacity-50 md:inline-flex" type="button" disabled={!canSlide} aria-label="Vorige woningen" onClick={() => setStart((current) => (current - 1 + slides.length) % slides.length)}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3">
          {visible.map((slide) => (
            <a key={slide.id} href={slide.href} className="group relative block overflow-hidden rounded-md shadow-soft">
              <div className="aspect-[16/9] overflow-hidden">
                <img src={slide.image} alt={slide.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-white opacity-95">
                <h3 className="text-lg">{slide.title}</h3>
                <p className="text-sm">{slide.city} - {slide.price}</p>
              </div>
            </a>
          ))}
        </div>
        <button className="btn hidden h-14 w-14 rounded-md px-0 disabled:cursor-not-allowed disabled:opacity-50 md:inline-flex" type="button" disabled={!canSlide} aria-label="Volgende woningen" onClick={() => setStart((current) => (current + 1) % slides.length)}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      {canSlide ? (
        <div className="mt-8 flex justify-center gap-3" aria-label="Woningen slider navigatie">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`h-3 w-3 rounded-full transition ${index === start ? "bg-neutral-800" : "bg-neutral-400"}`}
              aria-label={`Toon woning ${index + 1}`}
              onClick={() => setStart(index)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
