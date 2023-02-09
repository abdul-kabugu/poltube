// @ts-nocheck
import { Box } from '@chakra-ui/react'
import React from 'react'
//import '~video-react/dist/video-react.css'; // import css
import 'video-react/dist/video-react.css';
import { Player, BigPlayButton,  LoadingSpinner , ControlBar} from 'video-react';
import { IPFS_GATEWAY } from '../assets/constant';
import "../../src/App.css"
export default function VideoCard({video}) {
    console.log("the video", video)
  return (
      <Box w="100%" bg="black" rounded="sm" zIndex={0}>
     <Player 
      src={`${IPFS_GATEWAY}${video?.postById?.body}`}
      poster={`${IPFS_GATEWAY}${video?.postById?.image}`}
      fluid={true} 
      
      >
      <BigPlayButton position="center"  />
      <LoadingSpinner />
      <ControlBar autoHide={true} className="control-bar" />
     </Player>
     </Box>
    

    
  )
}
