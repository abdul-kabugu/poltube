import { useContext, useEffect, useState } from 'react'
import {Box, Hide, HStack, Show} from '@chakra-ui/react'
import { TopNav, Sidebar, Discover, MobileNav } from './components'


// This is the start of the React app built using Subsocial Starter.
export default function App() {
 

  return (
    <Box >
       <TopNav />
       <HStack>
         <Hide below='md' >
        <Box h="90vh"  w={{md : "30%" , lg : "300px"}} borderTop={2} borderColor="yellow"  mt={200} >
        <Sidebar   />
        </Box>
        </Hide>
         <Discover  />
         </HStack>
        <Show below='md'>
       <MobileNav />
       </Show>
    </Box>
  )
}
