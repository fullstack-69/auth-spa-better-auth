import { type FC, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { authClient } from "../lib/auth-client";
const Signup: FC = () => {
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries()); // https://medium.com/@hayavuk/react-forms-d49ec73cc84a
    const email = (data["email"] ?? "") as string;
    const name = (data["name"] ?? "") as string;
    const password = (data["password"] || "") as string;
    const passwordConfirm = (data["passwordConfirm"] || "") as string;

    if (password !== passwordConfirm) {
      alert("Password not matched");
      return;
    }

    const res = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: "logos/robot.png",
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          navigate("/login");
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
      <h1>Credential Signup</h1>
      {/* <form onSubmit={(e) => mutation.mutate(e)}> */}
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          minLength={1}
          required
        />
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
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Password Confirmation"
          minLength={1}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </>
  );
};

export default Signup;
