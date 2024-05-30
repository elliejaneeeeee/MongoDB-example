'use client'
import { forums } from "@/types";
import ForumCard from "../components/ForumCard";
import { Container, Flex, Heading } from "@chakra-ui/react";
import PostForum from "../components/PostForum";
import { useState, useEffect } from "react";

export default function ForumsPage() {
  const [allForums, setAllForums] = useState<forums[]>([])
  const [isError, setIsError] = useState(false)


  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/forums')
        const {forums} =  await res.json()
        setAllForums(forums)
      } catch (error) {
        setIsError(true)
      }
    }

    fetchForums()
  }, [])

  return (
    <>
      <Heading
        position={"absolute"}
        top={"2rem"}
        left={"1rem"}
        bgGradient="linear(to-r, #2C5282, #63B3ED)"
        bgClip="text"
        fontSize={'4xl'}
      >
        Parentify Forums
      </Heading>
      <PostForum allForums={allForums} setAllForums={setAllForums}/>
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Container p={0} zIndex={-1}>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#BEE3F8"
              d="M28.9,-44.1C38.4,-38.8,47.7,-32.4,57.6,-22.8C67.6,-13.1,78.2,-0.2,80,14C81.8,28.1,74.9,43.5,62.5,49.6C50.1,55.7,32.3,52.6,16.8,57C1.3,61.5,-11.9,73.5,-23.8,73.5C-35.6,73.4,-46.1,61.2,-53.6,48.6C-61.2,36,-65.8,23.1,-67.3,10C-68.7,-3.2,-67,-16.5,-64,-31.8C-61,-47.1,-56.8,-64.5,-45.9,-69.2C-35.1,-73.9,-17.5,-66,-3.9,-59.9C9.7,-53.8,19.4,-49.5,28.9,-44.1Z"
              transform="translate(50, 20)"
            />
          </svg>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#BEE3F8"
              d="M28.9,-44.1C38.4,-38.8,47.7,-32.4,57.6,-22.8C67.6,-13.1,78.2,-0.2,80,14C81.8,28.1,74.9,43.5,62.5,49.6C50.1,55.7,32.3,52.6,16.8,57C1.3,61.5,-11.9,73.5,-23.8,73.5C-35.6,73.4,-46.1,61.2,-53.6,48.6C-61.2,36,-65.8,23.1,-67.3,10C-68.7,-3.2,-67,-16.5,-64,-31.8C-61,-47.1,-56.8,-64.5,-45.9,-69.2C-35.1,-73.9,-17.5,-66,-3.9,-59.9C9.7,-53.8,19.4,-49.5,28.9,-44.1Z"
              transform="translate(170, 150)"
            />
          </svg>
        </Container>
        <Container position={"absolute"} overflow={"scroll"} mt={"50rem"} p={"3"}>
          {allForums.map((forum: forums) => {
            const key = forum._id.toString();
            return <ForumCard forum={forum} key={key} />;
          })}
        </Container>
      </Flex>
    </>
  );
}
