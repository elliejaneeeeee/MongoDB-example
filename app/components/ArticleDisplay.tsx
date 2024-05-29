import React from "react";
import { Flex } from "@chakra-ui/react";
import ArticleCard from "./ArticleCard";
import { articles } from "../../types";
import Carousel from "./Carousel/Carousel";

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
