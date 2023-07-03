"use client";

import ErrorPage from "@/components/errorHandlers";
import LoadingCircle from "@/components/ui/loading-circle";
import useUser from "@/lib/hooks/use-user";
import ProfileForm from "./profileform";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function ProfilePage({ params }: any) {
  console.log(params?.userSlug);
  const { user, isLoading, isError, mutate } = useUser(params?.userSlug);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingCircle />
      </div>
    );
  }

  if (isError) {
    return <ErrorPage error={isError} />;
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href={`/${params?.userSlug}`}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        <ProfileForm user={user} mutateUser={mutate} />
      </div>
    </div>
  );
}
