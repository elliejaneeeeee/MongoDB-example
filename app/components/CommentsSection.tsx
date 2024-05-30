import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { comments as commentsType } from "../.../../../types";
import {
  Heading,
  Text,
  Button,
  Stack,
  Flex,
  Grid,
  GridItem,
  Box,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import LikeDislikeButtons from "./LikeDislikeButtons";
import PostComment from "./PostComment";

const CommentsSection = ({ comments, ID }) => {
  const [commentsList, setCommentsList] = useState([]);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [deletedID, setDeletedID] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { data: session } = useSession();

  const deleteComment = async () => {
    setDeleteWarning(false);
    const response = await fetch(`/api/forums/${ID}/comments/${deletedID}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setCommentsList(
        commentsList.filter((comment: any) => comment._id !== deletedID)
      );

      setDeleteSuccess(true);
    } else {
      setDeleteError(true);
    }
  };

  useEffect(() => {
    setCommentsList(comments);
  }, []);
  return (
    <Flex flexDirection="column" gap="3">
      <PostComment
        itemId={ID}
        setCommentsList={setCommentsList}
        commentList={commentsList}
      />
      {deleteSuccess && (
        <Flex flexDirection="column" alignItems="center">
          <Text>Comment deleted</Text>{" "}
          <Button
            colorScheme="blue"
            size="xs"
            onClick={() => {
              setDeleteSuccess(false);
            }}
          >
            OK
          </Button>
        </Flex>
      )}
      {deleteError && (
        <Flex flexDirection="column" alignItems="center">
          <Text>Error deleting comment! Try again later</Text>{" "}
          <Button
            colorScheme="red"
            size="xs"
            onClick={() => {
              setDeleteError(false);
            }}
          >
            OK
          </Button>
        </Flex>
      )}
      <Heading fontSize="xl">{commentsList.length} Comments </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
        {commentsList.map((comment: any) => {
          const currentDate = new Date();
          const commentDate = new Date(comment.date);
          const daysSincePost = Math.floor(
            (currentDate.getTime() - commentDate.getTime()) / 8.64e7
          );

          return (
            <GridItem bg="none">
              <Text fontSize="sm">{comment.body}</Text>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mt="2"
                fontSize="sm"
              >
                <Stack direction="row">
                  <Text fontStyle="italic" fontWeight="bold">
                    {comment.author}
                  </Text>
                  <Text>{daysSincePost}d</Text>
                </Stack>
                {comment.author === session?.user?.name && (
                  <Box>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => {
                        setDeleteWarning(true), setDeletedID(comment._id);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                )}

                <AlertDialog
                  isOpen={deleteWarning}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Comment
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button
                          ref={cancelRef}
                          onClick={() => {
                            setDeleteWarning(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={deleteComment}
                          ml={3}
                        >
                          Delete
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
                <LikeDislikeButtons
                  itemId={comment._id}
                  type={"forums/" + ID + "/comments"}
                />
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default CommentsSection;
