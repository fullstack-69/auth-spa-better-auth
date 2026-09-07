import { type FC, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";

const Login: FC = () => {
  const navigate = useNavigate();

  async function onSubmit(e: SubmitEvent<HTMLFormElement>) {
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
      },
    );
    console.log({ res });
  }

  const signInGitHub = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
    console.log({ data });
  };

  const signInWebAuthn = async () => {
    const { data, error } = await authClient.signIn.passkey({
      autoFill: false,
      returnWebAuthnResponse: true,
      fetchOptions: {
        onSuccess(context) {
          console.log("Authentication successful:", context.data);
          window.location.href = "/";
        },
        onError(context) {
          console.error("Authentication failed:", context.error.message);
        },
      },
    });
    if (error) {
      console.error("Error signing in with WebAuthn:", error);
    } else {
      console.log("Signed in with WebAuthn successfully:", data);
    }
  };

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
        <a href="#" onClick={signInGitHub}>
          <svg width="90" height="90">
            <image
              xlinkHref="logos/github-mark-white.svg"
              width="90"
              height="90"
            />
          </svg>
        </a>
      </article>
      <h1>WebAuthn</h1>
      <article>
        <button onClick={signInWebAuthn}>Use Passkey</button>
      </article>
    </>
  );
};
export default Login;
