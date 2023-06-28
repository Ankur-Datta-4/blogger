"use client";

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { boolean } from "zod";

export interface Blog {
  id: string;
  title: string;
  createdAt: string;
  content: string;
}

export default function Home() {
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const data: Blog[] = [
    {
      id: "1",
      title: "Blog 1",
      createdAt: "2023-08-01T00:00:00.000Z",
      content: "<h1>Blog 1</h1>",
    },
    {
      id: "2",
      title: "Blog 2",
      createdAt: "2023-08-01T00:00:00.000Z",
      content: "<h1>Blog 2</h1>",
    },
    {
      id: "3",
      title: "Blog 3",
      createdAt: "2023-08-01T00:00:00.000Z",
      content: "<h1>Blog 3</h1>",
    },
  ];
  const [selectedBlog, setSelectedBlog] = useState<any>(data[0]);
  return (
    <div className="relative">
      <Sidebar
        setSelectedBlog={setSelectedBlog}
        blogs={data}
        selectedBlog={selectedBlog}
      />
      <main className="flex items-center justify-center h-screen">
        <Editor />
      </main>
      <div className="absolute top-0 right-0 p-4">
        <div className="flex gap-4 items-center">
          <div className="flex gap-2">
            <h1>Publish</h1>
            <Switch />
          </div>
          <Button>
            <EyeIcon className="mr-2 h-4 w-4" /> Preview
          </Button>
        </div>
      </div>
    </div>
  );
}
