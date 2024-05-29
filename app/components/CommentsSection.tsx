import React from 'react'
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import {comments as commentsType} from '../.../../../types'
import { FaRegCircleUser } from "react-icons/fa6";
import {
    Heading,
    Text,
    Badge,
    Stack,
    Flex,
    Grid,
    GridItem,
    
} from "@chakra-ui/react";
import LikeDislikeButtons from './LikeDislikeButtons';
import SaveButton from './SaveButton';
import PostComment from './PostComment';
const CommentsSection = ({comments, ID}) => {
const [commentsList, setCommentsList] = useState([])
useEffect(() => {
setCommentsList(comments)
},[])
  return (
    <Flex flexDirection='column' gap='3'>
        <PostComment itemId={ID} setCommentsList={setCommentsList} commentList={commentsList}/>
        <Heading fontSize='xl'>{commentsList.length} Comments </Heading>
    <Grid
    templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} // Responsive column template
    gap={6} // Gap between grid items
  >
    {commentsList.map((comment: any) => {
        const currentDate = new Date()
        const commentDate = new Date(comment.date)
        const daysSincePost = Math.floor((currentDate.getTime() - commentDate.getTime()) / 8.64e+7)
       
        return <GridItem bg='none'>
            <Text fontSize='sm' >{comment.body}</Text>
            
            <Flex flexDirection='row' justifyContent='space-between' alignItems='center'mt='2' fontSize='sm'>
                <Stack direction='row'>
                <Text fontStyle='italic' fontWeight='bold'>{comment.author}</Text>
            <Text>{daysSincePost}d</Text>
                </Stack>
            
            <LikeDislikeButtons itemId={comment._id} type={'forums/' + ID + '/comments'}/>
            </Flex>
           
        </GridItem>
    })}
  </Grid>
  </Flex>
  )
}

export default CommentsSection