"use client";
import { forums } from "@/types";
import ForumCard from "../components/ForumCard";
import { Container, Flex, Heading, Box } from "@chakra-ui/react";
import PostForum from "../components/PostForum";
import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";

export default function ForumsPage() {
  const [allForums, setAllForums] = useState<forums[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/forums");
        const { forums } = await res.json();
        setAllForums(forums);
      } catch (error) {
        setIsError(true);
      }
    };

    fetchForums();
  }, []);

  return (
    <>
      <Box
        bg="pink.100"
        minHeight="100vh"
        position="relative"
        display={"flex"}
        flexDirection={"column"}
      >
        <Container pos={"absolute"} p={0}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF5F7"
              d="M43.6,-55.1C51.2,-45.6,48.4,-26.8,52.8,-8.4C57.2,10.1,68.8,28.3,66,42.7C63.1,57.2,45.9,68,28.7,70.7C11.5,73.5,-5.7,68.1,-24.3,63C-42.9,57.9,-63,52.9,-70.5,40.4C-78,27.9,-73.1,8,-68.6,-11.1C-64,-30.2,-59.9,-48.4,-48.6,-57.1C-37.2,-65.9,-18.6,-65.3,-0.3,-64.9C18,-64.5,36,-64.5,43.6,-55.1Z"
              transform="translate(10, 5)"
            />
          </svg>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#FFF5F7"
              d="M43.6,-55.1C51.2,-45.6,48.4,-26.8,52.8,-8.4C57.2,10.1,68.8,28.3,66,42.7C63.1,57.2,45.9,68,28.7,70.7C11.5,73.5,-5.7,68.1,-24.3,63C-42.9,57.9,-63,52.9,-70.5,40.4C-78,27.9,-73.1,8,-68.6,-11.1C-64,-30.2,-59.9,-48.4,-48.6,-57.1C-37.2,-65.9,-18.6,-65.3,-0.3,-64.9C18,-64.5,36,-64.5,43.6,-55.1Z"
              transform="translate(170, 150)"
            />
          </svg>
        </Container>
        <Heading
          position="absolute"
          top="1rem"
          left="1rem"
          bgGradient="linear(to-l, #FBB6CE, #ED64A6)"
          bgClip="text"
          fontSize="4xl"
        >
          Parentify Forums
        </Heading>
        <PostForum allForums={allForums} setAllForums={setAllForums} />
        <Flex alignItems="center" justifyContent="center">
          <Container
            position="relative"
            mt="20rem"
            p="3"
            overflow="scroll"
            height={"50rem"}
          >
            {allForums.map((forum: forums) => {
              const key = forum._id.toString();
              return <ForumCard forum={forum} key={key} />;
            })}
          </Container>
        </Flex>
      </Box>
      <Flex m='20'></Flex>
      <Navbar />
    </>
  );
}
