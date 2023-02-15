// @ts-nocheck
import { Avatar, Box, Button, Heading, Hide, HStack, Skeleton, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react'
import {useState, useContext, useEffect} from 'react'
import { AiOutlineDislike, AiOutlineDollar, AiOutlineLike } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { IPFS_GATEWAY } from '../assets/constant'
import { CardFooter, PostComments, VideoCard } from '../components'
import { useGetVideoById, UseSubscribe, useTruncateText , useDiscoverVideos} from '../Hooks'
import {SubsocialContext} from '../subsocial/provider'
import {RiShareForwardLine} from 'react-icons/ri'
import {fakeArrayTwo} from '../assets/constant'
import RelatedVideos from '../components/RelatedVideos'
export default function VideoDetails({}) {
  const [isSubscriber, setisSubscriber] = useState(false)
    const {videoId} = useParams()
    const {api, isReady} = useContext(SubsocialContext)
    const {data, loading, error} = useGetVideoById(videoId)
    const [isShowIt, setisShowIt] = useState(true)
    const {shortenTxt} = useTruncateText()
   const {subscribe, isSubscribing} = UseSubscribe()
   const {posts, isPostsLoading, isPostsError} = useDiscoverVideos()
    console.log("the post details console", data)
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
    const CREATOR_USER_ID = data?.postById?.createdByAccount?.id
      //  CHECK  IF  CURRENT  USER  IS  SUBSCRIBER 
          console.log("the creator", CREATOR_USER_ID)
        const checkIsFollower = async () =>  {
          const substrateApi = await api!.blockchain.api
        const isFollower = await substrateApi?.isAccountFollower(CONNECTED_USER_DETAILS?.address, CREATOR_USER_ID)
         setisSubscriber(isFollower)
        }
      useEffect(() => {
        checkIsFollower()
      }, [isReady])

      console.log("is Subscriber", isSubscriber )

      //CHECK-IF  IS  Error

         
      if(isPostsError || error) {
        return(
          <Box w="70vw" h="100vh" display="flex" flexDir="column" gap={3} alignSelf="start" alignItems="center" justifyContent="center">
              <Heading fontSize="lg">Some Thing  Went  wrong</Heading>
              <Heading fontSize="lg">Check your connection and Refresh the page </Heading>
          </Box>
        )
      }
         //CHECK-IF  IS  LOADING

      if(isPostsLoading || loading){
        return(
           <Box alignSelf="start"  w="100%" display="flex"  gap={2}   w={{base : "100vw", md : "70vw", lg : "75vw"}}>
             <Box width="100%">
            <Skeleton>
            <Box w="100%"  rounded="sm" h={{base : 200, md : 300, lg : 450}} ></Box>
            </Skeleton>
              <Box w={500} px={10}>
            <Skeleton h={5} mt={3} w={{base : 220}}>
                    <Text>hellow  world  world  this  is  just  testi</Text>
                  </Skeleton>
                  </Box>
                   <Box display="flex" justifyContent="space-between" alignItems="center">
              <HStack px={4} mt={3} gap={3}>
                <SkeletonCircle  size={{base : "10", md : "16", lg : "20"}} />
                 <Box>
                  <Skeleton height={4} w={{base : 250}}>
                    <Text>hellow  world  world   </Text>
                  </Skeleton>
                  <Skeleton height={2} mt={2}  w={{base : 150}}>
                    <Text>hellow  world  world  this  is  just  testing  part </Text>
                  </Skeleton>
                   
                 </Box>
              </HStack>
                  <Skeleton h={10} rounded="lg">
                  <Button variant="unstyled" bg="black" color="white" px={4} fontWeight="semibold" disabled={isSubscriber || isSubscribing} onClick={() => subscribe(videoId)}>subscribe</Button>
                  </Skeleton>
              </Box>
            </Box>
             <Hide below='xl'>
            <Box>
               {fakeArrayTwo.map((data, i) =>  {

                return(
                   <Box key={i}>
                 <HStack mb={3}>
                    <Skeleton   w={120}  h={90} rounded="md" />
                       <Box display="flex" flexDir="column">
                      <Skeleton  w={100} h={4} />
                      <Skeleton  w={70} h={3} mt={2} />
                      <Skeleton  w={70} h={2} mt={2} />
                      </Box>
                 </HStack>
                </Box>
                )
               })}
           </Box>
           </Hide>
           </Box>
        )
      }
      
  return (
    <Box alignSelf="start"  w="100%" display="flex" bg="pink.50" gap={2} >
      <Box  w={{base :"100%", lg: "100%", xl : "70%"}}>
         <VideoCard video={data}  />
         <Box mt={3} px={3}>
            <Text fontSize="2xl" fontWeight="semibold">{data?.postById?.title}</Text>
            <Box mt={3} display="flex" justifyContent="space-between" w="100%" flexWrap="wrap">
             <Box display="flex" w="100%" gap={6} alignItems="center" justifyContent="space-between" >
               <HStack gap={4}>
                <Avatar size="md" src={`${IPFS_GATEWAY}${data?.postById?.createdByAccount.profileSpace?.image}`}  />
                  <Box>
                   <Link to={`/channels/${data?.postById?.createdByAccount?.id}`}> <Text fontSize="lg" fontWeight="semibold">{ data?.postById?.createdByAccount.profileSpace?.name ||  data?.postById?.createdByAccount && shortenTxt(data?.postById?.createdByAccount?.id, 10)}</Text> </Link>
                     <Text>{data?.postById?.createdByAccount?.followersCount} Subscribers</Text>
                  </Box>
                  </HStack>

                  <Button variant="unstyled" bg="black" color="white" px={4} fontWeight="semibold" disabled={isSubscriber || isSubscribing} onClick={() => subscribe(data?.postById?.createdByAccount?.id)}>{isSubscriber ? "Sibscribed" : "Subscribe"}</Button>
             </Box>

               <CardFooter video = {data} />
                
         </Box>
    </Box>
     <PostComments videoId = {videoId} />
    </Box>
     <Hide below='xl'>
      <RelatedVideos posts={posts} />
      </Hide>
    </Box>
  )
}
