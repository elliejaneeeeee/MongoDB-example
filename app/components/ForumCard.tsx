import { ForumCardProps, forums } from "@/types";
import { Grid, GridItem, Text, Center, Image } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import SaveButton from "./SaveButton";
import LikeDislikeButtons from "./LikeDislikeButtons";

const ForumCard: React.FC<ForumCardProps> = ({ forum }) => {
  return (
    <>
      <Center>
        <Grid
          w="100%"
          mb="1rem"
          p="5"
          templateAreas={`"img title title" "img author author" "bookmark . votes"`}
          gridTemplateColumns={"0.3fr 1fr 0.2fr"}
          gridTemplateRows={"0.1fr 0.1fr 0.1fr"}
          bg={"white"}
          boxShadow={"lg"}
          alignItems={"center"}
          rowGap={'0.5rem'}
        >
          <GridItem area={"img"} justifySelf={"start"}>
            <Image
              src="https://i.pravatar.cc/48"
              alt="avatar image"
              boxSize="48px"
              borderRadius="full"
            />
          </GridItem>
          <GridItem area={"title"}>
            <Link href={`/forums/${forum._id}`}>{forum.title}</Link>
          </GridItem>
          <GridItem area={"author"} fontSize={'x-small'}>{forum.author}</GridItem>
          <GridItem area={"votes"}><LikeDislikeButtons itemId={forum._id} type={'forums'}/></GridItem>
          <GridItem area={"bookmark"} justifySelf={"start"}><SaveButton itemId={forum._id}/></GridItem>
        </Grid>
      </Center>
    </>
  );
};

export default ForumCard;
