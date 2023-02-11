// @ts-nocheck
import { Box, Button, Heading, HStack, Text, Textarea } from '@chakra-ui/react'
import React, { useState, useContext } from 'react'
import { AiOutlineMessage } from 'react-icons/ai'
import { useCreateComment, useGetPostComments } from '../Hooks'
import CommentCard from './CommentCard'

export default function PostComments({videoId}) {
  const [commentTxt, setCommentTxt] = useState("")
   const [isShowCommentBtn, setIsShowCommentBtn] = useState(false)
   
  const {postComments, isPostCommentsLoading, isPostCommentsError} = useGetPostComments(videoId)
 
  const {commentToPost, isCommenting} = useCreateComment()

    console.log("posts comments", postComments)
  return (
    <Box mt={4} px={2} >
      <Box>
        <HStack>
          <AiOutlineMessage size={25}   />
          <Heading fontSize="xl">Comments</Heading>
        </HStack>
        <Box display="flex" flexDir="column" alignItems="end" mt={2}>
        <Textarea  
           value={commentTxt}
           onChange = {e => setCommentTxt(e.target.value)}
           placeholder = "Comment"
           size="sm"
           resize="none"
           variant='unstyled'
           border="1px solid"
           borderColor="gray.300"
            onClick={() => setIsShowCommentBtn(true)}
           p={2}
        />
        { isShowCommentBtn &&
         <HStack  gap={2} mt={2} mb={4} >
         <Button border="1px solid" borderColor="gray.300" onClick={() => setIsShowCommentBtn(false)}>Cancel</Button>
            <Button bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" px={6} onClick={() => commentToPost(commentTxt, videoId)}>{isCommenting ? "Commenting" : "Comment"}</Button>
           
         </HStack>
}
      </Box>
      </Box>

       <Box>
         {postComments?.posts?.map((item, i) =>  {

          return(
            <CommentCard  key={i} comment = {item}  />
          )
         })
          
         }
       </Box>

       {postComments?.posts?.length < 1  &&
          <Box mt={4}>
          <Text>No comment  yet</Text>
       </Box>
       }
    </Box>
  )
}
