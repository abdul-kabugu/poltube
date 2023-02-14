import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineDatabase } from 'react-icons/ai'

export default function UserSharedPostsTab() {
  return (
  <Box h="30vh" w="100%" display="flex" alignItems="center" justifyContent="center">
     <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" gap={2}>

     
         <AiOutlineDatabase   size={70}  />
          <Heading fontSize="xl">No  Data</Heading>
          </Box>
  </Box>
  )
}
