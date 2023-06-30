import fetcher from "../fetcher";
import useSWR from "swr";

function useBlog(userSlug: string, blogSlug: string | undefined) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/user/${userSlug}/blog/${blogSlug}`,
    fetcher
  );
  return {
    blog: data?.blog ?? null,
    isLoading: isLoading,
    isError: error,
    mutate,
  };
}

export default useBlog;
