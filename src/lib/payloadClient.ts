"use client";

export type AppUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role?: "user" | "admin";
  createdAt?: string;
};

export type AppListing = {
  id: string;
  slug: string;
  title: string;
  city: string;
  address: string;
  price: string;
  pricePerMeter: string;
  livingArea: string;
  rooms: string;
  kitchens: string;
  toilets: string;
  gardens: string;
  status: string;
  available: string;
  description: string;
  image: string;
  imageID?: string;
  images: string[];
  imageIDs: string[];
};

export type AppMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  createdAt: string;
};

type PayloadList<T> = {
  docs: T[];
};

type PayloadWriteResponse<T> = T | {
  doc: T;
  message?: string;
};

type PayloadMedia = {
  id: string;
  url?: string;
  filename?: string;
};

type PayloadListing = {
  id: string;
  slug: string;
  title: string;
  city: string;
  address: string;
  price: number;
  pricePerMeter?: number;
  livingArea?: number;
  rooms?: number;
  kitchens?: number;
  toilets?: number;
  gardens?: number;
  status?: string;
  available?: string;
  description?: string;
  image?: PayloadMedia | string;
  images?: Array<PayloadMedia | string>;
};

type PayloadUser = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  role?: "user" | "admin";
  createdAt?: string;
};

type PayloadMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  body: string;
  createdAt?: string;
};

function formatEuro(value?: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value || 0);
}

function unwrapDoc<T>(data: PayloadWriteResponse<T>): T {
  if (typeof data === "object" && data !== null && "doc" in data) {
    return data.doc;
  }
  return data;
}

function errorMessage(text: string) {
  if (!text) return "De database is niet bereikbaar. Controleer PostgreSQL en probeer het opnieuw.";

  try {
    const data = JSON.parse(text) as { errors?: Array<{ message?: string }>; message?: string };
    return data.errors?.map((error) => error.message).filter(Boolean).join(" ") || data.message || text;
  } catch {
    return text;
  }
}

function imageURL(image?: PayloadMedia | string) {
  if (!image) return "/images/house-exterior.png";
  if (typeof image === "string") return image;
  return image.url || `/api/media/file/${image.filename}`;
}

function imageID(image?: PayloadMedia | string) {
  if (!image || typeof image === "string") return typeof image === "string" ? image : undefined;
  return image.id;
}

function normalizeListing(listing: PayloadListing): AppListing {
  const galleryImages = listing.images?.length ? listing.images : listing.image ? [listing.image] : [];
  const images = galleryImages.map(imageURL).filter(Boolean);
  const imageIDs = galleryImages.map(imageID).filter((id): id is string => Boolean(id));

  return {
    id: listing.id,
    slug: listing.slug,
    title: listing.title,
    city: listing.city,
    address: listing.address,
    price: formatEuro(listing.price),
    pricePerMeter: formatEuro(listing.pricePerMeter),
    livingArea: String(listing.livingArea || ""),
    rooms: String(listing.rooms || 0),
    kitchens: String(listing.kitchens || 0),
    toilets: String(listing.toilets || 0),
    gardens: String(listing.gardens || 0),
    status: listing.status || "Beschikbaar",
    available: listing.available || "",
    description: listing.description || "",
    image: images[0] || imageURL(listing.image),
    imageID: imageIDs[0] || imageID(listing.image),
    images: images.length ? images : [imageURL(listing.image)],
    imageIDs
  };
}

function normalizeUser(user: PayloadUser): AppUser {
  return {
    id: user.id,
    name: user.name || "",
    email: user.email,
    phone: user.phone || "",
    role: user.role || "user",
    createdAt: user.createdAt ? new Date(user.createdAt).toLocaleDateString("nl-NL") : ""
  };
}

function normalizeMessage(message: PayloadMessage): AppMessage {
  return {
    id: message.id,
    name: message.name,
    email: message.email,
    phone: message.phone || "",
    subject: message.subject || "Contactformulier",
    body: message.body,
    createdAt: message.createdAt ? new Date(message.createdAt).toLocaleString("nl-NL", { dateStyle: "medium", timeStyle: "short" }) : ""
  };
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: "include",
    ...init,
    headers: init?.body instanceof FormData ? init.headers : { "Content-Type": "application/json", ...(init?.headers || {}) }
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(errorMessage(text));
  }

  return response.json() as Promise<T>;
}

export async function getListings() {
  const data = await request<PayloadList<PayloadListing>>("/api/listings?depth=1&limit=100&sort=-createdAt");
  return data.docs.map(normalizeListing);
}

export async function getListingBySlug(slug: string) {
  const data = await request<PayloadList<PayloadListing>>(`/api/listings?depth=1&where[slug][equals]=${encodeURIComponent(slug)}&limit=1`);
  return data.docs[0] ? normalizeListing(data.docs[0]) : null;
}

export async function getListingById(id: string) {
  const data = await request<PayloadListing>(`/api/listings/${id}?depth=1`);
  return normalizeListing(data);
}

export async function saveListing(listing: Partial<AppListing> & { id?: string; imageID?: string; imageIDs?: string[] }, mode: "new" | "edit") {
  const price = Number(String(listing.price || "").replace(/[^\d]/g, "")) || 0;
  const livingArea = Number(listing.livingArea) || 0;
  const imageIDs = listing.imageIDs?.length ? listing.imageIDs : listing.imageID ? [listing.imageID] : [];
  const payload: Record<string, unknown> = {
    title: listing.title,
    slug: listing.slug,
    city: listing.city,
    address: listing.address,
    price,
    livingArea,
    pricePerMeter: price && livingArea ? Math.round(price / livingArea) : 0,
    rooms: Number(listing.rooms) || 0,
    kitchens: Number(listing.kitchens) || 0,
    toilets: Number(listing.toilets) || 0,
    gardens: Number(listing.gardens) || 0,
    status: listing.status,
    available: listing.available,
    description: listing.description,
    image: imageIDs[0] || null,
    images: imageIDs
  };

  const path = mode === "edit" && listing.id ? `/api/listings/${listing.id}` : "/api/listings";
  const method = mode === "edit" ? "PATCH" : "POST";
  const data = await request<PayloadWriteResponse<PayloadListing>>(path, { method, body: JSON.stringify(payload) });
  return normalizeListing(unwrapDoc(data));
}

export async function deleteListing(id: string) {
  await request(`/api/listings/${id}`, { method: "DELETE" });
}

export async function uploadMedia(file: File) {
  if (file.size > 3 * 1024 * 1024) {
    throw new Error("Afbeelding is groter dan 3 mb.");
  }
  const formData = new FormData();
  formData.append("file", file);
  formData.append("_payload", JSON.stringify({ alt: file.name }));
  const data = await request<PayloadWriteResponse<PayloadMedia>>("/api/media", { method: "POST", body: formData });
  return unwrapDoc(data);
}

export async function getUsers() {
  const data = await request<PayloadList<PayloadUser>>("/api/users?limit=100&sort=-createdAt");
  return data.docs.map(normalizeUser);
}

export async function getCurrentUser() {
  const data = await request<{ user: PayloadUser | null }>("/api/users/me");
  return data.user ? normalizeUser(data.user) : null;
}

export async function loginUser(email: string, password: string) {
  const data = await request<{ user: PayloadUser }>("/api/users/login", { method: "POST", body: JSON.stringify({ email, password }) });
  return normalizeUser(data.user);
}

export async function logoutUser() {
  await request("/api/users/logout", { method: "POST", body: JSON.stringify({}) });
}

export async function registerUser(user: { email: string; name: string; password: string; phone?: string }) {
  const data = await request<PayloadWriteResponse<PayloadUser>>("/api/users", { method: "POST", body: JSON.stringify(user) });
  return normalizeUser(unwrapDoc(data));
}

export async function registerAdmin(user: { email: string; name: string; password: string; adminKey: string }) {
  const data = await request<PayloadWriteResponse<PayloadUser>>("/api/admin/register", { method: "POST", body: JSON.stringify(user) });
  return normalizeUser(unwrapDoc(data));
}

export async function updateUser(id: string, data: Partial<AppUser>) {
  const updated = await request<PayloadWriteResponse<PayloadUser>>(`/api/users/${id}`, { method: "PATCH", body: JSON.stringify(data) });
  return normalizeUser(unwrapDoc(updated));
}

export async function deleteUser(id: string) {
  await request(`/api/users/${id}`, { method: "DELETE" });
}

export async function getMessages() {
  const data = await request<PayloadList<PayloadMessage>>("/api/messages?limit=100&sort=-createdAt");
  return data.docs.map(normalizeMessage);
}

export async function getMessageById(id: string) {
  const data = await request<PayloadMessage>(`/api/messages/${id}`);
  return normalizeMessage(data);
}

export async function createMessage(message: Omit<AppMessage, "id" | "createdAt">) {
  const data = await request<PayloadWriteResponse<PayloadMessage>>("/api/messages", { method: "POST", body: JSON.stringify(message) });
  return normalizeMessage(unwrapDoc(data));
}

export async function deleteMessage(id: string) {
  await request(`/api/messages/${id}`, { method: "DELETE" });
}
