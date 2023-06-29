"use client";

import { TiptapExtensions } from "@/components/editor/extensions";
import { useJsonContent } from "@/lib/hooks/save-content";
import { generateHTML } from "@tiptap/core";
import { useEffect, useRef } from "react";

export default function PreviewPage() {
  const divRef = useRef<HTMLDivElement>(null);
  //   const { content } = useJsonContent();
  const content = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 1 },
        content: [{ type: "text", text: "Hey there!" }],
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "This should be all fine " }],
      },
      {
        type: "taskList",
        content: [
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [
              { type: "paragraph", content: [{ type: "text", text: "This" }] },
            ],
          },
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [
              { type: "paragraph", content: [{ type: "text", text: "This" }] },
            ],
          },
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [
              {
                type: "paragraph",
                content: [{ type: "text", text: "And this" }],
              },
            ],
          },
          {
            type: "taskItem",
            attrs: { checked: false },
            content: [
              { type: "paragraph", content: [{ type: "text", text: "too" }] },
            ],
          },
        ],
      },
      { type: "paragraph" },
      {
        type: "bulletList",
        content: [
          {
            type: "listItem",
            content: [
              { type: "paragraph", content: [{ type: "text", text: "1" }] },
            ],
          },
          {
            type: "listItem",
            content: [
              { type: "paragraph", content: [{ type: "text", text: "2" }] },
            ],
          },
          {
            type: "listItem",
            content: [
              { type: "paragraph", content: [{ type: "text", text: "3" }] },
            ],
          },
        ],
      },
      { type: "paragraph" },
      {
        type: "blockquote",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "This is what I've been saying! This exactly looks like notion is what I'm telling you!",
              },
            ],
          },
        ],
      },
      { type: "paragraph" },
    ],
  };

  useEffect(() => {
    if (content && divRef.current) {
      divRef.current.innerHTML = generateHTML(content, TiptapExtensions);
    }
  }, [content]);
  return (
    <div className="flex items-center justify-center h-screen p-12">
      <div className="relative min-h-full w-full w-screen-lg border-stone-200 p-12 px-8 sm:rounded-lg sm:border sm:px-12 sm:shadow-lg ">
        <div
          className="ProseMirror prose-lg prose-headings:font-display focus:outline-none"
          ref={divRef}
        ></div>
      </div>
    </div>
  );
}
