import React from "react";
import ForumPost from "./ForumPost";
import { forums } from "../../types";
import Link from 'next/link'
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface ForumPostsDisplayProps {
  forums: forums[];
}

const ForumPostsDisplay = ({ forums }: ForumPostsDisplayProps) => {
  return (
    <VStack pb={16} spacing={7}>
      <Text fontSize="xl" color="gray.600" fontWeight="bold">
        Latest Posts
      </Text>
      <Link href={'/forums'} passHref>
        <Flex gap='1' alignItems='center' margin='1'>
      <Text>Go to Forums</Text>
      <ArrowForwardIcon/>
      </Flex>
      </Link>
      {forums?.map((forum, index) => (
        <Link href={`/forums/${forum._id}`} name={forum._id} passHref>
        <Box key={index} borderRadius="10px" boxShadow="md" width="100%" cursor="pointer">
          <ForumPost showComments={false} key={index} id={forum._id.toString()} />
        </Box>
        </Link>
      ))}
    </VStack>
  );
};

export default ForumPostsDisplay;
