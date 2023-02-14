// @ts-nocheck
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import {useRef} from 'react'
import {AiOutlineUpload, AiOutlineCloudUpload} from 'react-icons/ai'
export default function UploadVideo({ selectedVideoFile, setSelectedVideoFile}) {
     const videoRef = useRef(null)

      const handleSelectFile = () =>  {
        videoRef.current.click()
      }
  return (
    <Box display="flex" flexDir="column" gap={5} px={3} >
       
        <Box w="90%" height="70vh"  mx="auto"
         display="flex" flexDir="column" alignItems="center" justifyContent="center"
        >
            <AiOutlineCloudUpload size={60}   />
            <Heading fontSize="xl" mt={4} mb={2}>Drag and drop video files to upload</Heading> 
            <Text mb={4}>Your video will be private until you publish them.</Text>
            <input ref={videoRef} type="file" name="img" accept="video/*" onChange={e => setSelectedVideoFile(e.target.files[0])} hidden/>
             <Button bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" py={3} px={6} mb={6} onClick={handleSelectFile}>Select File</Button>
              <Text fontSize="sm">Max. File Size Supports 15 MB</Text>
        </Box>
    </Box>
  )
}
