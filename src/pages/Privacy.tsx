import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function Privacy() {
  return (
    <Box alignSelf="start"  w="80%" h="100vh" px={4} mx="auto">
         <Heading fontSize="xl" mb={6}>Privacy</Heading>
         <Text fontSize="lg" fontWeight="semibold">
         At FrenTube, we understand the importance of privacy and are committed to protecting the personal information of our users. We do not collect or store any user data, including IP addresses or browser history. We use a decentralized network built on Subsocial to ensure that all data is encrypted and stored securely
Our platform is designed to prioritize the ownership and privacy of content creators. We do not sell or share any user data with third parties. We may collect some basic usage data to improve our platform, but this data is anonymized and cannot be used to identify individual users.

We do not use cookies or any other tracking technology to monitor our users. Our platform is open-source, allowing users to review our code and ensure that their data is kept safe. We encourage our users to take an active role in protecting their data and to use strong passwords and two-factor authentication to secure their accounts.

In summary, at Poltube, we believe that privacy is a fundamental right. We are committed to protecting our users' data and ensuring that our platform remains secure and censorship-resistant. Join Poltube today and become a part of a fairer, decentralized video-sharing community that values your privacy.
         </Text>
    </Box>
  )
}
