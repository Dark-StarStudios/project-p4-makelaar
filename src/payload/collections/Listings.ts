import type { CollectionConfig } from "payload";

export const Listings: CollectionConfig = {
  slug: "listings",
  admin: {
    useAsTitle: "title"
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === "admin",
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin"
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.price && data?.livingArea) {
          return {
            ...data,
            pricePerMeter: Math.round(Number(data.price) / Number(data.livingArea))
          };
        }
        return data;
      }
    ]
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "city", type: "text", required: true },
    { name: "address", type: "text", required: true },
    { name: "price", type: "number", required: true },
    { name: "livingArea", type: "number", required: true },
    { name: "pricePerMeter", type: "number", admin: { readOnly: true } },
    { name: "rooms", type: "number", required: true, defaultValue: 1 },
    { name: "kitchens", type: "number", required: true, defaultValue: 1 },
    { name: "toilets", type: "number", required: true, defaultValue: 1 },
    { name: "gardens", type: "number", required: true, defaultValue: 0 },
    { name: "available", type: "text" },
    { name: "status", type: "select", options: ["Beschikbaar", "Verkocht"], defaultValue: "Beschikbaar" },
    { name: "description", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media", admin: { hidden: true } },
    {
      name: "images",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      admin: {
        description: "De eerste afbeelding wordt gebruikt als hoofdafbeelding voor woningkaarten. De rest wordt gebruikt in sliders en detailgalerijen."
      }
    }
  ]
};
