import { Box, color, Divider, Heading, HStack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import { navigations, socialIcons } from '../assets/constant'

export default function Sidebar() {
  const {colorMode} = useColorMode()
  return (
    <Box  borderColor="gray.400" h="90vh" w={{md : "30%" , lg : "250px"}} px={5} pos="fixed" top={63} >
      {navigations.map((item, i) => {

        return(
            <Link key={i} to={item.to}>
            <HStack  spacing={5} mb={2}  py={3} borderRadius="12px" px="3"   _hover={{bg: "gray.300", color: "black"}} >
                <item.icon size={22} />
                 <Text fontSize="sm" fontWeight="semibold" >{item.title}</Text>
            </HStack>
            </Link>
        )
      })}

      <Divider  />

        {socialIcons.map((item, i) =>  {

            return(
                <Link key={i} to={item.to}>
                    <HStack spacing={5} mb={2}  py={3} borderRadius="12px" px="3"   _hover={{bg: "gray.300", color: "black"}}>
                        <item.icon  size={22} />
                         <Text fontSize="sm" fontWeight="semibold" >{item.title}</Text>
                    </HStack>
                </Link>
            )
        })}
    </Box>
  )
}
