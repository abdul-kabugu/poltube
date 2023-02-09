// @ts-nocheck
import { Box, Button, Heading, Hide, HStack, Input, Select, Show, Spinner, Text, Textarea } from '@chakra-ui/react'
import {useState, useEffect, useRef, useContext} from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import TextareaAutosize from 'react-textarea-autosize';
import { videoCategories } from '../assets/constant';
import { UploadVideo } from '../components'
import { useCreatePost } from '../Hooks';
import {SubsocialContext} from '../subsocial/provider'
import { logTransaction } from '../subsocial/wallets/polkadotjs';

export default function UploadPage() {
  const { isReady, api, network, changeNetwork } = useContext(SubsocialContext)
    const [selectedVideoFile, setselectedVideoFile] = useState()
     const [videoTitle, setVideoTitle] = useState("")
     const [videoDescribtion, setVideoDescribtion] = useState("")
     const [videoCategory, setVideoCategory] = useState()
      const [videoThumbnail, setVideoThumbnail] = useState()
      const [videoThumbnailCID, setVideoThumbnailCID]  = useState("")
      const [isSubsocialAPI, setisSubsocialAPI] = useState(true)
      const [isThumbnailUploadloading, setIsThumbnailUploading] = useState(false)
      const [ isVideoUploading, setIsVideoUploading ] = useState(false)
      const [videoCID, setVideoCID] = useState("")
      const  [isUploadingError, setisUploadingError] = useState(false)
      const [uploadingErrorMessage, setUploadingErrorMessage] = useState("")
      const imageRef = useRef(null)
    
     const handleSelectFile = () =>  {
      imageRef.current.click()
     }
      const {createPost, isCreatingPost, isCreatingPostError, isPostCreated} = useCreatePost()
      const handleCreatePost = async () =>  {
        //UPLOAD_THUMBNAIL
        if(api){

            
          setIsThumbnailUploading(true)
          const imgCID = await api.ipfs.saveFile(videoThumbnail)
          setVideoThumbnailCID(imgCID)
        console.log("Image cid", imgCID)
        setIsThumbnailUploading(false)
           /* } catch (error) {
               setisUploadingError(true)  
               setUploadingErrorMessage(error)
               console.log("the error", error)
            }*/
        //UPLOAD_VIDEO
          
        setIsVideoUploading(true)
        const videoCID = await api.ipfs.saveFile(selectedVideoFile)
          setVideoCID(videoCID)
          setIsVideoUploading(false)
          console.log("video cid", videoCID)
          
        /*}catch (error) {
          setisUploadingError(true)  
          setUploadingErrorMessage(error)
          console.log("the error", error)
          alert("something went wrong :", error)
       }*/
         //CREATE_POSTS
       await createPost(videoTitle, imgCID,  videoCategory, videoCID)
      }

       

        
      }
      const handleConsole = () =>  {
          console.log("hellow  world")
      }
      const getCurrentButton = () =>  {
        if(isThumbnailUploadloading){
          return(
            <Button leftIcon={<Spinner  size='sm' />} disabled={isThumbnailUploadloading} bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" px={6} >
               Uploading Thumbnail
            </Button>
          )
        }else if(isVideoUploading){
          return(
            <Button leftIcon={<Spinner  size='sm' />} disabled={isVideoUploading} bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" px={6}  >
               Uploading Video
            </Button>
          )
        }else if(isCreatingPost){
          return(
            <Button leftIcon={<Spinner  size='sm' />} disabled={isVideoUploading} bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" px={6}  >
               Creating Post
            </Button>
          )
        } else {
          return(
            <Button bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" px={6} disabled={!videoTitle || !videoThumbnail || !selectedVideoFile} onClick={handleCreatePost} >
               Submit Video
            </Button>
          )
        }
      }
         

        const handleCancel = () =>  {
          setselectedVideoFile("")
          setVideoThumbnail("")
        }
  return (
    <Box height="auto"  w="100%" >
      <Heading fontSize="3xl" mt={7}> Upload videos</Heading>
        {!selectedVideoFile &&
       <UploadVideo  selectedVideoFile = {selectedVideoFile} setSelectedVideoFile = {setselectedVideoFile} />
        }
        {
          selectedVideoFile && (
             <Box   w="100%" px={3} py={2} mt={5} display='flex' flexDir={{base : "column", lg: "row"}} gap={10}>
                <Box  w={{base : "100%" , lg : "45%"}}>
                  <Box display="flex" flexDir="column" gap={2}>
                   
                     
                     <Text fontWeight="semibold">Title</Text>
                      <Input   value={videoTitle} placeholder="Title" onChange={e => setVideoTitle(e.target.value)} 
                        variant="unstyled" border="1px solid" borderColor="gray.300" py={2} px={4}
                      />
                  </Box>

                  <Box display="flex" flexDir="column" gap={2} mt={3}>
                     <Text fontWeight="semibold">Description</Text>
                       <Textarea
                          value={videoDescribtion}
                           onChange = {e => setVideoDescribtion(e.target.value)}
                            placeholder="Add video  caption"
                            size="lg"
                            resize="none"
                            height={150}
                            border="1px solid" borderColor="gray.300" py={2} px={2} 
                            variant="unstyled"
                       />
                  </Box>

                  <Box display="flex" flexDir="column" gap={2} mt={4}>
                     <Text fontWeight="semibold">Category</Text>
                       <Select placeholder='Select category' value={videoCategory} onChange = {e => setVideoCategory(e.target.value)} variant="unstyled"
                       border="1px solid" borderColor="gray.200"  
                       >
                         {
                          videoCategories.map((item, i) =>  {

                            return(
                              <option key={i} value={item.value}>{item.title} </option>
                            )
                          })
                         }
                       </Select>
                  </Box>
                     <Hide below='lg'>
                    <HStack gap={4} mt={8}>
                     {getCurrentButton()}
                       <Button border="1px solid" borderColor="#7626D1" onClick={handleCancel}>Cancel</Button>
                      
                    </HStack>
                    </Hide>
                </Box>

                <Box   w={{base : "100%", lg: "45%"}}  display="flex" flexDir="column" alignItems="center">
                   <Box>
                <video width="500" controls style={{borderRadius: "10px"}}>
              <source src={URL.createObjectURL(selectedVideoFile)}/>
               </video>
               </Box>

                <Box mt={3}>
                   <Text fontSize="lg" fontWeight="semibold">Thumbnail</Text>
                    <Box w={"100%"} minW="440px" maxW="505px" h={200} border="2px solid" borderColor="gray.300" rounded="lg" zIndex="1" >
                      {! videoThumbnail ?(
                        <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
                      <AiOutlineCloudUpload   size={40}  />
                      <Text mb={4} fontSize="lg" fontWeight="semibold">Upload Video Thumbnail</Text>
                      <Button bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" py={2} px={4}  onClick={handleSelectFile}>Select File</Button>
                    <input ref={imageRef} type="file" name="img" accept="image/*" onChange={e => setVideoThumbnail(e.target.files[0])} hidden/>
                    </Box>) : (
                      <img   src={URL.createObjectURL(videoThumbnail)}  style={{width : "100%", height:"100%", objectFit: "cover", borderRadius : "10px", maxWidth:"500px"}}   />
                    )}
                    </Box>
                </Box>
                </Box>

                <Show below="lg">
                    <HStack gap={4} mt={4} mb={70}>
                      {getCurrentButton()}
                       <Button border="1px solid" borderColor="#7626D1" onClick={handleCancel} >Cancel</Button>
                  
                    </HStack>
                    </Show>
                   
             </Box>
          )
        }
        </Box>
  )
}
