
import { Avatar, Box, Button, Hide, HStack, Text } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineDislike, AiOutlineDollar, AiOutlineLike } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { IPFS_GATEWAY } from '../assets/constant'
import { CardFooter, VideoCard } from '../components'
import { useGetVideoById, useTruncateText } from '../Hooks'
import {RiShareForwardLine} from 'react-icons/ri'
import RelatedVideos from '../components/RelatedVideos'
export default function VideoDetails({}) {
    const {videoId} = useParams()
    const {data, loading, error} = useGetVideoById(videoId)
    const {shortenTxt} = useTruncateText()
    console.log("the data ", data)
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
                    <Text fontSize="lg" fontWeight="semibold">{data?.postById?.createdByAccount && shortenTxt(data?.postById?.createdByAccount?.id, 10)}</Text>
                     <Text>{data?.postById?.createdByAccount?.followersCount} Subscribers</Text>
                  </Box>
                  </HStack>

                  <Button variant="unstyled" bg="black" color="white" px={4} fontWeight="semibold">Subscribe</Button>
             </Box>

               <CardFooter video = {data} />
         </Box>
    </Box>
    </Box>
     <Hide below='xl'>
      <RelatedVideos  />
      </Hide>
    </Box>
  )
}
