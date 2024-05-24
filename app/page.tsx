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
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <>
      <Container maxWidth={"70%"}>
        <Heading noOfLines={1}>
          Heading this line is very long and should be cut off
        </Heading>
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere,
          necessitatibus ipsa odit excepturi magni, dolor fugit deserunt eius in
          mollitia, possimus modi incidunt? Quisquam omnis quam adipisci
          voluptatum repellat atque.
        </Text>
        <Container bg="blue.600" centerContent>
          <Box padding="4" bg="blue.400" color="black" maxW="md">
            There are many benefits to a joint design and development system.
            Not only does it bring benefits to the design team, but it also
            brings benefits to engineering teams. It makes sure that our
            experiences have a consistent look and feel, not just in our design
            specs, but in production.
          </Box>
        </Container>
        <Box position="relative" h="100px">
          <AbsoluteCenter bg="tomato" p="4" color="white" axis="both">
            <PhoneIcon />
          </AbsoluteCenter>
        </Box>
      </Container>
    </>
  );
}
