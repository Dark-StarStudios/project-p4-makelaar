import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email"
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req, id }) => req.user?.role === "admin" || req.user?.id === id,
    delete: ({ req }) => req.user?.role === "admin"
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "phone", type: "text" },
    {
      name: "role",
      type: "select",
      defaultValue: "user",
      options: ["user", "admin"],
      access: {
        create: ({ req }) => req.user?.role === "admin",
        update: ({ req }) => req.user?.role === "admin"
      }
    }
  ]
};
