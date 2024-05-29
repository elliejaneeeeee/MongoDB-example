"use client";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Link,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "./NavBar";
import { CheckIcon, CloseIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";

const LessonsUnit1 = () => {
  const [lessonOneToggle, setLessonOneToggle] = useState(false);
  const [lessonTwoToggle, setLessonTwoToggle] = useState(false);

  const handleLessonOneToggle = () => {
    setLessonOneToggle(!lessonOneToggle);
  };
  const handleLessonTwoToggle = () => {
    setLessonTwoToggle(!lessonTwoToggle);
  };

  return (
    <div>
      <Center margin={"1cm"}>
        <Heading textColor={"blue.500"}>Unit 1</Heading>
      </Center>
      <Box margin={"1cm"} position="relative" w="100%" textAlign="center">
        <VStack
          spacing={4}
          alignItems="flex-start"
          position="relative"
          left="30%"
          transform="translateX(0%)"
        >
          <Link href="/flashcards/1">
            <IconButton
              isRound={true}
              size="lg"
              ml="0%"
              variant="solid"
              onClick={handleLessonOneToggle}
              colorScheme={lessonOneToggle ? "green" : "blue"}
              _hover={{ bg: lessonOneToggle ? "green.600" : "blue.600" }}
              aria-label="Done"
              fontSize="20px"
              icon={lessonOneToggle ? <CheckIcon /> : <UnlockIcon />}
            />
          </Link>

          <Link href="/flashcards/2">
            <IconButton
              isRound={true}
              size="lg"
              ml="100%"
              variant="solid"
              onClick={handleLessonTwoToggle}
              colorScheme={lessonTwoToggle ? "green" : "blue"}
              _hover={{ bg: lessonTwoToggle ? "green.600" : "blue.600" }}
              aria-label="Done"
              fontSize="20px"
              icon={lessonTwoToggle ? <CheckIcon /> : <UnlockIcon />}
            />
          </Link>
          <Link href="/flashcards/3">
            <IconButton
              isRound={true}
              size="lg"
              ml="200%"
              variant="solid"
              colorScheme={"blue"}
              _hover={{ bg: "blue.600" }}
              aria-label="Done"
              fontSize="20px"
              icon={<LockIcon />}
            />
          </Link>
          <Link href="/flashcards/4">
            <IconButton
              isRound={true}
              size="lg"
              ml="150%"
              variant="solid"
              colorScheme={"blue"}
              _hover={{ bg: "blue.600" }}
              aria-label="Done"
              fontSize="20px"
              icon={<LockIcon />}
            />
          </Link>
          <Link href="/flashcards/5">
            <IconButton
              isRound={true}
              size="lg"
              ml="100%"
              variant="solid"
              colorScheme={"blue"}
              _hover={{ bg: "blue.600" }}
              aria-label="Done"
              fontSize="20px"
              icon={<LockIcon />}
            />
          </Link>
        </VStack>
      </Box>
      <NavBar />
    </div>
  );
};
export default LessonsUnit1;
