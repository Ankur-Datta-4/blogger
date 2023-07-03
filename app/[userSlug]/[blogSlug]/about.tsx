import ErrorPage from "@/components/errorHandlers";
import LoadingCircle from "@/components/ui/loading-circle";
import useUser from "@/lib/hooks/use-user";

export default function PublicProfile({ userSlug }: any) {
  const { user, isLoading, isError } = useUser(userSlug);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingCircle />
      </div>
    );

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return (
    <div className="flex gap-8 w-full">
      {user?.image && (
        <div>
          <img src={user?.image} className="w-32 h-32" />
        </div>
      )}
      <div className="text-left text-lg">
        <p>{user?.bio}</p>
      </div>
    </div>
  );
}
