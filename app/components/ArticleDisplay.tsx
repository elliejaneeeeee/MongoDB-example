import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import ArticleCard from "./ArticleCard";
import { articles } from "../../types";
import Carousel from "./Carousel/Carousel";

interface ArticlesDisplayProps {
  articles: articles[];
}

const ArticlesDisplay = ({ articles }: ArticlesDisplayProps) => {
  return (
    <Flex width="100%">
      <Carousel childWidth={350}>
        {articles?.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </Carousel>
    </Flex>
  );
};

export default ArticlesDisplay;
