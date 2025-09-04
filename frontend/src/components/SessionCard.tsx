import { type FC } from "react";
import { type Session, type User } from "../types/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../hooks/useAuth";
interface Props {
  sessions: Session[] | undefined;
}

const SessionCard: FC<Props> = ({ sessions }) => {
  if (!sessions) return <></>;
  return (
    <article>
      <h3>Sessions</h3>
      <ul>
        {sessions.map((session) => {
          return (
            <li key={session.sid}>
              <div className="session-list-wrapper">
                {/* Computer */}
                <span className="session-list-item">
                  <i className="fa-solid fa-lg fa-computer" />
                  <span>{`${session.useragentStr}`}</span>
                </span>
                {/* Calendar */}
                <span className="session-list-item">
                  <i className="fa-solid fa-lg fa-calendar-plus" />
                  <span>{`${session.createdAtStr}`}</span>
                </span>
                {/* Login Type */}
                <LoginType loginType={session.loginType} />
                {/* Own Session */}
                {!session.isOwnSession ? (
                  <ButtonDeleteSession sid={session.sid} />
                ) : (
                  <em>(This Device)</em>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

const LoginType: FC<{ loginType: string }> = ({ loginType }) => {
  if (loginType === "CREDENTIAL") {
    return (
      <span className="session-list-item">
        <i className="fa-solid fa-lg fa-key" />
        <span>Credential Login</span>
      </span>
    );
  } else if (loginType === "GITHUB") {
    return (
      <span className="session-list-item">
        <i className="fa-brands fa-lg fa-github" />
        <span>Github Login</span>
      </span>
    );
  } else if (loginType === "GOOGLE") {
    return (
      <span className="session-list-item">
        <i className="fa-brands fa-lg fa-google" />
        <span>Google Login</span>
      </span>
    );
  } else {
    return <em>Unknown Login</em>;
  }
};

const ButtonDeleteSession: FC<{ sid: string }> = ({ sid }) => {
  const { refetch } = useAuth();
  const mutation = useMutation({
    mutationFn: (sid: string) =>
      axios({
        method: "delete",
        url: "/api/session",
        params: {
          sid,
        },
      }),
    onSuccess: () => {
      refetch();
    },
    onError: (err) => {
      alert(err);
    },
  });

  return (
    <span className="session-list-bin">
      <i
        className="fa-solid fa-lg fa-trash-can"
        onClick={() => mutation.mutate(sid)}
      />
    </span>
  );
};

export default SessionCard;
