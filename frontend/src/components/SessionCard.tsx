import { type FC } from "react";
import { type Session } from "../lib/auth-client";
import { UAParser } from "ua-parser-js";

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
          const ua = UAParser(session.userAgent ?? "");
          // console.log({ ua });
          return (
            <li key={session.id}>
              <div className="session-list-wrapper">
                {/* Computer */}
                <span className="session-list-item">
                  <i className="fa-solid fa-lg fa-computer" />
                  <span>{`${ua.os.name ?? "Unknown"}`}</span>
                </span>

                {/* Computer */}
                <span className="session-list-item">
                  <i className="fa-solid fa-lg fa-window-restore" />
                  <span>{`${ua.browser.name ?? "Unknown"}`}</span>
                </span>

                {/* Calendar */}
                <span className="session-list-item">
                  <i className="fa-solid fa-lg fa-calendar-plus" />
                  <span>{`${session.createdAt.toLocaleDateString()} ${session.createdAt.toLocaleTimeString()}`}</span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </article>
  );
};

export default SessionCard;
