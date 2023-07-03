import fetcher from "../fetcher";
import useSWR from "swr";

function useUser(userSlug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/user/${userSlug}`,
    fetcher
  );
  return {
    user: data?.user ?? null,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
}

export default useUser;
