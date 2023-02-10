// @ts-nocheck
import { Box, Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import {useState} from 'react'
import {RiShareForwardLine} from 'react-icons/ri'
import { AiOutlineDislike, AiOutlineDollar, AiOutlineLike } from 'react-icons/ai'
import { useReactions, useTruncateText } from '../Hooks'
import SocialShareBtns from './SocialShareBtns'
import TipUser from './TipUser'

export default function CardFooter({video}) {
  const [isShowShareModal, setisShowShareModal] = useState(false)
  const [isShowTipModal, setisShowTipModal] = useState(false)
  const {likePost, deslikePost, isDeslikeLoading, isLikeLoading} = useReactions()
  const {shortenTxt} = useTruncateText()
   const toggleIsShareModal = () =>  {
    isShowShareModal ?  setisShowShareModal(false) : setisShowShareModal(true)
   }
    console.log("the video  from modals", video)

   const toggleIsTipModal = () =>  {
    isShowTipModal ? setisShowTipModal(false) : setisShowTipModal(true)
   }
  
    
  return (
    <Box display="flex" gap={3} mt={2}>
    <Button
    leftIcon={<AiOutlineLike  />}  onClick={() => likePost(video?.postById?.id)} >
    
      Like {video?.postById?.upvotesCount && video?.postById?.upvotesCount}
    </Button>
 

 
 
    <Button
    leftIcon={<AiOutlineDislike />} 
    onClick={() => deslikePost(video?.postById?.id)} >
      Dislike {video?.postById?.downvotesCount && video?.postById?.downvotesCount}
    </Button>
 

 
    <Button
    leftIcon={<AiOutlineDollar />} 
    onClick={toggleIsTipModal}
    >
      Tip
    </Button>
 

 
    <Button
   leftIcon={<RiShareForwardLine />} 
   onClick={toggleIsShareModal}
    >
      Share
    </Button>

      {/*SHARE  TO  SOCIAL  MODAL */}
      <Modal isOpen={isShowShareModal} onClose={toggleIsShareModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SocialShareBtns postId = {video?.postById?.id}  />
          </ModalBody>

        </ModalContent>
      </Modal>

      {/* END OF SHARE MODAL */}

          {/*TIP USER MODAL*/}
          <Modal isOpen={isShowTipModal} onClose={toggleIsTipModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tip {video?.postById?.createdByAccount && shortenTxt(video?.postById?.createdByAccount?.id, 10)}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TipUser   video={video}  />
          </ModalBody>

        </ModalContent>
      </Modal>


             {/*END OF  THE TIP MODAL*/}

 </Box>
  )
}
