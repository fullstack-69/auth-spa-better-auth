import "dotenv/config";
import Debug from "debug";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@lib/auth.js";
import { PORT } from "@utils/env.js";

const debug = Debug("fs-auth:index");
const app = express();
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(
  cors({
    origin: [],
  })
);
app.use(morgan("dev", { immediate: false }));
app.use(express.urlencoded({ extended: true }));

// Better-Auth
app.all("/api/auth/*splat", toNodeHandler(auth)); // Add catch-all routes
app.use(express.json()); // Mount express json middleware after Better Auth handler

// Running app
app.listen(PORT, async () => {
  debug(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
