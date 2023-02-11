// @ts-nocheck
import { Box, HStack, Avatar, Text, Button, IconButton, Heading, Input, Textarea } from '@chakra-ui/react'
import {useState, useContext, useRef} from 'react'
import { AiOutlineUpload } from 'react-icons/ai'
import { useTruncateText, useGetUserData, useCreateProfile } from '../Hooks'
import {SubsocialContext} from '../subsocial/provider'
import { LogTransaction, logTransaction } from '../subsocial/wallets/polkadotjs'

export default function ChannelSettings() {
    const [avatarFile, setavatarFile] = useState()
    const [isShowUploadIcon, setisShowUploadIcon] = useState(false)
    const [displayName, setdisplayName] = useState("")
    const [avatarCid, setavatarCid] = useState("")
    const [userBio, setuserBio] = useState("")
    const [website, setwebsite] = useState("")
    const [twitterLink, settwitterLink] = useState("")
    const [yuotubeLink, setyuotubeLink] = useState("")
    const {shortenTxt} = useTruncateText()
    const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
    const channelId = CONNECTED_USER_DETAILS?.address
    const {userData, isUserDataLoading, isUserDataError} = useGetUserData(channelId)
  const {createProfile, isCreatingProfile} = useCreateProfile()
  const {api, isReady} = useContext(SubsocialContext)
  
     const avatarRef = useRef(null)

       const handleSelectAvatrFile = () => {
       avatarRef.current.click()
       }

        const handleCreateProfile = async (about, name) =>  {
          if(avatarFile){
            const avatarFileCID = await api.ipfs.saveFile(avatarFile)
            await createProfile(about, avatarFileCID, name)

            console.log("the log transactuions", logTransaction())
          }
        }
  return (
     <Box alignSelf="flex-start" width="100%" px={{base : 0 , md : 2}}>
         <Box w="100%" h={{base : 200 , lg : 280}}
    backgroundImage="url(/img/bio-bg.png)"
   

     pos="relative"
    >
    <Box display="flex" justifyContent="space-between" alignItems="center" pos="absolute" width="100%" top="88%" px={{base : 0, md: 4}}>
        <HStack gap={3}>
            <Box  rounded="full" pos="relative"  display="flex" flexDir="column" onMouseEnter={() => setisShowUploadIcon(true)} onMouseLeave= {() => setisShowUploadIcon(false)}>
           <Avatar  size={{base : "xl" , lg : "2xl"}} src={avatarFile ? URL.createObjectURL(avatarFile) : ""} />
             { isShowUploadIcon  &&
            <IconButton  icon={ <AiOutlineUpload  size={30} />} pos="absolute" top="45%" left="38%" onClick={handleSelectAvatrFile} />
             }
        <input  type="file" ref={avatarRef} onChange={e => setavatarFile(e.target.files[0])} accept="image/*" hidden /> 
           </Box>
            <Box>
               <Text fontWeight="semibold" mb={1} fontSize="lg">{shortenTxt(channelId, 10)}</Text>
                <Text>{userData?.accountById?.followersCount} Subscribers</Text>
               </Box>
        </HStack>
         <Button variant="unstyled" bg="black" fontWeight="semibold" color="white" px={4} disabled={true} onClick={() => handleCreateProfile(userBio, displayName)}>Update Profile</Button>
     </Box>
    </Box>

      <Box mt={{base : 24, lg : 28}} px={2}>
          <Box w={{base : "100%", sm : "70%", lg : "700px"}}  mx="auto">
       <HStack justifyContent="space-between">
          <Text fontWeight="semibold">Display Name</Text>
        <Input   type="text"  value={displayName} onChange = {e => setdisplayName(e.target.value)} placeholder="Kabugu"
          variant="unstyled" py={2} px={4} border="1px solid" borderColor="gray.400" maxW={{base : "70%", lg : 500}}
        />
       </HStack>

       <HStack  mt={5} justifyContent="space-between">
          <Text fontWeight="semibold">Your website</Text>
        <Input   type="text"  value={website} onChange = {e => setwebsite(e.target.value)} placeholder="Kabugu.com"
          variant="unstyled" py={2} px={4} border="1px solid" borderColor="gray.400" maxW={{base : "70%", lg : 500}}
        />
       </HStack>

       <HStack  mt={5} justifyContent="space-between">
          <Text fontWeight="semibold">Your twitter</Text>
        <Input   type="text"  value={twitterLink} onChange = {e => settwitterLink(e.target.value)} placeholder="Kabugu.com"
          variant="unstyled" py={2} px={4} border="1px solid" borderColor="gray.400" maxW={{base : "70%", lg : 500}}
        />
       </HStack>

       <HStack  mt={5} justifyContent="space-between">
          <Text fontWeight="semibold">Your Youtube</Text>
        <Input   type="text"  value={yuotubeLink} onChange = {e => setyuotubeLink(e.target.value)} placeholder="Kabugu.com"
          variant="unstyled" py={2} px={4} border="1px solid" borderColor="gray.400" maxW={{base : "70%", lg : 500}}
        />
       </HStack>

       <HStack  mt={5} justifyContent="space-between">
          <Text fontWeight="semibold">Channel Bio</Text>
           <Textarea 
             value={userBio}
             onChange = {e => setuserBio(e.target.value)}
              resize="none"
              height={32}
              placeholder="I teach You  everything About js"
              maxW={{base : "70%", lg : 500}}
              variant="unstyled" py={2} px={4} border="1px solid" borderColor="gray.400"
           />
       </HStack>


        
          </Box>
        
      </Box>
     </Box>
  )
}
