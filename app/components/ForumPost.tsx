'use client'
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import React from 'react'
import {forums as forumPostType} from '../.../../../types'
import { FaRegCircleUser } from "react-icons/fa6";
import { FaRegCommentAlt } from "react-icons/fa";
import Link from 'next/navigation'
import {
    Heading,
    Text,
    Badge,
    Stack,
    Flex,
    
} from "@chakra-ui/react";
import LikeDislikeButtons from './LikeDislikeButtons';
import SaveButton from './SaveButton';
import CommentsSection from './CommentsSection';

const ForumPost = ({ id }: { id: string }) => {
    const [postData, setPostData] = useState<forumPostType | {}>({})
    const [showBadge, setShowBadge] = useState(false)
    const [daysAgo, setDaysAgo]= useState(0)
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
   
    useEffect(() => {
      setIsLoading(true)
        const getPost = async () => {
          
            const response = await fetch(`/api/forums/${id}`)
            if(!response.ok){
              setIsError(true)
            }
            const {post} = await response.json()
            setPostData(post)
            const currentDate = new Date()
            const postDate = new Date(post.date)
            setDaysAgo(Math.floor((currentDate.getTime() - postDate.getTime()) / 8.64e+7))
            if(currentDate.getTime() - postDate.getTime() < 2.506e+9){
                setShowBadge(true)
            }
            setIsLoading(false)
         
        }
        getPost()
        
    },[id])
    if(isLoading){
    return <p>Loading...</p>
    }
   if(isError){
    return <Heading fontSize='2xl'>Error: 404 could not find requested resource</Heading>
   }
  return (
    
    <>
         <Flex bg='#dbe2e9' flexDirection='column' gap='4' p='6' >
         <Stack direction='row' mt='3' >
            
  <Badge fontSize='1em' >Parentify Forums</Badge>
  
  {showBadge && <Badge colorScheme='purple' fontSize='1.1em'>New</Badge>}
 
</Stack>
<Flex  flexDirection='row'alignItems='center'>
          <FaRegCircleUser style={{fontSize: '1.5em'}}/>
        <Text ml='2' textColor='dark-gray' fontStyle='italic'>{postData.author}</Text>
        <Text ml='3'>{daysAgo}d</Text>
        <Flex flexDirection='row' gap='2' bg='#6CAEED' maxWidth='max-content' p='1' ml='5' borderRadius='md' alignItems='center'>
        <FaRegCommentAlt color='white' size='1.2rem'/>
        <Text textColor='white' fontSize='md' fontWeight='bold'>{postData.comments ? postData.comments.length : 0} </Text>
        </Flex>
        </Flex>
          <Flex  flexDirection='column' justifyContent="center"  bg='#dbe2e9'>
        
        <Heading fontSize='xl'>{postData.title}</Heading>
        
       
        <Text mt='4' >{postData.body}</Text>
        </Flex>
        <Flex flexDirection='row' mt='4' justifyContent="space-between">
        <LikeDislikeButtons itemId={id} type='forums'/>
         <SaveButton itemId={id} type='forums'/>
        </Flex>
         </Flex>
         <Flex flexDirection='column' gap='4' bg='white' width='100%' p='4' marginBottom='3'>
            
        {postData.comments &&  <CommentsSection comments={postData.comments} ID={id}/>}
        </Flex>
     
</>
    
  )
}

export default ForumPost