// redirect to /[userSlug]/dash page
import { redirect } from "next/navigation";

export default function UserPage({ params }: any) {
  return redirect(`/${params.userSlug}/dash`);
}
