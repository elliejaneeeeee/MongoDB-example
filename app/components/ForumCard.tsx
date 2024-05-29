import { ForumCardProps, forums } from "@/types";
import { Grid, GridItem, Text, Center, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const ForumCard: React.FC<ForumCardProps> = ({ forum }) => {
  return (
    <Center>
      <Grid
        border="1px"
        w="80%"
        mb="0.5rem"
        p="3"
        templateAreas={`"img title title title" "author . votes bookmark" `}
        gridTemplateColumns={"0.1fr 1fr 0.1fr 0.1fr"}
        gridTemplateRows={"repeat(2, 0.1fr)"}
      >
        <GridItem area={"img"}>
          <Image
            src="https://i.pravatar.cc/48"
            alt="avatar image"
            boxSize="48px"
            borderRadius="full"
          />
        </GridItem>
        <GridItem area={"title"}><Link href={`/forums/${forum._id}`}>{forum.title}</Link></GridItem>
        <GridItem area={"author"}>{forum.author}</GridItem>
        <GridItem area={"votes"}>{forum.votes}</GridItem>
        <GridItem area={"bookmark"}>Bookmark</GridItem>
      </Grid>
    </Center>
  );
};

export default ForumCard;
