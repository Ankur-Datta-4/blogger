"use client";

import { TiptapExtensions } from "@/components/editor/extensions";
import LoadingCircle from "@/components/ui/loading-circle";
import { useJsonContent } from "@/lib/hooks/save-content";
import useBlog from "@/lib/hooks/use-blog";
import { generateHTML } from "@tiptap/core";
import { useEffect, useRef } from "react";

export default function BlogPage({ params }: any) {
  const divRef = useRef<HTMLDivElement>(null);
  const { blog, isLoading, isError } = useBlog(
    params.userSlug,
    params.blogSlug
  );

  useEffect(() => {
    if (blog && divRef.current) {
      divRef.current.innerHTML = generateHTML(
        blog.jsonContent,
        TiptapExtensions
      );
    }
  }, [blog]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoadingCircle />
      </div>
    );
  if (isError) return <div>Something went wrong</div>;
  return (
    <div className="flex items-center justify-center h-screen p-12">
      <div className="relative min-h-full w-full border-stone-200 p-12 px-8 sm:rounded-lg sm:border sm:px-12 sm:shadow-lg max-w-7xl overflow-x-hidden ">
        <div
          className="ProseMirror prose-lg prose-headings:font-display focus:outline-none"
          ref={divRef}
        ></div>
      </div>
    </div>
  );
}
