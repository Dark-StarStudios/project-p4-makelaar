"use client";

import { useEffect, useState } from "react";
import { getCurrentUser, getListingById, saveListing, uploadMedia, type AppListing } from "@/lib/payloadClient";

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `woning-${Date.now()}`;
}

function createSlug(value: string, mode: "new" | "edit", currentSlug?: string) {
  if (mode === "edit" && currentSlug) return currentSlug;
  return `${slugify(value)}-${Date.now()}`;
}

function numberValue(value: string) {
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value);
}

function SelectField({ name, label, defaultValue, max }: { name: string; label: string; defaultValue?: string; max: number }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-neutral-700">{label}</span>
      <select className="field" name={name} defaultValue={defaultValue || "1"}>
        {Array.from({ length: max + 1 }, (_, value) => (
          <option key={value} value={String(value)}>{value}</option>
        ))}
      </select>
    </label>
  );
}

export function ListingForm({ mode }: { mode: "new" | "edit" }) {
  const [listing, setListing] = useState<AppListing | null>(null);
  const [images, setImages] = useState<string[]>(["/images/house-exterior.png"]);
  const [imageIDs, setImageIDs] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [price, setPrice] = useState("");
  const [livingArea, setLivingArea] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const current = await getCurrentUser();
        if (!current || current.role !== "admin") {
          window.location.href = "/admin-login";
          return;
        }
        if (mode === "edit") {
          const id = new URLSearchParams(window.location.search).get("id");
          if (!id) return;
          const found = await getListingById(id);
          setListing(found);
          setImages(found.images?.length ? found.images : [found.image]);
          setImageIDs(found.imageIDs || []);
          setPrice(found.price);
          setLivingArea(found.livingArea || "");
        }
      } catch {
        setError("De database is niet bereikbaar. Controleer PostgreSQL en probeer het opnieuw.");
      }
    }
    void load();
  }, [mode]);

  const pricePerMeter = numberValue(price) && numberValue(livingArea) ? formatEuro(numberValue(price) / numberValue(livingArea)) : "";

  async function onImagesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    try {
      setError("");
      const uploaded = await Promise.all(files.map((file) => uploadMedia(file)));
      setImageIDs(uploaded.map((item) => item.id));
      setImages(uploaded.map((item) => item.url || `/api/media/file/${item.filename}`));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Uploaden mislukt.");
    }
  }

  function removeImage(index: number) {
    const nextImages = images.filter((_, itemIndex) => itemIndex !== index);
    const nextImageIDs = imageIDs.filter((_, itemIndex) => itemIndex !== index);
    setImages(nextImages.length ? nextImages : ["/images/house-exterior.png"]);
    setImageIDs(nextImageIDs);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "");
    try {
      await saveListing(
        {
          id: listing?.id,
          slug: createSlug(title, mode, listing?.slug),
          title,
          city: String(form.get("city") || "Tilburg"),
          address: String(form.get("address") || ""),
          price: String(form.get("price") || ""),
          pricePerMeter,
          livingArea: String(form.get("livingArea") || ""),
          rooms: String(form.get("rooms") || "1"),
          kitchens: String(form.get("kitchens") || "1"),
          toilets: String(form.get("toilets") || "1"),
          gardens: String(form.get("gardens") || "0"),
          status: String(form.get("status") || "Beschikbaar"),
          available: String(form.get("available") || ""),
          description: String(form.get("description") || ""),
          image: images[0],
          imageID: imageIDs[0],
          images,
          imageIDs
        },
        mode
      );
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Woning opslaan mislukt. Controleer PostgreSQL/Payload en of je als admin bent ingelogd.");
    }
  }
   const fieldBase =
    "h-[40px] rounded-md bg-white text-black shadow-sm outline-none transition focus:ring-2 focus:ring-black/20 px-4";

  return (
    <form className="w-full max-w-md space-y-3" onSubmit={onSubmit}>
      <input className="field" name="title" defaultValue={listing?.title} placeholder={mode === "edit" ? "Titel wijzigen" : "Titel"} required />
      <label className="field flex cursor-pointer items-center text-neutral-500">
        Upload afbeeldingen&nbsp;&nbsp; (max 3 mb per afbeelding)
        <input className="sr-only" type="file" accept="image/*" multiple onChange={onImagesChange} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="relative overflow-hidden rounded bg-white shadow-soft">
            <div className="aspect-[4/3]">
              <img src={image} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
            </div>
            <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
              {index === 0 ? "Hoofdafbeelding" : `Slider ${index}`}
            </div>
            {imageIDs[index] ? (
              <button className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs text-white" type="button" onClick={() => removeImage(index)}>
                Verwijder
              </button>
            ) : null}
          </div>
        ))}
      </div>
      <input className="field" name="city" defaultValue={listing?.city} placeholder="Plaats" required />
      <input className="field" name="address" defaultValue={listing?.address} placeholder={mode === "edit" ? "Adres wijzigen" : "Adres"} required />
      <input className="field" name="price" value={price} onChange={(event) => setPrice(event.target.value)} placeholder={mode === "edit" ? "Prijs wijzigen" : "Prijs"} required />
      <input className="field" name="livingArea" value={livingArea} onChange={(event) => setLivingArea(event.target.value)} placeholder="Woonoppervlakte in m2" required />
      <input className="field bg-neutral-100" name="pricePerMeter" value={pricePerMeter} placeholder="Prijs per m2 wordt automatisch berekend" readOnly />
      <div className="grid grid-cols-2 gap-3">
        <SelectField name="rooms" label="Aantal kamers" defaultValue={listing?.rooms || "4"} max={12} />
        <SelectField name="kitchens" label="Keukens" defaultValue={listing?.kitchens || "1"} max={4} />
        <SelectField name="toilets" label="WC's" defaultValue={listing?.toilets || "1"} max={6} />
        <SelectField name="gardens" label="Tuinen" defaultValue={listing?.gardens || "1"} max={4} />
      </div>
      <input className="field" name="available" defaultValue={listing?.available} placeholder={mode === "edit" ? "Beschikbaar wijzigen" : "Beschikbaar"} />
      <select className="field" name="status" defaultValue={listing?.status || "Beschikbaar"}><option>Beschikbaar</option><option>Verkocht</option></select>
      <textarea className="field min-h-24 resize-none" name="description" defaultValue={listing?.description} placeholder={mode === "edit" ? "Omschrijving wijzigen" : "Omschrijving"} />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button className="btn mt-12 w-full" type="submit">{mode === "edit" ? "Wijzigingen opslaan" : "Registreren"}</button>
    </form>
  );
}
