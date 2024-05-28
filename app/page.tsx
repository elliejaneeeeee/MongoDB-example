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
import { PhoneIcon, AddIcon, WarningIcon, LinkIcon } from "@chakra-ui/icons";

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
          <Heading margin={"1cm"}>Welcome to Parentify</Heading>
        </Center>
        <Center>
          <Link href="/login">
            <Button>Sign in</Button>
          </Link>
        </Center>
      </Container>
    </>
  );
}
