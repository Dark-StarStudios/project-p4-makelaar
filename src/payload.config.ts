import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import { Listings } from "./payload/collections/Listings";
import { Media } from "./payload/collections/Media";
import { Messages } from "./payload/collections/Messages";
import { Users } from "./payload/collections/Users";

export default buildConfig({
  admin: {
    user: Users.slug
  },
  routes: {
    admin: "/payload",
    api: "/api"
  },
  collections: [Users, Listings, Media, Messages],
  secret: process.env.PAYLOAD_SECRET || "development-secret-change-me",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "postgres://postgres:postgres@127.0.0.1:5432/jouw_woning"
    }
  })
});
