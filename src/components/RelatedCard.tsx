// @ts-nocheck
import { Box, Heading, HStack, Image, Text } from '@chakra-ui/react'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import { IPFS_GATEWAY } from '../assets/constant'
import { useTruncateText } from '../Hooks'

export default function RelatedCard({post}) {
     console.log("the post is here", post)
     const {shortenTxt} = useTruncateText()
     const currentDate = new Date();
     const postCreatedAt = new Date(post?.createdAtTime);
     const diffInMilliseconds = currentDate - postCreatedAt;
const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
const duration = moment.duration(diffInHours, 'hours');
  return (
     <Link to={`/${post?.id}`}>
   <Box mb={2} display="flex" alignItems="center" gap={3} cursor="pointer" >
     <Image src={`${IPFS_GATEWAY}${post?.image}`}   
       width="50%" maxH={100} objectFit="cover" rounded="md"
     />
     <Box>
      <Text fontWeight="semibold">{post?.title && shortenTxt(post?.title, 14)}</Text>
      <Text fontSize="sm" >{post?.createdByAccount?.id && shortenTxt(post?.createdByAccount?.id, 8)}</Text>
      <HStack>
        <Text fontSize="sm" color="gray.400">Likes {post?.upvoteCounts}</Text>
         <Text fontSize="sm" color="gray.400">{duration.humanize().replace("a ", "")} ago</Text>
         
      </HStack>
    
     </Box>
   </Box>
   </Link>
  )
}
