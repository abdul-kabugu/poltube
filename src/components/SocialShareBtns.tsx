// @ts-nocheck
import { Box, Button, HStack, Text, useClipboard } from '@chakra-ui/react'
import React from 'react'
import { AiFillInstagram } from 'react-icons/ai'
import { FacebookIcon, FacebookShareButton, InstapaperShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TelegramIcon, TelegramShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

export default function SocialShareBtns({postId}) {
     const url = `poltube.xyz/watch/${postId}`
     const { onCopy, value, setValue, hasCopied } = useClipboard(url);
  return (
    <Box>
       <HStack gap={2}>
         <TwitterShareButton url={url} >
           <TwitterIcon  size={45} round={true} />
         </TwitterShareButton>
           <FacebookShareButton url={url}>
             <FacebookIcon  size={45} round={true} />
           </FacebookShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon   size={45} round={true} />
            </LinkedinShareButton>
              <PinterestShareButton url={url}>
                   <PinterestIcon  size={45} round={true}   />
              </PinterestShareButton>
              <RedditShareButton>
                <RedditIcon  size={45} round={true} />
              </RedditShareButton>
               <TelegramShareButton url={url}>
                 <TelegramIcon  size={45} round={true} />
               </TelegramShareButton>

               <WhatsappShareButton>
                 <WhatsappIcon   size={45} round={true}  />
               </WhatsappShareButton>
                
       </HStack>

         <Box w="100%" h={14} border="1px solid" borderColor="gray.400" rounded="lg" mt={6} display="flex" alignItems="center" mb={3} px={3} justifyContent="space-between">
           <Text fontSize="xl" fontWeight="semibold" color="gray.800">{url}</Text>
             <Button bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" px={4} rounded="xl" onClick={onCopy}>{hasCopied ? "Copied" : "Copy"}</Button>
         </Box>
    </Box>
  )
}
