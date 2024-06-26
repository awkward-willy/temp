"use client";

import { useState } from "react";

import MarkdownRenderer from "@components/MarkdownRenderer";
import PostForm from "@components/Post/PostForm";
import PostTitle from "@components/Post/PostTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";

export default function PostTab({
  initTitle,
  initBody,
  issueNum,
  type,
}: {
  initTitle?: string;
  initBody?: string;
  issueNum?: number;
  type: "create" | "edit";
}) {
  const [title, setTitle] = useState<string>(initTitle ?? "");
  const [body, setBody] = useState<string>(initBody ?? "");

  return (
    <Tabs defaultValue="form">
      <TabsList className="grid w-full max-w-xs grid-cols-2">
        <TabsTrigger value="form" className="data-[state=inactive]:text-black">
          編輯
        </TabsTrigger>
        <TabsTrigger
          value="preview"
          className="data-[state=inactive]:text-black"
        >
          預覽
        </TabsTrigger>
      </TabsList>
      <TabsContent value="form">
        <PostForm
          setTitle={setTitle}
          setBody={setBody}
          title={title}
          body={body}
          issueNum={issueNum}
          type={type}
        />
      </TabsContent>
      <TabsContent value="preview">
        <div className="min-h-96 rounded bg-white p-8 shadow-md">
          <PostTitle title={title} />
          <MarkdownRenderer body={body} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
