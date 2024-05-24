"use client";
import { Link } from "@chakra-ui/next-js";
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
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <>
      <Container maxWidth={"80%"}>
        <Center>
          <Box boxSize="sm" maxW="md">
            <Image
              src="https://www.pngitem.com/pimgs/m/107-1076650_baby-png-icon-children-icon-transparent-png.png"
              alt="Da baby"
            />
          </Box>
        </Center>
        <Center>
          <Heading noOfLines={1}>Welcome to Parentify</Heading>
        </Center>
        <Center>
          <Button>Sign in</Button>
        </Center>
      </Container>
    </>
  );
}
