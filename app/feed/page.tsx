"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import ArticleDisplay from "../components/ArticleDisplay";
import { articles } from "../../types";
import NotFound from "../not-found";
import { Box, Icon } from "@chakra-ui/react";
import Image from "next/image";
import { easeInOut, motion } from "framer-motion";
import handIcon from "../components/handIcon";

const Feed = () => {
  const [articles, setArticles] = useState<articles[]>([]);
  const [loading, setLoading] = useState(true);

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

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!articles) {
    return <NotFound />;
  }

  return (
    <Box bg="pink.100" minHeight="100vh" flexDirection="column">
      <Box flex="1">
        {articles?.length && <ArticleDisplay articles={articles} />}{" "}
        <motion.div
          style={{ width: 100, height: 100 }}
          animate={{ x: [0, 60, -60, 0] }}
          transition={{
            repeat: Infinity,
            repeatDelay: 5,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <Icon as={handIcon}></Icon>
        </motion.div>
      </Box>
      <NavBar />
    </Box>
  );
};

export default Feed;
