// @ts-nocheck
import { Box, Button, Heading, HStack, Skeleton, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react'
import {useEffect, useState, useContext} from 'react'
import { fakeArray, SPACE_ID } from '../assets/constant'
import {SubsocialContext} from '../subsocial/provider'
import { useCreateSpace, useDiscoverVideos } from '../Hooks'
import PostCard from './PostCard'

export default function Discover() {
  const {createSpace} = useCreateSpace()
  const {posts, isPostsLoading, isPostsError} = useDiscoverVideos()
const [isShowIt, setisShowIt] = useState(true)
   console.log("the posts from  hooks", posts)
  //FILTER  POSTS  
      const filteredPosts = posts?.posts?.filter(post => post.hasOwnProperty("image") && post.image !== null)
      
      if(isPostsError) {
        return(
          <Box w="70vw" h="100vh" display="flex" flexDir="column" gap={3} alignSelf="start" alignItems="center" justifyContent="center">
              <Heading fontSize="lg">Some Thing  Went  wrong</Heading>
              <Heading fontSize="lg">Check your connection and Refresh the page </Heading>
          </Box>
        )
      }


        if(isPostsLoading) {
          return(
            <Box alignSelf="start"  w="100%" display="flex" flexWrap="wrap" gap={4} py={3} px={2} mb={{base : 70, md: 0}} alignItems={{base : "center", md : "start"}} justifyContent={{base : "center", md: "start"}} >
              {fakeArray.map((data, i) =>  {
                return(
                  <Box key={i} display="flex" flexDir="column" gap={2}>
                  <Skeleton>
                  <Box w={{base : "100vw", sm : "270px",  md : "270px",  lg: "220px", xl: "253px"}}  flexGrow={1} flexShrink={1}  maxW={{base: "450px", sm:"300px"}} cursor="pointer"   rounded="md" h={150}   >

                  </Box>
         </Skeleton>
         <HStack>
                   <SkeletonCircle  size="10"  />
                    
                      <Box>
                         <Skeleton  w={200} h={4}   />
                        <Skeleton   w={120} h={3}  mt={2} />
                     </Box>
                  </HStack>
                  </Box>
                )
              })}
            </Box>
          )  
        }
  return (
    <Box alignSelf="start"  w="100%" display="flex" flexWrap="wrap" gap={4} py={3} px={2} mb={{base : 70, md: 0}} alignItems={{base : "center", md : "start"}} justifyContent={{base : "center", md: "start"}} >
      
        {filteredPosts?.map((item, i) =>  {

          return(
            <>
            <PostCard key={i} video = {item} isLoading = {isPostsLoading} />
            
            
            
            
            
            
            </>
          )
        })}
          
        </Box>
  )
}
