import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  /** Since I am using proxy server, this is not needed. */
  // baseURL: "http://localhost:5002",
  plugins: [passkeyClient()],
});

export type Session = typeof authClient.$Infer.Session.session;
export type User = typeof authClient.$Infer.Session.user;
