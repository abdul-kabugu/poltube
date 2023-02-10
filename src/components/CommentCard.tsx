// @ts-nocheck
import { Avatar, Box,Button,HStack,Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useReactions, useTruncateText } from '../Hooks'

export default function CommentCard({comment}) {
    const {shortenTxt} = useTruncateText()
    const currentDate = new Date();
    const postCreatedAt = new Date(comment?.createdAtTime);
   const {likePost, deslikePost} = useReactions()
    const diffInMilliseconds = currentDate - postCreatedAt;
    const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
    const duration = moment.duration(diffInHours, 'hours');
    
  return (
    <Box display="flex" gap={4} my={6} >
       <Avatar size="md"    />
         <Box>
             <HStack gap={2}>
                <Link to={`/channels/${comment?.createdByAccount?.id}`}> <Text fontWeight="semibold">{comment?.createdByAccount?.id && shortenTxt(comment?.createdByAccount?.id, 10)}</Text> </Link>
                 <Text fontSize="sm" color="gray.400">{duration.humanize().replace("a ", "")} ago</Text>
             </HStack>

              <Box>
                <Text mt={2}>{comment?.body}</Text>
                  <HStack mt={2} gap={2}>
                     <Button leftIcon={<AiOutlineLike />} onClick={() => likePost(comment?.id)}>
                         Like {comment?.upvotesCount}
                     </Button>

                     <Button leftIcon={<AiOutlineDislike  />} onClick={() => deslikePost(comment?.id)}>
                         Dislike {comment?.downvotesCount}
                     </Button>
                  </HStack>
              </Box>
         </Box>
    </Box>
  )
}
