import { useQuery } from "@tanstack/react-query";
import { authClient } from "../lib/auth-client";
function getPasskeys() {
  return authClient.passkey.listUserPasskeys();
}

function usePasskey() {
  // Queries
  const { data, error, refetch } = useQuery({
    queryKey: ["passkey"],
    queryFn: getPasskeys,
    select: (dataInput) => {
      return dataInput.data;
    },
  });
  return {
    data,
    error,
    refetch,
  };
}

export default usePasskey;
