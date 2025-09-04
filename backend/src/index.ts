import "dotenv/config";
import Debug from "debug";
import express from "express";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import { auth } from "@lib/auth.js";

const debug = Debug("fs-auth:index");
const app = express();
app.set("view engine", "pug");
app.use(express.static("public"));

// app.all("/api/auth/*", toNodeHandler(auth)); // For ExpressJS v4
app.all("/api/auth/*splat", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev", { immediate: true }));
// app.use(useragent.express());
// app.use(async (req, res, next) => {
//   const session = await auth.api.getSession({
//     headers: fromNodeHeaders(req.headers),
//   });
//   console.log({ session });
//   next();
// });

app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

// * Endpoints
app.get("/", async (req, res, next) => {
  console.log({ user: req.user });
  res.render("pages/index", {
    title: "Home",
    user: req.user,
    sessions: null,
  });
});

app.get("/login", function (req, res) {
  res.render("pages/login", {
    title: "Login",
  });
});

app.post("/login", async function (req, res, next) {
  debug("@login handler - set session info");
  console.log(req.body);
  const email = req.body?.email ?? "";
  const password = req.body?.password ?? "";

  try {
    const user = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
      },
    });
    console.log({ user });
    res.setHeader("HX-Redirect", "/");
    res.send(`<div></div>`);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err?.message ?? "Something wrong");
    return next();
  }
});

app.get("/signup", function (req, res) {
  res.render("pages/signup", {
    title: "Signup",
  });
});

app.post("/signup", async function (req, res, next) {
  console.log(req.body);
  const name = req.body?.name ?? "";
  const email = req.body?.email ?? "";
  const password = req.body?.password ?? "";
  const passwordConfirm = req.body?.passwordConfirm ?? "";

  if (password !== passwordConfirm) {
    res.status(401).send("Passwords not matched.");
    return next(); // If I don't return, the function will continue executing.
  }

  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
    // await createUser(name, email, password);
    res.setHeader("HX-Redirect", "/login");
    res.send(`<div></div>`);
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err?.message ?? "Something wrong");
    return next();
  }
});

// * Running app
const PORT = process.env.BACKEND_PORT || "5001";
app.listen(PORT, async () => {
  debug(`Listening on port ${PORT}: http://localhost:${PORT}`);
});
