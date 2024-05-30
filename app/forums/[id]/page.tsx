import React from 'react'
import NavBar from "../../components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ForumPost from '@/app/components/ForumPost';
import { Flex } from '@chakra-ui/react';

export default function PostPage ({ params }: { params: { id: string } }){
  return (
    <>
    <ForumPost id={params.id}/>
    <Flex m='10'></Flex>
    <NavBar/>
    </>
  )
}
