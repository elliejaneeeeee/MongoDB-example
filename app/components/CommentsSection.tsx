import React, { FC, useRef, useState, useEffect } from "react";
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

type CommentsSectionProps = {
  id: string;
  comments: commentsType[];
};

const CommentsSection: FC<CommentsSectionProps> = ({ comments, id }) => {
  const [commentsList, setCommentsList] = useState<commentsType[]>([]);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [deletedID, setDeletedID] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const { data: session } = useSession();

  const deleteComment = async () => {
    setDeleteWarning(false);
    if (deletedID) {
      const response = await fetch(`/api/forums/${id}/comments/${deletedID}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCommentsList(
          commentsList.filter(
            (comment: commentsType) => comment._id.toString() !== deletedID
          )
        );
        setDeleteSuccess(true);
      } else {
        setDeleteError(true);
      }
    }
  };

  useEffect(() => {
    setCommentsList(comments);
  }, [comments]);

  return (
    <Flex flexDirection="column" gap="3">
      <PostComment
        itemId={id}
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
      <Heading fontSize="xl">{commentsList.length} Comments</Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={6}>
        {commentsList.map((comment: commentsType) => {
          const currentDate = new Date();
          const commentDate = new Date(comment.date);
          const timeSincePost =
            currentDate.getTime() - commentDate.getTime() < 86400000
              ? Math.round(
                  (currentDate.getTime() - commentDate.getTime()) / 3600000
                ) + "h"
              : Math.round(
                  (currentDate.getTime() - commentDate.getTime()) / 86400000
                ) + "d";

          return (
            <GridItem bg="none" key={comment._id.toString()}>
              {" "}
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
                  <Text>{timeSincePost}</Text>
                </Stack>
                {comment.author === session?.user?.username && (
                  <Box>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="outline"
                      onClick={() => {
                        setDeletedID(comment._id.toString());
                        setDeleteWarning(true);
                        onOpen();
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
                <AlertDialog
                  isOpen={deleteWarning}
                  leastDestructiveRef={cancelRef}
                  onClose={() => {
                    setDeleteWarning(false);
                    onClose();
                  }}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Comment
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        Are you sure? You can&#39;t undo this action afterwards.
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button
                          ref={cancelRef}
                          onClick={() => {
                            setDeleteWarning(false);
                            onClose();
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
                  itemId={comment._id.toString()}
                  type={`forums/${id}/comments`}
                />{" "}
              </Flex>
            </GridItem>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default CommentsSection;
