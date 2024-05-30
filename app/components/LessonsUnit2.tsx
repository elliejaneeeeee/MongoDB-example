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

const LessonsUnit2 = () => {
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
        <Heading textColor={"orange.500"}>Unit 2</Heading>
      </Center>
      <Center margin={"0.5cm"}>
        <Box margin={"1cm"} position="relative" w="100%" textAlign="center">
          <VStack
            spacing={4}
            align="center" // Center the buttons horizontally
          >
            <Tooltip label="Lesson 1" aria-label="A tooltip">
              <IconButton
                isRound={true}
                variant="solid"
                onClick={handleLessonOneToggle}
                colorScheme={lessonOneToggle ? "green" : "orange"}
                _hover={{ bg: lessonOneToggle ? "green.600" : "orange.600" }}
                aria-label="Done"
                icon={lessonOneToggle ? <CheckIcon /> : <UnlockIcon />}
                size="lg" // Adjust the button size
                height="80px" // Adjust the height for a bigger button
                width="80px" // Adjust the width for a bigger button
                fontSize="2xl" // Adjust font size for the icon
              />
            </Tooltip>

            <Tooltip label="Lesson 2" aria-label="A tooltip">
              <IconButton
                isRound={true}
                ml="-25%"
                variant="solid"
                onClick={handleLessonTwoToggle}
                colorScheme={lessonTwoToggle ? "green" : "orange"}
                _hover={{ bg: lessonTwoToggle ? "green.600" : "orange.600" }}
                aria-label="Done"
                icon={lessonTwoToggle ? <CheckIcon /> : <UnlockIcon />}
                size="lg" // Adjust the button size
                height="80px" // Adjust the height for a bigger button
                width="80px" // Adjust the width for a bigger button
                borderRadius="full" // Make the button rounded
                fontSize="2xl" // Adjust font size for the icon
              />
            </Tooltip>

            <Tooltip label="Lesson 3" aria-label="A tooltip">
              <IconButton
                isRound={true}
                ml="-50%"
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

            <Tooltip label="Lesson 4" aria-label="A tooltip">
              <IconButton
                isRound={true}
                ml="-40%"
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

            <Tooltip label="Lesson 5" aria-label="A tooltip">
              <IconButton
                isRound={true}
                ml="-25%"
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
          </VStack>
        </Box>
      </Center>
      <NavBar />
    </div>
  );
};
export default LessonsUnit2;
