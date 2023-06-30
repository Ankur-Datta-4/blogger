"use client";

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import LoadingCircle from "@/components/ui/loading-circle";
import Sidebar from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import useBlogs from "@/lib/hooks/use-blogs";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { boolean } from "zod";

export default function Dashboard({ params }: any) {
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const { drafts, published, isLoading, isError } = useBlogs(params.userSlug);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  if (isLoading) return <LoadingCircle />;

  if (isError) return <div>Something went wrong</div>;
  return (
    <div className="relative">
      <Sidebar
        setSelectedBlog={setSelectedBlog}
        drafts={drafts}
        published={published}
        selectedBlog={selectedBlog}
      />
      <main className="flex items-center justify-center h-screen">
        {selectedBlog ? (
          <Editor selectedBlog={selectedBlog} userSlug={params.userSlug} />
        ) : (
          <h2>Hey there!</h2>
        )}
      </main>
      {selectedBlog && (
        <div className="absolute top-0 right-0 p-4">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <h1>Publish</h1>
              <Switch checked={!selectedBlog?.isDraft} />
            </div>
            <Link href="/preview">
              <Button>
                <EyeIcon className="mr-2 h-4 w-4" /> Preview
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
