import React from "react";
import ForumPost from "./ForumPost";
import { forums } from "../../types";
import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

interface ForumPostsDisplayProps {
  forums: forums[];
}

const ForumPostsDisplay = ({ forums }: ForumPostsDisplayProps) => {
  return (
    <VStack pb={16} spacing={7}>
      <Text fontSize="xl" color="gray.600" fontWeight="bold">
        Latest Posts
      </Text>
      {forums?.map((forum, index) => (
        <Box key={index} borderRadius="10px" boxShadow="md" width="100%" cursor="pointer">
          <ForumPost showComments={false} key={index} id={forum._id.toString()} />
        </Box>
      ))}
    </VStack>
  );
};

export default ForumPostsDisplay;
