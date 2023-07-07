"use client";

import { TiptapExtensions } from "@/components/editor/extensions";
import ErrorPage from "@/components/errorHandlers";
import LoadingCircle from "@/components/ui/loading-circle";
import useBlog from "@/lib/hooks/use-blog";
import useBlogs from "@/lib/hooks/use-blogs";
import { useEffect, useState } from "react";
import ArticleList from "./articleList";
import PublicProfile from "./about";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { EditorContent, useEditor } from "@tiptap/react";
import { TipTapNonEditorProps } from "@/components/editor/props";

type TabType = "articles" | "about" | "blog";
export default function BlogPage({ params }: any) {
  const { blog, isLoading, isError, user } = useBlog(
    params.userSlug,
    params.blogSlug
  );

  const [activeTab, setActiveTab] = useState<TabType>("blog");
  const {
    published,
    isLoading: isLoadingx,
    isError: isErrorx,
  } = useBlogs(params.userSlug);

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TipTapNonEditorProps,
    editable: false,
  });

  useEffect(() => {
    if (blog) {
      editor?.commands.setContent(blog.jsonContent);
    }
  }, [blog]);

  if (isLoading || isLoadingx)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingCircle />
      </div>
    );
  if (isError) {
    return <ErrorPage error={isError} />;
  }
  if (isErrorx) {
    return <ErrorPage error={isErrorx} />;
  }
  return (
    <div className="relative flex items-center justify-center min-h-screen p-12">
      <div className="fixed left-4 top-[10%] hidden md:flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{user?.name}</h1>
        <h2
          className="text-lg cursor-pointer"
          onClick={() => setActiveTab("articles")}
        >
          Articles
        </h2>
        <h2
          className="text-lg cursor-pointer"
          onClick={() => setActiveTab("about")}
        >
          About
        </h2>
        {activeTab !== "blog" && (
          <p
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "pl-0 ml-0 cursor-pointer"
            )}
            onClick={() => setActiveTab("blog")}
          >
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Back
          </p>
        )}
      </div>
      <div className="relative min-h-full w-full max-w-screen-lg border-stone-200 sm:rounded-lg sm:border sm:shadow-lg md:p-12">
        {activeTab === "blog" && <EditorContent editor={editor} />}
        {activeTab === "articles" && (
          <ArticleList blogs={published} userSlug={params.userSlug} />
        )}

        {activeTab === "about" && <PublicProfile userSlug={params.userSlug} />}

        <div className="flex flex-col gap-4 md:hidden bg-slate-50 p-8 mt-8 rounded-md">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <h2
            className="text-lg cursor-pointer"
            onClick={() => setActiveTab("articles")}
          >
            Articles
          </h2>
          <h2
            className="text-lg cursor-pointer"
            onClick={() => setActiveTab("about")}
          >
            About
          </h2>
          {activeTab !== "blog" && (
            <p
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "pl-0 ml-0 cursor-pointer"
              )}
              onClick={() => setActiveTab("blog")}
            >
              <ChevronLeftIcon className="mr-2 h-4 w-4" />
              Back
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
