import { DeleteIcon, TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { toast } from "./use-toast";

export interface BlogCardSmProps {
  id: string;
  title: string;
  createdAt: string;
  selectedBlog: any;
  setSelectedBlog: any;
  slug: string;
  isDraft: boolean;
  userSlug: string;
  mutateBlogs: any;
}

export default function BlogCardSm({
  slug,
  id,
  title,
  createdAt,
  isDraft,
  setSelectedBlog,
  selectedBlog,
  mutateBlogs,
  userSlug,
}: BlogCardSmProps) {
  const date = new Date(createdAt);
  const createdAtData = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleDeleteBlog = () => {
    toast({ title: `Deleting blog` });
    fetch(`/api/user/${userSlug}/blog/${slug}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        mutateBlogs();
        toast({ title: `${title} deleted` });
        setSelectedBlog(null);
      })
      .catch((err) => {
        toast({ title: "Something went wrong", variant: "destructive" });
      });
  };
  return (
    <div
      className={`${
        id === selectedBlog?.id ? "border-l-2 border-l-black" : ""
      } p-2 cursor-pointer flex gap-2 items-center justify-between`}
      onClick={() => setSelectedBlog({ slug, title, createdAt, id, isDraft })}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm text-gray-500">{createdAtData}</p>
      </div>
      <div className="text-gray-300 hover:text-black ">
        <AlertDialog>
          <AlertDialogTrigger>
            <TrashIcon />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteBlog}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
