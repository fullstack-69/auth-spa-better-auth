import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dbClient } from "@db/client.js"; // your drizzle instance

export const auth = betterAuth({
  database: drizzleAdapter(dbClient, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["*"],
});
