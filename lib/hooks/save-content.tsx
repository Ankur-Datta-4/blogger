"use client";

import { useEffect, useState } from "react";

export const useJsonContent = () => {
  const [content, setContent] = useState<any>(null);
  useEffect(() => {
    console.log(JSON.stringify(content));
  }, [content]);
  return { content, setContent };
};
