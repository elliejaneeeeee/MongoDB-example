import React from "react";
import ForumPost from "@/app/components/ForumPost";

export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <>
      <ForumPost id={params.id} />
    </>
  );
}
