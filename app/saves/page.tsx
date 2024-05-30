import React from 'react'
import NavBar from "../components/NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import ForumPost from '@/app/components/ForumPost';
import BookmarksList from '../components/BookmarksList';

export default function BookmarksPage (){
  return (
    <>
     <BookmarksList/>
    </>
  )
}