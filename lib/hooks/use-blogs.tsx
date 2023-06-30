import fetcher from "../fetcher";
import useSWR from "swr";

function useBlogs(userSlug: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/user/${userSlug}/blog`,
    fetcher
  );
  console.log(data);
  return {
    drafts: data?.draftBlogs ?? [],
    published: data?.publishedBlogs ?? [],
    isLoading: isLoading,
    isError: error,
    mutate,
  };
}

export default useBlogs;
