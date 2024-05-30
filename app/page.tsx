"use client";

import { Link as NextLink } from "@chakra-ui/next-js";
import {
  Center,
  Square,
  Circle,
  Box,
  AbsoluteCenter,
  Button,
  Container,
  Text,
  Heading,
  Image,
  Link,
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import LandingIcon from "../public/LandingIcon.svg";
import Blob from "../public/blob.svg";

export default function Home() {
  return (
    <>
      <Container bg="purple.700" maxWidth="100%" minHeight='100vh'>
        <Heading color="white" my="1rem" fontSize="2rem">
          Welcome to Parentify
        </Heading>
        <Center mb="20%" mt="10%">
          <Box boxSize="20rem" maxW="md" position="relative">
            <Image
              src={LandingIcon.src}
              alt="An illustration of a pregnant person walking through a wireframe"
              borderRadius="full"
              position="absolute"
              boxSize="20rem"
              top="0"
              left="0"
              zIndex={2}
            />
            <Image
              src={Blob.src}
              alt="An illustration of a pregnant person walking through a wireframe"
              borderRadius="full"
              position="absolute"
              boxSize="20rem" 
              top="0"
              left="0"
              zIndex={1}
            />
          </Box>
        </Center>
        <Text color="white" mb="10%">Your Companion in the Journey of Parenthood.</Text>
        <Center>
          <Link href="/login">
            <Button bg="white" borderRadius='full' boxShadow='lg'>
              <FaArrowRightLong fill="#7c3aed" />{" "}
            </Button>
          </Link>
        </Center>
      </Container>
    </>
  );
}
