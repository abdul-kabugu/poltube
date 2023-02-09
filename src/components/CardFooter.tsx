// @ts-nocheck
import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import {RiShareForwardLine} from 'react-icons/ri'
import { AiOutlineDislike, AiOutlineDollar, AiOutlineLike } from 'react-icons/ai'
export default function CardFooter({video}) {
  return (
    <Box display="flex" gap={3} mt={2}>
    <Button
    leftIcon={<AiOutlineLike  />} 
    >
      Like {video?.postById?.upvotesCount && video?.postById?.upvotesCount}
    </Button>
 

 
 
    <Button
    leftIcon={<AiOutlineDislike />} 
    >
      Duslike {video?.postById?.downvotesCount && video?.postById?.downvotesCount}
    </Button>
 

 
    <Button
    leftIcon={<AiOutlineDollar />} 
    >
      Tip
    </Button>
 

 
    <Button
    leftIcon={<RiShareForwardLine />} 
    >
      Share
    </Button>
 </Box>
  )
}
