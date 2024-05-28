import { Button, Stack} from '@chakra-ui/react'
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSession } from "next-auth/react";

const LikeDislikeButtons = ({itemId, type}) => { //type is either forums or articles
    const { data: session } = useSession();
   const [isLiked, setIsLiked] = useState(false)
  const  [isDisliked, setIsDisliked] = useState(false)

  const changeVotes = async(num: number) => {
    const response = await fetch(`/api/${type}/${itemId}`, {method: 'PATCH', body: JSON.stringify({inc_votes: num})})
   if(response.ok){
    const {article} = await response.json()
    console.log(article.votes)
   }
 }
  const handleLike = () => {
    setIsLiked(!isLiked)
    if(isDisliked){
        setIsDisliked(false)
        changeVotes(2)
    }
    else{
        changeVotes(isLiked ? -1 : 1)
    }
  }
  const handleDislike = () => {
    setIsDisliked(!isDisliked)
    if(isLiked){
        setIsLiked(false)
        changeVotes(-2)
    }
    else{
        changeVotes(isDisliked ? 1 : -1)
    }
  
  }
  
  return (
    <Stack direction='row' spacing={4}>
    <Button onClick={handleLike} isDisabled={session?.user?.name === undefined} leftIcon={<AiFillLike style={{opacity: isLiked ? 1 : 0.4, fontSize: '30px' }}/>}  variant='solid' size='sm'>
     </Button>
    <Button onClick={handleDislike} isDisabled={session?.user?.name === undefined} rightIcon={<AiFillDislike style={{opacity: isDisliked ? 1 : 0.4, fontSize: '30px'}}/>} variant='outline' size='sm'>

    </Button>
  </Stack>
  )

}
export default LikeDislikeButtons