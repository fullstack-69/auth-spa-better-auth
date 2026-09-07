import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { dbClient } from "../../db/client.js"; // your drizzle instance
import { github as gh, PORT } from "../utils/env.js";
import { passkey } from "@better-auth/passkey";

export const auth = betterAuth({
  database: drizzleAdapter(dbClient, {
    provider: "sqlite",
  }),
  // 2026-09: Need to add account linking so that the user with existing emails and login with OAuth
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github"],
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
  },
  // 2026-09: Email without verification will block account link, so I need to click at the link before using OAuth
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      console.log(`[Dev Verification URL] for ${user.email}: ${url}`);
    },
  },
  socialProviders: {
    github: {
      clientId: gh.githubClientID,
      clientSecret: gh.githubClientSecret,
    },
  },
  trustedOrigins: ["*"],
  plugins: [
    passkey({
      rpID: "localhost", // Use your domain in production, e.g., 'example.com'
      rpName: "Better Auth Passkey", // Human-readable title shown during the passkey prompt
      origin: `http://localhost:5173`, // Expected origin URL. Notice that this is the frontend URL, not the backend URL. In production, it should be your frontend domain.
    }),
  ],
});
