// @ts-nocheck
import { Avatar, Box, Heading, HStack, Img, Skeleton, Text } from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {FormattedRelativeTime} from 'react-intl'
import { isTemplateExpression } from 'typescript'
import {IPFS_GATEWAY} from '../assets/constant'
import {BiDotsVerticalRounded} from 'react-icons/bi'
import moment from 'moment';
import { Link } from 'react-router-dom'
import { saveToLibrary } from '../utils'

export default function SharedPostCard(video) {
  const [isDisplayDots, setIsDisplayDots] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date());
  const currentDate = new Date();
  
  const postCreatedAt = new Date(video?.video?.createdAtTime);
  //const timeDifference = currentTime - postCreationTime;

     
const diffInMilliseconds = currentDate - postCreatedAt;
const diffInHours = diffInMilliseconds / (60 * 60 * 1000);

const duration = moment.duration(diffInHours, 'hours');
  const toggleIsDisplayDots = () => {
    isDisplayDots ?  setIsDisplayDots(false) : setIsDisplayDots(true)
  }
  console.log("the shared video ", video?.video)
  const avatarUrl = video?.video?.sharedPost?.createdByAccount?.profileSpace?.image
    
  return (
       
    <Box w={{base : "100vw", sm : "270px",  md : "270px",  lg: "220px", xl: "253px"}}  flexGrow={1} flexShrink={1}  maxW={{base: "450px", sm:"300px"}} cursor="pointer"   rounded="md"  onMouseEnter={toggleIsDisplayDots} onMouseLeave={toggleIsDisplayDots}
    
    >
         <Link to={`/watch/${video?.video?.id}`}>
       <Box bg="black"  rounded="md" onClick={() => saveToLibrary(video)}>
        <Img  src={`${IPFS_GATEWAY}${video.video.sharedPost?.image}`} 
          w="100%" h={{base : 190, md : 170}} objectFit="cover" rounded="md" minW={{base : "100%"}}
        />
        </Box>
        </Link>
       <Box mt={2} display="flex"  px={2} alignItems="center" gap={2}>
         <Link to={`/channels/${video?.video?.createdByAccount?.id}`}>
         <Avatar size="xs" src={`${IPFS_GATEWAY}${avatarUrl}`} />
         </Link>
         <Link to={`/watch/${video?.video?.sharedPost.id}`}>
         <Text fontSize="sm" fontWeight="semibold">{video?.video?.sharedPost.title}</Text>
         </Link>
         {isDisplayDots && <BiDotsVerticalRounded  size={25} style={{marginLeft : "auto"}} />}
          
          
       </Box>
        <HStack gap={3} px={6} ml={4} mt={2}>
         <Text fontSize="sm" color="gray.400">likes {video?.video?.sharedPost?.upvotesCount}</Text>
       <Text fontSize="sm" color="gray.400">{duration.humanize().replace("a ", "")} ago</Text>
       </HStack>
       
    </Box>
    
  )
}
