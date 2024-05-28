"use client";
import { Center, Box, Container, Text, Heading, Image } from "@chakra-ui/react";

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
        <Heading noOfLines={1}>welcome </Heading>
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, necessitatibus ipsa odit excepturi magni,
          dolor fugit deserunt eius in mollitia, possimus modi incidunt? Quisquam omnis quam adipisci voluptatum
          repellat atque.
        </Text>
      </Container>
    </>
  );
}
