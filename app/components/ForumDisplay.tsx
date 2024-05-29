import React from "react";
import ForumPost from "./ForumPost";
import { forums } from "../../types";
import { Flex } from "@chakra-ui/react";

interface ForumPostsDisplayProps {
  forums: forums[];
}

const ForumPostsDisplay = ({ forums }: ForumPostsDisplayProps) => {
  return (
    <Flex overflow="hidden">
      {forums?.map((forum, index) => (
        <ForumPost id={forum._id.toString()} />
      ))}
    </Flex>
  );
};

export default ForumPostsDisplay;
