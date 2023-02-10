// @ts-nocheck
import { Avatar, Box, Button, Heading, HStack, Text } from '@chakra-ui/react'
import {useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { UserDataStats } from '../components'
import { useGetUserData, UseSubscribe, useTruncateText } from '../Hooks'
import {SubsocialContext} from '../subsocial/provider'

export default function UserChannel() {
  const [isSubscriber, setisSubscriber] = useState(false)
    const {channelId} =  useParams()
    const {shortenTxt} = useTruncateText()
    const {api, isReady} = useContext(SubsocialContext)
    const {userData, isUserDataLoading, isUserDataError} = useGetUserData(channelId)
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
     console.log("The user id", userData)
    const {subscribe, isSubscribing} = UseSubscribe()
        //  CHECK  IF  CURRENT  USER  IS  SUBSCRIBER 
       
        const checkIsFollower = async () =>  {
          const substrateApi = await api!.blockchain.api
        const isFollower = await substrateApi?.isAccountFollower(CONNECTED_USER_DETAILS?.address, channelId)
         setisSubscriber(isFollower)
        }
      useEffect(() => {
        checkIsFollower()
      }, [api])

      console.log("is Subscriber", isSubscriber )
  return (
   <Box alignSelf="flex-start" width="100%" px={{base : 0 , md : 2}}>
    <Box w="100%" h={{base : 200 , lg : 280}}
    backgroundImage="url(/img/bio-bg.png)"
   

     pos="relative"
    >
    <Box display="flex" justifyContent="space-between" alignItems="center" pos="absolute" width="100%" top="88%" px={{base : 0, md: 4}}>
        <HStack gap={3}>
           <Avatar  size={{base : "xl" , lg : "2xl"}}  />
            <Box>
               <Text fontWeight="semibold" mb={1} fontSize="lg">{shortenTxt(channelId, 10)}</Text>
                <Text>{userData?.accountById?.followersCount} Subscribers</Text>
               </Box>
        </HStack>
         <Button variant="unstyled" bg="black" fontWeight="semibold" color="white" px={4} onClick={() => subscribe(channelId)} disabled={isSubscriber}>{isSubscriber ? "Subscribed" : "Subscribe"}</Button>
     </Box>
    </Box>

   <Box w="100%" h="100vh" mt={{base : 24, lg : 28}}>
     <UserDataStats userDetails = {userData} />
   </Box>
    
   </Box>
  )
}
