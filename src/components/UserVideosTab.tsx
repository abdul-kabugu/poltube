// @ts-nocheck
import { Box } from '@chakra-ui/react'
import React from 'react'
import PostCard from './PostCard'

export default function UserVideosTab({videos}) {
     console.log("the  user  videos  tabs", videos)
     //FILTER _ POSTS
     const filteredPosts = videos?.filter(post => post.hasOwnProperty("image")  && post?.__typename === "Post"     && post.image !== null)
     console.log("the  user  videos  tabs", filteredPosts)
  return (
    <Box display="flex" flexWrap="wrap" gap={3} flexGrow={2} >
         {filteredPosts?.map((item, i) =>  {

            return(
                 <PostCard  key={i} video = {item}   />
            )
         })}
    </Box>
  )
}
