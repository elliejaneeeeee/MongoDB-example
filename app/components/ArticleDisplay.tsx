import React from "react";
import { Box, Flex, Icon, VStack } from "@chakra-ui/react";
import ArticleCard from "./ArticleCard";
import { articles } from "../../types";
import Carousel from "./Carousel/Carousel";
import Image from "next/image";
import handIcon from "./handIcon";
import { easeInOut, motion } from "framer-motion";
// import handIcon from "../handIcon.svg";

interface ArticlesDisplayProps {
  articles: articles[];
}

const ArticlesDisplay = ({ articles }: ArticlesDisplayProps) => {
  return (
    <Flex overflow="hidden">
      <Carousel childWidth={350}>
        {articles?.map((article, index) => (
          <ArticleCard article={article} />
        ))}
      </Carousel>
    </Flex>
  );
};

export default ArticlesDisplay;
