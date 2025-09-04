import { useQuery } from "@tanstack/react-query";
import { authClient } from "../lib/auth-client";
function getMe() {
  return authClient.getSession();
}

function useAuth() {
  // Queries
  const { data, error, refetch } = useQuery({
    queryKey: ["auth"],
    queryFn: getMe,
    select: (dataInput) => {
      console.log(dataInput);
      return dataInput.data;
    },
  });
  return {
    user: data?.user,
    sessions: data?.session ? [data.session] : [],
    error,
    refetch,
  };
}

export default useAuth;
