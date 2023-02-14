// @ts-nocheck
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Heading  } from '@chakra-ui/react'
import React from 'react'
import { UserVideosTab } from '../components'
import UserSharedPostsTab from '../components/UserSharedPostsTab'

export default function UserDataStats({userDetails}) {
  return (
    <Box>
        <Tabs colorScheme="purple">
          <TabList>
            <Tab>Videos</Tab>
             <Tab>Re-amplified</Tab>
              <Tab>About</Tab>

          </TabList>

          <TabPanels>
            <TabPanel>
              <UserVideosTab videos={userDetails?.accountById?.posts}  />
            </TabPanel>
             <TabPanel>
              <UserSharedPostsTab  />
             </TabPanel>
             <TabPanel>
             <UserSharedPostsTab  />
             </TabPanel>
          </TabPanels>
        </Tabs>
    </Box>
  )
}
