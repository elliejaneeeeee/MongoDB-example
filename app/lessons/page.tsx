import React from "react";
import NavBar from "../components/NavBar";
import LessonsUnit1 from "../components/LessonsUnit1";
import { Box, Divider } from "@chakra-ui/react";
import LessonsUnit2 from "../components/LessonsUnit2";

export default async function Home() {
  return (
    <>
      <Box
        overflowX="hidden"
        overflowY="auto"
        bg="blue.100"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
      >
        <NavBar />
        <LessonsUnit1 />
        <Divider
          borderColor="gray.400"
          borderStyle="solid"
          borderWidth="2px"
          width="calc(100% - 2cm)" // Subtracting 1cm from both sides
          marginX="1cm" // Margin on both left and right to center the divider
          marginY="20px" // Adjust the spacing around the divider
        />
        <LessonsUnit2 />
      </Box>
    </>
  );
}
