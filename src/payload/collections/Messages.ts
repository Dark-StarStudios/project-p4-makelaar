import type { CollectionConfig } from "payload";

export const Messages: CollectionConfig = {
  slug: "messages",
  admin: {
    useAsTitle: "subject"
  },
  access: {
    read: ({ req }) => req.user?.role === "admin",
    create: () => true,
    update: ({ req }) => req.user?.role === "admin",
    delete: ({ req }) => req.user?.role === "admin"
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text" },
    { name: "subject", type: "text", required: true, defaultValue: "Contactformulier" },
    { name: "body", type: "textarea", required: true }
  ]
};
