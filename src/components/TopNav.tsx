// @ts-nocheck
import {useState} from 'react'
import { Avatar, Box, Button, Heading, Hide, HStack, IconButton, Input, InputGroup, InputRightElement, useColorMode, Menu, MenuButton, MenuItem, MenuList, Text, color, useDisclosure ,
Modal, ModalOverlay, ModalHeader, ModalBody,ModalCloseButton, ModalContent, ModalFooter, VStack
} from '@chakra-ui/react'
import {AiOutlineSearch, AiOutlineUser, AiOutlineSetting, AiOutlineLogout, AiOutlineLogin} from 'react-icons/ai'
import { MdLightMode, MdOutlineDarkMode } from 'react-icons/md'
import {BiVideoPlus} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { getAllAccounts } from '../subsocial/wallets/polkadotjs'
import { useAuthenticate, useTruncateText } from '../Hooks'

import {web3Accounts} from '@polkadot/extension-dapp'
export default function TopNav() {
    const [searchTxt, setsearchTxt] = useState("")
    const [isAuthenticated, setisAuthenticated] = useState(false)
    const {colorMode, toggleColorMode} = useColorMode()
    const { isOpen, onOpen, onClose } = useDisclosure()
        const {connectWallet, isNoExtension, userWallets} = useAuthenticate()
        const {shortenTxt} = useTruncateText()

          const handleSaveLogins =(userDetails) => {
            localStorage.setItem('poltubeUserDetails', JSON.stringify(userDetails));
            console.log("the current user details", userDetails)
          }

          const items = JSON.parse(localStorage.getItem('poltubeUserDetails'));
          console.log("the current user details from local storage", items)

      const  handleConnectWallet = async () =>  {
            await connectWallet()
             onOpen()
      }
      console.log("the current  available wallets", userWallets)
  return (
   <Box display="flex" justifyContent="space-between" maxW="1300px" mx="auto"  h={62} py={5} px={3} alignItems="center" pos="sticky" top={1}   >
      <Box>
          <Heading as="h2">Poltube</Heading>
      </Box>
      <Hide below='md'>
      <InputGroup w={{md : "40%", lg: "60%"}} >
      <Input value={searchTxt} onChange = {e => setsearchTxt(e.target.value)} 
        placeholder="Search By Name or Tag " variant="unstyled" border="1px solid" borderColor={'gray.300'}
         px={4} py={3} h={10} borderRadius={15}
      />
      <InputRightElement children = {<AiOutlineSearch size={26} color="gray" cursor="pointer" />}  />
      </InputGroup>
      </Hide>
      {
        isAuthenticated ? (
          <HStack gap={3}>
            <Link to="/upload">
            <IconButton   icon={<BiVideoPlus size={30} />} aria-label='Upload video' />
            </Link>
             <Menu>
              <MenuButton>
              <Avatar  size="md" cursor="pointer" src='https://nftcoders.com/avatar/avatar-cool.svg'  />
              </MenuButton>

              <MenuList>
    <MenuItem>
    <HStack>
    <AiOutlineUser size={20}  />
    <Text fontWeight="bold">Your channel</Text>
    </HStack>
     
    </MenuItem>
    <MenuItem>
    <HStack>
     <AiOutlineSetting size={20} />
    <Text fontWeight="bold">Your channel</Text>
    </HStack>
    </MenuItem>
    <MenuItem>
    <HStack  onClick={toggleColorMode} >
     {colorMode === "light" ? <MdOutlineDarkMode  cursor="pointer" size={20} />  : <MdLightMode cursor="pointer" size={20} />  }
    <Text fontWeight="bold">{colorMode === "light" ? "Switch to Dark " : "Switch to Light"}</Text>
    </HStack>
    </MenuItem>
    <MenuItem>
    <HStack>
     <AiOutlineLogout size={20} />
    <Text fontWeight="bold">Sign Out</Text>
    </HStack>
    </MenuItem>
   
  </MenuList>
             </Menu>
         
             
          </HStack>
        ) : (
          <HStack>
          {colorMode === "light" ? <MdOutlineDarkMode onClick={toggleColorMode} cursor="pointer" size={30} />  : <MdLightMode onClick={toggleColorMode} cursor="pointer" size={30} /> }
           <Button bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" px={6} onClick={handleConnectWallet}>Connect  Wallet</Button>
        </HStack>
        )
      }
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <HStack>
              <AiOutlineLogin size={20} />
              <Text fontWeight="semibold">Sign In</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
           <Heading textAlign="start" fontSize="2xl" mb="2">Select your account</Heading>
            <Text fontWeight="semibold" >Click on your account to Sign In</Text>
            
            <Box mt={4}>
             {userWallets?.map((item, i) =>  {

              return(
                <Box key={i} display="flex" gap={6} justifyContent="space-between" border="1px solid" borderColor="gray.300" px={3} py="2" alignItems="center" rounded="lg" cursor="pointer" mb={3}
                  onClick={() => handleSaveLogins(item)}
                >
                  <HStack gap={3}>
                  <Avatar src='https://nftcoders.com/avatar/avatar-cool.svg' size="sm" cursor="pointer" />
                   <Text textTransform="capitalize" fontWeight="semibold" fontSize="lg">{item?.meta?.name}</Text>
                  </HStack>
                  <Text noOfLines={1} fontWeight="semibold">{item.address && shortenTxt(item.address, 10)}</Text>
                   
                </Box>
              )
             })}
            
            </Box>
          </ModalBody>

          
        </ModalContent>
      </Modal>
   </Box>
  )
}
