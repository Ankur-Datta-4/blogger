"use client";

import { TiptapExtensions } from "@/components/editor/extensions";
import ErrorPage from "@/components/errorHandlers";
import LoadingCircle from "@/components/ui/loading-circle";
import { useJsonContent } from "@/lib/hooks/save-content";
import useBlog from "@/lib/hooks/use-blog";
import useBlogs from "@/lib/hooks/use-blogs";
import { generateHTML } from "@tiptap/core";
import { useEffect, useRef, useState } from "react";
import ArticleList from "./articleList";
import PublicProfile from "./about";
import { ChevronLeftIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type TabType = "articles" | "about" | "blog";
export default function BlogPage({ params }: any) {
  const divRef = useRef<HTMLDivElement>(null);
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
  useEffect(() => {
    if (blog && divRef.current) {
      divRef.current.innerHTML = generateHTML(
        blog.jsonContent,
        TiptapExtensions
      );
    }
  }, [blog, divRef.current]);

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
      <div className="relative min-h-full w-full border-stone-200 p-12 px-8 sm:rounded-lg sm:border sm:px-12 sm:shadow-lg max-w-7xl overflow-x-hidden ">
        {activeTab === "blog" && (
          <div
            className="ProseMirror prose-lg prose-headings:font-display focus:outline-none flex-wrap"
            ref={divRef}
          ></div>
        )}
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
