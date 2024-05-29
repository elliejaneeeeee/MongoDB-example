import React from "react";
import NavBar from "../components/NavBar";
import LessonsUnit1 from "../components/LessonsUnit1";
import { Box } from "@chakra-ui/react";

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
      </Box>
    </>
  );
}
