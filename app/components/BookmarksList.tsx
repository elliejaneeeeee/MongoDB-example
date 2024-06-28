"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SaveButton from "./SaveButton";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FiBookmark } from "react-icons/fi";
import {
  Heading,
  Text,
  Badge,
  Box,
  Flex,
  Image,
  Button,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import { bookmarks } from "@/types";

const BookmarksList: React.FC = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [bookmarksArray, setBookmarksArray] = useState<bookmarks[]>([]);
  const [bookmarksList, setBookmarksList] = useState<bookmarks[]>([]);

  useEffect(() => {
    {
      setIsLoading(true);
      if (session?.user?.id) {
        const checkBookmark = async () => {
          const response = await fetch(`/api/users/${session?.user?.id}`);
          const { user } = await response.json();
          setBookmarksArray(user.bookmarks);
        };
        checkBookmark();
      }
    }
  }, [session]);

  useEffect(() => {
    const getBookmarks = async () => {
      const bookmarks = await Promise.all(
        bookmarksArray.map(async (bookmark: bookmarks) => {
          if (bookmark.type) {
            const response = await fetch(
              `/api/${bookmark.type}/${bookmark._id}`
            );
            const item = await response.json();
            return bookmark.type === "forums" ? item.post : item.article;
          }
        })
      );
      setBookmarksList([...bookmarks]);
      setIsLoading(false);
    };
    getBookmarks();
  }, [bookmarksArray]);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (status !== "authenticated") {
    return (
      <>
        <Heading m="4" fontSize="lg" textAlign="center">
          Sign in or register with Parentify to save posts
        </Heading>
        <Flex justifyContent="center" gap="10">
          <Link key="login" href="/login">
            <Button variant="link" size="lg" aria-label="login" color="green">
              {" "}
              Sign In
            </Button>
          </Link>
          <Link key="register" href="/register">
            <Button variant="link" size="lg" aria-label="register">
              {" "}
              Register
            </Button>
          </Link>
        </Flex>
      </>
    );
  }
  return (
    <Flex flexDirection="column" gap="4" m="4" maxWidth={["100%", "40%"]}>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading>My Bookmarks</Heading>
        <FiBookmark fontSize="60px" />
      </Flex>

      <Text>{session?.user?.name}&#39;s saved posts</Text>
    </Flex>
  );
};

export default BookmarksList;
