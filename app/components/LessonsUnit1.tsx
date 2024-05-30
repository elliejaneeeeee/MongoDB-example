"use client";
import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  Link,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "./NavBar";
import { CheckIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";

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
      <Center margin={"0.5cm"}>
        <Box margin={"1cm"} position="relative" w="100%" textAlign="center">
          <VStack
            spacing={4}
            align="center" // Center the buttons horizontally
          >
            <Link href="/flashcards/1">
              <Tooltip label="Lesson 1" aria-label="A tooltip">
                <IconButton
                  isRound={true}
                  variant="solid"
                  onClick={handleLessonOneToggle}
                  colorScheme={lessonOneToggle ? "green" : "blue"}
                  _hover={{ bg: lessonOneToggle ? "green.600" : "blue.600" }}
                  aria-label="Done"
                  icon={lessonOneToggle ? <CheckIcon /> : <UnlockIcon />}
                  size="lg" // Adjust the button size
                  height="80px" // Adjust the height for a bigger button
                  width="80px" // Adjust the width for a bigger button
                  fontSize="2xl" // Adjust font size for the icon
                />
              </Tooltip>
            </Link>

            <Link href="/flashcards/2">
              <Tooltip label="Lesson 2" aria-label="A tooltip">
                <IconButton
                  isRound={true}
                  ml="75%"
                  variant="solid"
                  onClick={handleLessonTwoToggle}
                  colorScheme={lessonTwoToggle ? "green" : "blue"}
                  _hover={{ bg: lessonTwoToggle ? "green.600" : "blue.600" }}
                  aria-label="Done"
                  icon={lessonTwoToggle ? <CheckIcon /> : <UnlockIcon />}
                  size="lg" // Adjust the button size
                  height="80px" // Adjust the height for a bigger button
                  width="80px" // Adjust the width for a bigger button
                  borderRadius="full" // Make the button rounded
                  fontSize="2xl" // Adjust font size for the icon
                />
              </Tooltip>
            </Link>

            <Link href="/flashcards/3">
              <Tooltip label="Lesson 3" aria-label="A tooltip">
                <IconButton
                  isRound={true}
                  ml="150%"
                  variant="solid"
                  colorScheme={"gray"}
                  _hover={{ bg: "gray.600" }}
                  aria-label="Done"
                  icon={<LockIcon />}
                  size="lg" // Adjust the button size
                  height="80px" // Adjust the height for a bigger button
                  width="80px" // Adjust the width for a bigger button
                  borderRadius="full" // Make the button rounded
                  fontSize="2xl" // Adjust font size for the icon
                />
              </Tooltip>
            </Link>
            <Link href="/flashcards/4">
              <Tooltip label="Lesson 4" aria-label="A tooltip">
                <IconButton
                  isRound={true}
                  ml="100%"
                  variant="solid"
                  colorScheme={"gray"}
                  _hover={{ bg: "gray.600" }}
                  aria-label="Done"
                  icon={<LockIcon />}
                  size="lg" // Adjust the button size
                  height="80px" // Adjust the height for a bigger button
                  width="80px" // Adjust the width for a bigger button
                  borderRadius="full" // Make the button rounded
                  fontSize="2xl" // Adjust font size for the icon
                />
              </Tooltip>
            </Link>
            <Link href="/flashcards/5">
              <Tooltip label="Lesson 5" aria-label="A tooltip">
                <IconButton
                  isRound={true}
                  ml="50%"
                  variant="solid"
                  colorScheme={"gray"}
                  _hover={{ bg: "gray.600" }}
                  aria-label="Done"
                  icon={<LockIcon />}
                  size="lg" // Adjust the button size
                  height="80px" // Adjust the height for a bigger button
                  width="80px" // Adjust the width for a bigger button
                  borderRadius="full" // Make the button rounded
                  fontSize="2xl" // Adjust font size for the icon
                />
              </Tooltip>
            </Link>
          </VStack>
        </Box>
      </Center>
      <NavBar />
    </div>
  );
};
export default LessonsUnit1;
