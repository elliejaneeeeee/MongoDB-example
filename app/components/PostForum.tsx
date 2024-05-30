"use client";
import { PostForumProps, forums } from "@/types";
import {
  Container,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const PostForum: React.FC<PostForumProps> = ({ allForums, setAllForums }) => {
  const { data: session } = useSession();
  const [titleInput, setTitleInput] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [bodyInput, setBodyInput] = useState("");

  function handleTitleInput(e: any) {
    setTitleInput(e.target.value);
  }
  function handleBodyInput(e: any) {
    setBodyInput(e.target.value);
  }

  async function handlePostForum(e: any) {
    e.preventDefault();
    if (titleInput === "" || bodyInput === "") {
      setIsError(true);
      return;
    }
    setIsError(false);
    setIsLoading(true);
    const response = await fetch(`/api/forums`, {
      method: "POST",
      body: JSON.stringify({
        author: session?.user?.name,
        title: titleInput,
        body: bodyInput,
      }),
    });
    setIsSubmit(true);

    const { postData }: any = await response.json();
    setAllForums([postData, ...allForums]);
    setBodyInput("");
    setTitleInput("");
    setIsLoading(false);
  }

  return (
    <>
      <Flex justifyContent={"center"}>
        <Container
          pos={"absolute"}
          p={5}
          bg={"white"}
          borderRadius={"5px"}
          top={"7%"}
          w={"95%"}
          mb={"3rem"}
          boxShadow={"3px 3px 0 #2e2027"}
        >
          <FormControl isInvalid={isError} isRequired>
            <Heading fontSize={"md"}>Post a question...</Heading>
            <FormLabel fontSize={"small"}>Title: </FormLabel>
            <Input
              onChange={handleTitleInput}
              value={titleInput}
              placeholder="When do I...?"
              size={"xs"}
            />
            <FormLabel fontSize={"small"}>Body: </FormLabel>
            <Input
              onChange={handleBodyInput}
              placeholder="My baby..."
              size={"xs"}
              value={bodyInput}
            />
            {isError && (
              <FormErrorMessage>Both fields are required.</FormErrorMessage>
            )}
          </FormControl>
          <Box mt={2} display={"flex"} alignItems={"center"}>
            <Button
              onClick={handlePostForum}
              size={"sm"}
              variant={"solid"}
              bg={"pink.300"}
              colorScheme={"pink"}
              mt={2}
              isLoading={isLoading}
              loadingText="Posting Comment"
            >
              Submit
            </Button>
            {isSubmit && !isError && (
              <Text ml={'1rem'} color="pink.300">
                Question Posted!
              </Text>
            )}
          </Box>
        </Container>
      </Flex>
    </>
  );
};

export default PostForum;
