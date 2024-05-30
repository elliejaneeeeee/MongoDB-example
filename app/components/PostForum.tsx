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
  FormHelperText,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

const PostForum: React.FC<PostForumProps> = ({ allForums, setAllForums }) => {
  const { data: session } = useSession();
  const [titleInput, setTitleInput] = useState("");
  const [isSubmit, setIsSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [bodyInput, setBodyInput] = useState("");

  function handleTitleInput(e: any) {
    setTitleInput(e.target.value);
  }
  function handleBodyInput(e: any) {
    setBodyInput(e.target.value);
  }

  async function handlePostForum(e: any) {
    e.preventDefault();
    setIsLoading(true)
    setIsSubmit(true)
    const response = await fetch(`/api/forums`, {
      method: "POST",
      body: JSON.stringify({
        author: session?.user?.name,
        title: titleInput,
        body: bodyInput,
      }),
    });

    const {postData}: any = await response.json()
    setAllForums([postData, ...allForums])
    setBodyInput('')
    setTitleInput('')
    setIsLoading(false)
  }

  return (
    <>
      <Flex justifyContent={"center"}>
        <Container
          pos={"absolute"}
          p={5}
          bg={"white"}
          borderRadius={"5px"}
          top={"15%"}
          w={"95%"}
          mb={"3rem"}
        >
          <FormControl>
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
          </FormControl>
          <Button
            onClick={handlePostForum}
            size={"sm"}
            variant={"solid"}
            colorScheme={"blue"}
            mt={2}
            isLoading={isLoading}
            loadingText="Posting Comment"
          >
            Submit
            {isSubmit ?? <Text>Question Posted!</Text>}
          </Button>
        </Container>
      </Flex>
    </>
  );
};

export default PostForum;
