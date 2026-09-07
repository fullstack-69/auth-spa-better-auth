import { type FC } from "react";
import { authClient } from "../lib/auth-client";
import { type User } from "../lib/auth-client";
import usePasskey from "../hooks/usePasskey";

interface Props {
  user: User | null | undefined;
}

const WebAuthnCard: FC<Props> = ({ user }) => {
  const pk = usePasskey();
  console.log("Passkeys:", pk.data);
  async function onAddPasskey() {
    const { data, error } = await authClient.passkey.addPasskey({
      name: user?.email || user?.id || "unknown",
      authenticatorAttachment: "cross-platform",
      returnWebAuthnResponse: true,
      fetchOptions: {
        onSuccess: (response) => {
          console.log("WebAuthn response:", response);
          window.location.href = "/";
        },
      },
    });
    if (error) {
      console.error("Error adding passkey:", error);
    } else {
      console.log("Passkey added successfully:", data);
    }
  }

  return (
    <article style={{ width: "100%" }}>
      <h3>Passkeys</h3>
      {pk.data?.length ? (
        <ul>
          {pk.data.map((passkey) => {
            return (
              <li key={passkey.id}>
                <div className="session-list-wrapper">
                  {/* Key */}
                  <span className="session-list-item">
                    <i className="fa-solid fa-lg fa-key" />
                    <span>{passkey.name}</span>
                  </span>

                  {/* Computer */}
                  <span className="session-list-item">
                    <i className="fa-solid fa-lg fa-window-restore" />
                    <span>{passkey.deviceType}</span>
                  </span>

                  {/* Credential ID */}
                  <span className="session-list-item">
                    <i className="fa-solid fa-lg fa-id-card" />
                    <span>{passkey.credentialID.slice(0, 10)}...</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
      <button onClick={onAddPasskey}>Add</button>
    </article>
  );
};

export default WebAuthnCard;
