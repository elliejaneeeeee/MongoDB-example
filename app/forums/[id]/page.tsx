
import React from "react";
import Navbar from "@/app/components/NavBar";
import { Flex } from '@chakra-ui/react';
import ForumPost from "@/app/components/ForumPost";
export default function PostPage({ params }: { params: { id: string } }) {

  return (
    <>
      <ForumPost id={params.id} />
      <Flex m='10'></Flex>
      <Navbar />
    </>
  );
}
