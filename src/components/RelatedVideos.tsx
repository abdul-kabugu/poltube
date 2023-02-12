// @ts-nocheck
import { Box } from '@chakra-ui/react'
import React from 'react'
import { useDiscoverVideos } from '../Hooks'
import RelatedCard from './RelatedCard'

export default function RelatedVideos({posts}) {
  //const {posts, isPostsLoading, isPostsError} = useDiscoverVideos()
  console.log("the thing", posts)
  const filteredPosts = posts?.posts?.filter(post => post.hasOwnProperty("image") && post.image !== null)
  return (
    <Box w="30%">
      {filteredPosts?.map((item, i) =>  {

        return(
          <RelatedCard key={i} post = {item} />
        )
      })}
    
    </Box>
  )
}
