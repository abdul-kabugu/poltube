// @ts-nocheck
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Text  } from '@chakra-ui/react'
import React from 'react'
import { UserVideosTab } from '../components'

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
                <Text>I'm shared posts</Text>
             </TabPanel>
             <TabPanel>
             <Text>I'm user Abouts</Text>
             </TabPanel>
          </TabPanels>
        </Tabs>
    </Box>
  )
}
