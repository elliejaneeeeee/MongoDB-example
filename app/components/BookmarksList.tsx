"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import SaveButton from "./SaveButton";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FiBookmark} from "react-icons/fi";
import {
  Heading,
  Text,
  Badge,
  Box,
  Flex,
  Image,
  Button
 
} from "@chakra-ui/react";
import NavBar from "./NavBar";

const BookmarksList = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true)
  const [bookmarksArray, setBookmarksArray] = useState([]);
  const [bookmarksList, setBookmarksList] = useState([]);
  useEffect(() => {
    
    {
      setIsLoading(true)
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
        bookmarksArray.map(async (bookmark) => {
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
      setIsLoading(false)
    };
    getBookmarks();
    
  }, [bookmarksArray]);
  if(isLoading){
    return <p>Loading...</p>
  }
  if(status !== "authenticated"){
    return <>
    <Heading m='4' fontSize='lg' textAlign='center'>Sign in or register with Parentify to save posts</Heading>
    <Flex justifyContent='center' gap='10'>
    <Link key='login' href='/login'>
                <Button variant="link" size='lg'
              aria-label='login' color='green' > Sign In</Button>
                </Link>
                <Link key='register' href='/register'>
                <Button variant="link" size='lg'
              aria-label='register'  > Register</Button>
                </Link>
                </Flex>
    </>
  }
  return (
  
    <Flex flexDirection="column" gap="4" m='4' maxWidth={['100%','40%']} >
      <Flex flexDirection='row' alignItems='center' justifyContent='space-between'>
      <Heading >My Bookmarks</Heading>
      <FiBookmark fontSize='60px'/>
      </Flex>
     
      <Text>{session?.user?.name}'s saved posts</Text>
      {bookmarksList.map((bookmark) => {
        if (!bookmark) return null;
        if (bookmark.link) {
          return (
            <Box>
            <Link href={bookmark.link} key={bookmark._id} passHref>
              <Flex flexDirection='row' gap='2'  padding='2%' borderRadius='5%' bg='#ffe6ee' >
              
                <Image
                  objectFit="fill"
                  maxW='40%'
                  src={bookmark.img_url}
                  alt="image"
                  maxH="150px"
                  alignContent='center'
                />
                <Flex flexDirection='column' >
                <Badge fontSize='0.7em' bg='#ffc7d2' maxWidth='fit-content'>External Article</Badge>
                <Heading fontSize='md'>{bookmark.title}</Heading>
                
                <Text fontStyle='italic'fontSize='md' textColor='gray'>{bookmark.source}</Text>
               <Flex >
                <ArrowForwardIcon boxSize='10'/>
                </Flex>
                </Flex>
               
              </Flex>
            </Link>
            <SaveButton itemId={bookmark._id} type='articles'/>
            </Box>
          );
        }
        else if(bookmark.date){
          return (
            <Box>
            <Link href={`/forums/${bookmark._id}`} name={'forums'} passHref>
            <Flex flexDirection='column' gap='2'>
             <Badge fontSize='0.7em' bg='#ddf2ff' maxWidth='fit-content'>Parentify Forums</Badge>
             
              <Heading size='md'>{bookmark.title}</Heading>
              <Text fontSize='sm' textColor='gray'>{bookmark.author} at {bookmark.date.substring(0,10)}</Text>
              <Text>{bookmark.body}</Text>
              <Text fontStyle='italic'>{bookmark.comments.length} comments</Text>
              
            </Flex>
            </Link>
              <SaveButton itemId={bookmark._id} type='forums'/>
              </Box>
          )
        }
      })}
    
     
    </Flex>
  );
};

export default BookmarksList;
