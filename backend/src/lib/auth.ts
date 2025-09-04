import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dbClient } from "@db/client.js"; // your drizzle instance
import { github as gh } from "@utils/env.js";

export const auth = betterAuth({
  database: drizzleAdapter(dbClient, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
  },
  socialProviders: {
    github: {
      clientId: gh.githubClientID,
      clientSecret: gh.githubClientSecret,
    },
  },
  trustedOrigins: ["*"],
});
