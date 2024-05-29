"use client";
import React, { use } from "react";
import { useSession } from "next-auth/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const PostComment = ({ itemId, setCommentsList, commentList }) => {
  const { data: session } = useSession();
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter your comment...");
  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    const response = await fetch(`/api/forums/${itemId}/comments`, {
      method: "POST",
      body: JSON.stringify({ author: session?.user?.name, body: input }),
    });
    if (!response.ok) {
      setIsError(true);
      setIsLoading(false);
      setIsSubmit(false);
    } else {
      const { comment } = await response.json();
      setIsLoading(false);
      setIsSubmit(true);
      setInput("");
      setCommentsList([comment, ...commentList]);
    }
  };
  const handleBlur = () => {
    setPlaceholder("Enter your comment...");
  };

  const handleFocus = () => {
    setPlaceholder("");
    setIsError(false);
    setIsSubmit(false);
  };
  return (
    <form>
      <FormControl isInvalid={isError} mr={2} mb={2}>
        {session?.user?.name !== undefined ? (
          <Flex flexDirection="row" alignItems="basline" gap="1">
            <Text>signed in as:</Text>
            <FaRegCircleUser style={{ fontSize: "20px" }} />
            <FormLabel>{session?.user?.name}</FormLabel>
          </Flex>
        ) : (
          <Text>Login to post comment</Text>
        )}

        <Input
          type="comment"
          value={input}
          placeholder={placeholder}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {!isError ? (
          <FormHelperText></FormHelperText>
        ) : (
          <FormErrorMessage>Comment cannot be empty.</FormErrorMessage>
        )}

        <Button
          size="sm"
          colorScheme="teal"
          variant="outline"
          isLoading={isLoading}
          type="submit"
          onClick={handleSubmit}
          loadingText="Posting Comment"
          isDisabled={session?.user?.name === undefined}
        >
          Submit
        </Button>
        {isSubmit && (
          <FormHelperText>Comment posted successfully</FormHelperText>
        )}
      </FormControl>
    </form>
  );
};

export default PostComment;
