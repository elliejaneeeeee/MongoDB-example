'use client'
import React, { FC, useEffect, useState } from 'react'
import { Button, Flex,  Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure, Link} from '@chakra-ui/react'
import {AddIcon, CheckIcon} from '@chakra-ui/icons'
import { useSession } from "next-auth/react";
import { SaveButtonProps, bookmarks } from '@/types';


const SaveButton: FC<SaveButtonProps> = ({ itemId, type }) => {
    const { onClose } = useDisclosure()
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [openOverlay, setOpenOverlay] = useState(false)
  
    useEffect(() => {{
        if(session?.user?.id){
            const checkBookmark = async () => {
                const response = await fetch(`/api/users/${session?.user?.id}`)
                const {user} = await response.json()
                 setIsSaved(user.bookmarks.find((bookmark: bookmarks) => bookmark._id === itemId)) //check to see original bookmarked state on first render
            }
                checkBookmark()   
        }
    }
    },[session, itemId])
    
    const handleClick = () => {
       setIsLoading(true)
         fetch(`/api/users/${session?.user?.id}`, {method: 'PATCH', body: JSON.stringify({_id: itemId, type: type})}).then((response) => {
            if(response.ok){
                setIsSaved(!isSaved)
                setIsLoading(false)
            }
            else{
                setIsLoading(false)
                setOpenOverlay(true)
            }
         })
    }
  return (
    <>
      <Modal
        isOpen={openOverlay}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account</ModalHeader>
          <ModalCloseButton onClick={() =>{setOpenOverlay(false)}}/>
          <ModalBody pb={6}>
            Please sign up to bookmark, rate or comment
          </ModalBody>
          <ModalFooter >
          <Link key='login' href='/login'>
                <Button variant="link" size='lg'
              aria-label='login'  > Sign In</Button>
                </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>
    <Flex flexDirection='row-reverse' alignItems='left'>
    <Button
      leftIcon={isSaved ?  <CheckIcon/> : <AddIcon/>}
      isLoading={isLoading}
      loadingText='Saving'
      colorScheme='pink'
      color={"pink.300"}
      variant={isSaved ? 'solid' : 'outline'}
      onClick={handleClick}
    >
      {isSaved ? 'Saved' : 'Bookmark'}
    </Button>
  </Flex>
  </>
  )
}

export default SaveButton