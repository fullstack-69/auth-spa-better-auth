import { type FC } from "react";
import useAuth from "../hooks/useAuth";
import UserCard from "../components/UserCard";
import SessionCard from "../components/SessionCard";
import WebAuthnCard from "../components/WebAuthn";

const Home: FC = () => {
  const { user, sessions } = useAuth();
  return (
    <>
      <h1>
        Home <em>(SPA)</em>
      </h1>
      {user ? (
        <>
          <UserCard user={user} />
          <SessionCard sessions={sessions} />
          <WebAuthnCard user={user} />
        </>
      ) : (
        <article>
          <h2>Welcome, Guest</h2>
        </article>
      )}
    </>
  );
};

export default Home;
