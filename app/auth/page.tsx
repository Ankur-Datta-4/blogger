"use client";

import { redirect } from "next/navigation";
import { LoginCard } from "./LoginCard";
import { useSession } from "next-auth/react";
export default function LoginPage() {
  const session = useSession();
  console.log(session);
  if (session.status === "authenticated") {
    return redirect(`/${session.data.user.slug}`);
  }
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <LoginCard />
    </div>
  );
}
