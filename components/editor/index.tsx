"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { TiptapExtensions } from "./extensions";
import { TiptapEditorProps } from "./props";
import { EditorBubbleMenu } from "./components";

const Tiptap = () => {
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    autofocus: "end",
  });

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
