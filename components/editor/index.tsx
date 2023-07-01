"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
import { TiptapEditorProps } from "./props";
import { EditorBubbleMenu } from "./components";
import useBlog from "@/lib/hooks/use-blog";
import LoadingCircle from "../ui/loading-circle";
import { useCallback, useEffect } from "react";

interface TipTapEditorProps {
  selectedBlog: Blog | null;
  userSlug: string;
  saved: Boolean;
  setSaved: any;
  setEdited: any;
}

const Tiptap = ({
  selectedBlog,
  userSlug,
  saved,
  setSaved,
  setEdited,
}: TipTapEditorProps) => {
  const { blog, mutate, isError, isLoading } = useBlog(
    userSlug,
    selectedBlog?.slug
  );

  const saveContent = useCallback(() => {
    if (!saved) {
      fetch(`/api/user/${userSlug}/blog/${selectedBlog?.slug}`, {
        method: "PUT",
        body: JSON.stringify({
          jsonContent: editor?.getJSON(),
          htmlContent: editor?.getHTML(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSaved(true);
        });
    }
  }, [saved]);

  const handleChange = () => {
    if (saved) {
      setSaved(false);
      setEdited(true);
    }
  };
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    autofocus: "end",
    onUpdate: () => {
      handleChange();
    },
  });

  useEffect(() => {
    if (blog) {
      editor?.commands.setContent(blog.jsonContent);
    }
  }, [blog]);

  useEffect(() => {
    const autoSave = setInterval(() => {
      saveContent();
    }, 5 * 1000);
    return () => {
      clearInterval(autoSave);
    };
  }, [saveContent]);

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
