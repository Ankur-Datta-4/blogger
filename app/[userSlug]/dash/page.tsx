"use client";

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import LoadingCircle from "@/components/ui/loading-circle";
import Sidebar from "@/app/[userSlug]/dash/sidebar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import useBlogs from "@/lib/hooks/use-blogs";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Savebutton } from "./Savebutton";
import { ShareModal } from "./ShareModal";
import { Confetti } from "@/components/ui/confetti";

export default function Dashboard({ params }: any) {
  const { drafts, published, isLoading, isError, mutate } = useBlogs(
    params.userSlug
  );
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [saved, setSaved] = useState<boolean>(true);
  const [edited, setEdited] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setSaved(true);
    setEdited(false);
    setShowConfetti(false);
  }, [selectedBlog]);

  const handlePublish = (newCheckedValue: Boolean) => {
    fetch(`/api/user/${params.userSlug}/blog/${selectedBlog?.slug}`, {
      method: "PUT",
      body: JSON.stringify({ isDraft: !newCheckedValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        mutate();
      })
      .catch((err) => {
        toast({ title: "Something went wrong", variant: "destructive" });
      });
    if (selectedBlog) {
      const { id, slug, isDraft, title, createdAt } = selectedBlog;
      setSelectedBlog({ id, slug, isDraft: !isDraft, title, createdAt });
    }
    if (newCheckedValue) {
      setShowConfetti(true);
      toast({ title: "Blog published" });
    } else {
      setShowConfetti(false);
      toast({ title: "Blog pushed to drafts" });
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingCircle />
      </div>
    );
  if (isError) return <div>Something went wrong</div>;
  return (
    <div className="relative">
      <Sidebar
        setSelectedBlog={setSelectedBlog}
        drafts={drafts}
        published={published}
        selectedBlog={selectedBlog}
        userSlug={params.userSlug}
        mutateBlogs={mutate}
      />

      <main className="flex items-center justify-center min-h-screen">
        {selectedBlog ? (
          <Editor
            selectedBlog={selectedBlog}
            userSlug={params.userSlug}
            saved={saved}
            setSaved={setSaved}
            setEdited={setEdited}
          />
        ) : (
          <h2>Hey there!</h2>
        )}
      </main>
      {selectedBlog && (
        <div className="fixed top-0 right-0 p-4">
          <div className="flex gap-4 items-center">
            {edited && <Savebutton saved={saved} />}
            <div className="flex gap-2">
              <h1>Publish</h1>
              <Switch
                checked={!selectedBlog?.isDraft}
                onCheckedChange={handlePublish}
              />
            </div>
            <ShareModal
              userSlug={params.userSlug}
              blogSlug={selectedBlog?.slug}
            />
            <a
              href={`/${params.userSlug}/${selectedBlog?.slug}`}
              target="_blank"
            >
              <Button>
                <EyeIcon className="mr-2 h-4 w-4" /> Preview
              </Button>
            </a>
          </div>
        </div>
      )}
      {showConfetti && <Confetti />}
    </div>
  );
}
