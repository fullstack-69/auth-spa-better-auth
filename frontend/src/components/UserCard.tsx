import { type FC } from "react";
import { type User } from "../lib/auth-client";

interface Props {
  user: User | null | undefined;
}

const UserCard: FC<Props> = ({ user }) => {
  if (!user) return <></>;
  return (
    <article style={{ width: "100%" }}>
      {user.image && (
        <div className="avatar-wrapper">
          <img src={user.image} className="avatar" />
        </div>
      )}
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </article>
  );
};

export default UserCard;
