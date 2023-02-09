// @ts-nocheck
import { Box, Button, Heading } from '@chakra-ui/react'
import {useEffect, useState, useContext} from 'react'
import { SPACE_ID } from '../assets/constant'
import {SubsocialContext} from '../subsocial/provider'
import { useCreateSpace, useDiscoverVideos } from '../Hooks'
import PostCard from './PostCard'

export default function Discover() {
  const {createSpace} = useCreateSpace()
  const {posts, isPostsLoading, isPostsError} = useDiscoverVideos()

   console.log("the posts from  hooks", posts)
  //FILTER  POSTS  
      const filteredPosts = posts?.posts?.filter(post => post.hasOwnProperty("image") && post.image !== null)
      console.log("the filtered array", filteredPosts)
    
  return (
    <Box alignSelf="start"  w="100%" display="flex" flexWrap="wrap" gap={4} py={3} px={2} mb={{base : 70, md: 0}} alignItems={{base : "center", md : "start"}} justifyContent={{base : "center", md: "start"}} >
      
        {filteredPosts?.map((item, i) =>  {

          return(
            <>
            <PostCard key={i} video = {item} />
            
            
            
            
            
            
            </>
          )
        })}
          
        </Box>
  )
}
