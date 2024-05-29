import { useState } from "react";
import React from "react";
import { Box, Image, Text, Center, Heading, HStack, Flex, Container, Link, useMediaQuery } from "@chakra-ui/react";
import { articles } from "../../types";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";

interface ArticleCardProps {
  article: articles;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [saved, setSaved] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <Container maxW="full" p={{ base: 4 }}>
      <Center py={6}>
        <Box
          w={isMobile ? "full" : "xs"}
          rounded="md"
          my={5}
          mx={[0, 5]}
          overflow={"hidden"}
          bg="white"
          border={"1px"}
          borderColor="black"
          boxShadow={"6px 6px 0 black"}
        >
          <Box borderWidth="1px" borderColor="black" h="200px">
            <Image src={article.img_url} roundedTop={"sm"} objectFit="cover" w="100%" h="100%" />
          </Box>
          <Box p={4}>
            <Box bg="#F08080" display={"inline-block"} px={2} py={1} color="white" mb={2} rounded="md">
              <Text fontSize={"xs"} fontWeight="medium">
                {article.source}
              </Text>
            </Box>
            <Heading color={"black"} fontSize={"2xl"} noOfLines={2} h="70px">
              {article.title}
            </Heading>
            <Text color={"gray.500"} noOfLines={2}>
              {article.body}
            </Text>
          </Box>
          <HStack borderTop={"1px"} color="black">
            <Flex
              p={4}
              alignItems="center"
              justifyContent={"space-between"}
              roundedBottom={"sm"}
              cursor={"pointer"}
              w="full"
            >
              <Link href={article.link} isExternal fontSize={"md"} fontWeight={"semibold"}>
                Read more
              </Link>
            </Flex>
            <Flex
              p={4}
              alignItems="center"
              justifyContent={"space-between"}
              roundedBottom={"sm"}
              borderLeft={"1px"}
              cursor="pointer"
              onClick={() => setSaved(!saved)}
            >
              {saved ? (
                <MdBookmark color="#4682b4" fontSize={"25px"} />
              ) : (
                <MdBookmarkBorder color="#416787" fontSize={"25px"} />
              )}
            </Flex>
          </HStack>
        </Box>
      </Center>
    </Container>
  );
}
