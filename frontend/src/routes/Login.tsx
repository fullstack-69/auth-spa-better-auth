import { type FC, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";

const Login: FC = () => {
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries()); // https://medium.com/@hayavuk/react-forms-d49ec73cc84a
    const email = (data["email"] ?? "") as string;
    const password = (data["password"] || "") as string;

    const res = await authClient.signIn.email(
      {
        email,
        password,
        rememberMe: true, // Remember the user session after the browser is closed.
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          navigate("/");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
    console.log({ res });
  }

  return (
    <>
      <h1>Credential Login</h1>
      <article>
        <form onSubmit={(e) => onSubmit(e)}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            pattern=".+@.+"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength={1}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </article>
      <h1>Social Login</h1>
      <article>
        <div style={{ display: "flex", gap: "2rem" }}></div>
        <a href="/api/login/oauth/github">
          <svg width="90" height="90">
            <image
              xlinkHref="logos/github-mark-white.svg"
              width="90"
              height="90"
            />
          </svg>
        </a>
      </article>
    </>
  );
};
export default Login;
