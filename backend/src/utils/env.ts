import "dotenv/config";

export const NODE_ENV = (process.env.NODE_ENV ?? "") as
  | "production"
  | "development";

if (!["production", "development"].includes(NODE_ENV)) {
  throw new Error("Invalid NODE_ENV");
}

export const PORT = process.env.BACKEND_PORT ?? "5002";

const githubClientSecret = process.env.GITHUB_CLIENT_SECRET ?? "";
const githubClientID = process.env.GITHUB_CLIENT_ID ?? "";

if (!githubClientID || !githubClientSecret) throw new Error("Invalid ENV");

export const github = {
  githubClientID,
  githubClientSecret,
};
