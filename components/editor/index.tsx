"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
import { TiptapEditorProps } from "./props";
import { EditorBubbleMenu } from "./components";
import useBlog from "@/lib/hooks/use-blog";
import LoadingCircle from "../ui/loading-circle";
import { useEffect } from "react";

interface TipTapEditorProps {
  selectedBlog: Blog | null;
  userSlug: string;
}

const Tiptap = ({ selectedBlog, userSlug }: TipTapEditorProps) => {
  const { blog, mutate, isError, isLoading } = useBlog(
    userSlug,
    selectedBlog?.slug
  );

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    autofocus: "end",
  });

  useEffect(() => {
    if (blog) {
      console.log("Content updated");
      editor?.commands.setContent(blog.jsonContent);
    }
  }, [blog]);

  if (isLoading) return <LoadingCircle />;
  if (isError) return <div>Something went wrong</div>;

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="relative min-h-full w-full max-w-screen-lg border-stone-200 p-12 px-8 sm:rounded-lg sm:border sm:px-12 sm:shadow-lg"
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
