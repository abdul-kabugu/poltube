// @ts-nocheck
import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useCreateSpace } from '../Hooks'

export default function Discover() {
  const {createSpace} = useCreateSpace()
  return (
    <Box  h="100vh" w="100%" bg="yellow.700" >
        It's discover  page
          <Button onClick={createSpace}>create space</Button>
        </Box>
  )
}
