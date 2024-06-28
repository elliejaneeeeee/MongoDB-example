"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ArticleDisplay from "../components/ArticleDisplay";
import { articles as ArticlesType, forums as ForumsType } from "../../types";
import NotFound from "../not-found";
import { Box, Flex, Heading, Icon, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { handIcon } from "../components/handIcon";
import ForumPostsDisplay from "../components/ForumPostsDisplay";

const Feed = () => {
  const [articles, setArticles] = useState<ArticlesType[]>([]);
  const [forums, setForums] = useState<ForumsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [iconVisible, setIconVisible] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data?.articles?.length) {
          setArticles(data.articles);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchForums = async () => {
      try {
        const response = await fetch("/api/forums");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data?.forums?.length) {
          setForums(data.forums);
        }
      } catch (error) {
        console.error("Failed to fetch forums:", error);
        setForums([]);
      } finally {
        setLoading(false);
      }
    };

    document.addEventListener("touchstart", handleArticleClick);

    fetchArticles();
    fetchForums();
  }, []);

  const handleArticleClick = () => {
    setIconVisible(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!articles.length) {
    return <NotFound />;
  }

  return (
    <Box overflowX="hidden" overflowY="auto" bg="pink.100" minHeight="100vh" display="flex" flexDirection="column">
      <VStack padding={[5, 8]} borderRadius={[28, 16]}>
        <Heading color="#75c682" fontSize={["4xl", "5xl", "7xl"]}>
          Feed
        </Heading>
        <Text fontSize="xl" color="gray.600" fontWeight="bold">
          Latest Articles
        </Text>
        <Flex alignSelf={"start"} onMouseDown={handleArticleClick}>
          {articles.length > 0 && <ArticleDisplay articles={articles} />}
        </Flex>
        <Box hidden={!iconVisible} position={"absolute"} top={250} pointerEvents={"none"}>
          <motion.div
            style={{ width: 100, height: 100 }}
            animate={{ x: [0, 60, -60, 0] }}
            transition={{
              repeat: Infinity,
              repeatDelay: 2,
              duration: 2,
              ease: "easeInOut",
            }}
          >
            <Icon as={handIcon} />
          </motion.div>
        </Box>
        {forums.length > 0 && <ForumPostsDisplay forums={forums} />}
      </VStack>
      <NavBar />
    </Box>
  );
};

export default Feed;
