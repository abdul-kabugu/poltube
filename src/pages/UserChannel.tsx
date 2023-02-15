// @ts-nocheck
import { Avatar, Box, Button, Heading, HStack, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import {useState, useContext, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { UserDataStats } from '../components'
import { useGetUserData, UseSubscribe, useTruncateText } from '../Hooks'
import {SubsocialContext} from '../subsocial/provider'

export default function UserChannel() {
  const [isSubscriber, setisSubscriber] = useState(false)
  const [isShowIt, setisShowIt] = useState(true)
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

         
      if(isUserDataError) {
        return(
          <Box w="70vw" h="100vh" display="flex" flexDir="column" gap={3} alignSelf="start" alignItems="center" justifyContent="center">
              <Heading fontSize="lg">Some Thing  Went  wrong</Heading>
              <Heading fontSize="lg">Check your connection and Refresh the page </Heading>
          </Box>
        )
      }

       if(isUserDataLoading){
        return(

          <Box alignSelf="start" w={{base : "100vw", md : "70vw", lg : "75vw"}} >
            <Box position="relative">
             <Skeleton   w="100%" h={300} flexGrow={2} />
                <Box display="flex" justifyContent="space-between" alignItems="center" pos="absolute" top="90%" width="100%">
                  <HStack gap={4}>
                    <SkeletonCircle   size={28}  />
                     <Box display="flex" flexDir="column" gap={3}>
                      <Skeleton    width={170} h={4} />
                      <Skeleton    width={100} h={3} />
                     </Box>
                  </HStack>

                   <Skeleton  w={100} h={10} rounded="lg" />
                </Box>
             </Box>

               <Box mt={100}>
                <HStack gap={4}>
                   <Skeleton  width={90} h={5} />
                   <Skeleton  width={90} h={5} />
                   <Skeleton  width={90} h={5} />
                </HStack>

               </Box>

                <Box mt={4}>
                  <HStack>
                    <Skeleton   w={400} h={170} rounded="md" />
                    <Skeleton   w={400} h={170} rounded="md" />
                    <Skeleton   w={400} h={170} rounded="md" />
                    <Skeleton   w={400} h={170} rounded="md" />
                  </HStack>
                </Box>
          </Box>
        )
       }
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
     <UserDataStats userDetails = {userData} channelId = {channelId} />
   </Box>
    
   </Box>
  )
}
