import { useContext, useEffect, useState } from 'react'
import {Box, Hide, HStack, Show} from '@chakra-ui/react'
import { TopNav, Sidebar, Discover, MobileNav } from './components'
import {Route, Routes} from 'react-router-dom'
import { ChannelSettings, UploadPage, VideoDetails } from './pages'
import "../src/App.css"
import UserChannel from './pages/UserChannel'
import UserLibrary from './pages/UserLibrary'
// This is the start of the React app built using Subsocial Starter.
export default function App() {
 

  return (
    <Box  >
       <TopNav />
       <HStack>
         <Hide below='md' >
        <Box h="90vh"  w={{md : "30%" , lg : "300px"}} borderTop={2} borderColor="yellow"   >
        <Sidebar   />
        </Box>
        </Hide>
        <Routes>
          <Route   path='/' element={<Discover />}  />
          <Route    path='/upload' element={<UploadPage />}  />
           <Route   path='/watch/:videoId' element ={ <VideoDetails />}      />
           <Route   path='/channels/:channelId'  element = {<UserChannel />}    />
           <Route    path='/channel/settings' element={<ChannelSettings   />}     />
           <Route    path='/library' element={<UserLibrary  />}  />
            <Route   path='/history'  element={<UserLibrary  />}   />
         </Routes>
         </HStack>
        <Show below='md'>
       <MobileNav />
       </Show>
    </Box>
  )
}
