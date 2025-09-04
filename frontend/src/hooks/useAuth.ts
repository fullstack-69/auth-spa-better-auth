import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type AuthData } from "../types/api";
import { authClient } from "../lib/auth-client";
function getMe() {
  return authClient.getSession();
  // return axios.get<AuthData>("/api/me");
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
