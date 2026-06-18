export type Listing = {
  slug: string;
  title: string;
  city: string;
  address: string;
  price: string;
  pricePerMeter: string;
  rooms: string;
  status: string;
  available: string;
  description: string;
  image: string;
};

export const listings: Listing[] = [
  {
    slug: "huis-met-grass",
    title: "Huis met grass",
    city: "Tilburg",
    address: "786GD Visstraat 5",
    price: "EUR 367.000,00",
    pricePerMeter: "EUR 3.865,75",
    rooms: "6",
    status: "Verkocht",
    available: "Per 20-05-2026",
    description:
      "Deze goed onderhouden woning biedt een comfortabele en praktische indeling. Ideaal voor zowel starters als gezinnen. De woning beschikt over vier slaapkamers, een lichte woonkamer met grote ramen en een ruime tuin.",
    image: "/images/house-exterior.png"
  },
  {
    slug: "familiewoning-visstraat",
    title: "Huis met grass",
    city: "Tilburg",
    address: "Visstraat 9",
    price: "EUR 370.000,00",
    pricePerMeter: "EUR 3.920,00",
    rooms: "5",
    status: "Beschikbaar",
    available: "Per direct",
    description:
      "Een rustige familiewoning met veel daglicht, nette afwerking en een fijne tuin op loopafstand van voorzieningen.",
    image: "/images/house-exterior.png"
  },
  {
    slug: "rustige-hoekwoning",
    title: "Huis met grass",
    city: "Tilburg",
    address: "Lindelaan 22",
    price: "EUR 390.000,00",
    pricePerMeter: "EUR 4.010,00",
    rooms: "6",
    status: "Beschikbaar",
    available: "In overleg",
    description:
      "Ruime hoekwoning met een lichte woonkamer, moderne keuken en een verzorgde achtertuin.",
    image: "/images/house-exterior.png"
  }
];

export const galleryImages = [
  "/images/house-exterior.png",
  "/images/living-room.png",
  "/images/handover.png"
];
