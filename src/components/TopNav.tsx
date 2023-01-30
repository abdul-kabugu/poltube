import {useState} from 'react'
import { Box, Heading, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import {AiOutlineSearch} from 'react-icons/ai'
export default function TopNav() {
    const [searchTxt, setsearchTxt] = useState("")
  return (
   <Box>
      <Box>
          <Heading as="h2">Poltube</Heading>
      </Box>
      <InputGroup>
      <Input value={searchTxt} onChange = {e => setsearchTxt(e.target.value)} 
        placeholder="Search by name or tag " variant="unstyled" border="1px solid red"
      />
      <InputRightElement children = {<AiOutlineSearch />}  />
      </InputGroup>
   </Box>
  )
}
