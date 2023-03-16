import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function AboutUs() {
  return (
   <Box alignSelf="start"  w="100%" px={10} mx="auto">
   
      <Text fontSize="lg" fontWeight="semibold">
      Welcome to FrenTube, the decentralized social network for video creators. Our platform is built on Subsocial, a censorship-resistant network that prioritizes content ownership and privacy. We believe that creators deserve to have full control over their work and should be able to share it without fear of censorship or demonetization.

At Poltube, we prioritize user experience and aim for mass usability. Our platform allows creators to monetize their work through tips, giving them more control over their content and financial freedom. We do not collect any user data and are committed to protecting our users' privacy.

Join Poltube and become a part of a fairer, decentralized video-sharing community that values your hard work. We believe that creators should have the power to shape the future of content sharing and invite you to join us on this journey. Thank you for choosing Poltube!
      </Text>
   </Box>
  )
}
