import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { Post } from "@/types/Post";
import { Button } from "@components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";

import DeletePostButton from "./DeletePostButton";

function PostCard({
  post,
  userName,
  removePost,
}: {
  post: Post;
  userName?: string;
  removePost?: (id: number) => void;
}) {
  return (
    <article className="flex flex-col items-start justify-start rounded-md border border-b border-gray-200 bg-white px-2 py-4">
      <div className="flex w-full flex-wrap items-center">
        <Button variant="link" asChild>
          <Link href={post.user.html_url} target="_blank" className="gap-2">
            <Image
              src={post.user.avatar_url}
              alt={post.title}
              width={30}
              height={30}
              className="rounded-full"
            />
            {post.user.login}
          </Link>
        </Button>
        <p className="mx-4">{post.created_at}</p>
        <div className="flex-grow"></div>
        {post.user.login === userName && (
          <div className="ml-4">
            <Button
              variant="link"
              asChild
              className="px-0 hover:text-background/90"
            >
              <Link
                href={`/auth/post/${post.number}/edit`}
                aria-label="edit post"
              >
                <Pencil2Icon height="20" width="20" />
              </Link>
            </Button>
            <DeletePostButton
              postNumber={post.number.toString()}
              removePost={removePost}
            />
          </div>
        )}
      </div>
      <Link href={`/auth/post/${post.number}`}>
        <p className="ml-4 break-all pb-2 pr-4 text-xl">{post.title}</p>
        <p className="mx-4">{post.comments}&nbsp;則留言</p>
      </Link>
    </article>
  );
}

export default memo(PostCard, (prev, next) => {
  return prev.post.id === next.post.id;
});
