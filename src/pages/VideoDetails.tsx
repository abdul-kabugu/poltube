// @ts-nocheck
import { Avatar, Box, Button, Heading, Hide, HStack, Text } from '@chakra-ui/react'
import {useState, useContext, useEffect} from 'react'
import { AiOutlineDislike, AiOutlineDollar, AiOutlineLike } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { IPFS_GATEWAY } from '../assets/constant'
import { CardFooter, PostComments, VideoCard } from '../components'
import { useGetVideoById, UseSubscribe, useTruncateText } from '../Hooks'
import {SubsocialContext} from '../subsocial/provider'
import {RiShareForwardLine} from 'react-icons/ri'
import RelatedVideos from '../components/RelatedVideos'
export default function VideoDetails({}) {
  const [isSubscriber, setisSubscriber] = useState(false)
    const {videoId} = useParams()
    const {api, isReady} = useContext(SubsocialContext)
    const {data, loading, error} = useGetVideoById(videoId)
    const {shortenTxt} = useTruncateText()
   const {subscribe, isSubscribing} = UseSubscribe()
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
      }, [api])

      console.log("is Subscriber", isSubscriber )
      
  return (
    <Box alignSelf="start"  w="100%" display="flex" bg="pink.50" gap={2} >
      <Box  w={{base :"100%", lg: "100%", xl : "70%"}}>
         <VideoCard video={data}  />
         <Box mt={3} px={3}>
            <Text fontSize="2xl" fontWeight="semibold">{data?.postById?.title}</Text>
            <Box mt={3} display="flex" justifyContent="space-between" w="100%" flexWrap="wrap">
             <Box display="flex" w="100%" gap={6} alignItems="center" justifyContent="space-between" >
               <HStack gap={4}>
                <Avatar size="md"   />
                  <Box>
                   <Link to={`/channels/${data?.postById?.createdByAccount?.id}`}> <Text fontSize="lg" fontWeight="semibold">{data?.postById?.createdByAccount && shortenTxt(data?.postById?.createdByAccount?.id, 10)}</Text> </Link>
                     <Text>{data?.postById?.createdByAccount?.followersCount} Subscribers</Text>
                  </Box>
                  </HStack>

                  <Button variant="unstyled" bg="black" color="white" px={4} fontWeight="semibold" disabled={isSubscriber || isSubscribing} onClick={() => subscribe(videoId)}>{isSubscriber ? "Sibscribed" : "Subscribe"}</Button>
             </Box>

               <CardFooter video = {data} />
                
         </Box>
    </Box>
     <PostComments videoId = {videoId} />
    </Box>
     <Hide below='xl'>
      <RelatedVideos  />
      </Hide>
    </Box>
  )
}
