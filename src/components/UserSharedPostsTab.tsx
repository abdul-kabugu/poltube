// @ts-nocheck
import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineDatabase } from 'react-icons/ai'
import { useGetSharedPosts } from '../Hooks/useGetSharedPost'
import SharedPostCard from './SharedPostCard'

export default function UserSharedPostsTab({channelId}) {
  const {sharedPosts, isSharedPostsError, isSharedPostsLoading} = useGetSharedPosts(channelId)

     //FILTER _ POSTS
     const filteredPosts = sharedPosts?.posts.filter(post => post.sharedPost.hasOwnProperty("image") && post.sharedPost.space.id === "1080"     && post.image !== null)
      
  return (
     
     <Box>
      {! sharedPosts &&
  <Box h="30vh" w="100%" display="flex" alignItems="center" justifyContent="center">
     <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" gap={2}>

     
         <AiOutlineDatabase   size={70}  />
          <Heading fontSize="xl">No  Data</Heading>
          </Box>
  </Box>
}

  <Box display="flex" flexWrap="wrap" gap={3} flexGrow={2}>
    {filteredPosts?.map((item, i) => {
      return(
        <SharedPostCard  key={i} video = {item}      />
      )
     
    })}
  </Box>
  </Box>)
}
