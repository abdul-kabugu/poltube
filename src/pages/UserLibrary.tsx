// @ts-nocheck
import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { PostCard } from '../components';
import LibPostCard from '../components/LibPostCard';

export default function UserLibrary() {
  const userLibrary  =  JSON.parse(localStorage.getItem('poltubeUserHistory_v2')) || [];
    console.log("the user library  is  here", userLibrary)
  return (
<Box alignSelf="start"  w="100%" display="flex" flexWrap="wrap" gap={4} py={3} px={2} mb={{base : 70, md: 0}} alignItems={{base : "center", md : "start"}} justifyContent={{base : "center", md: "start"}}>
    {userLibrary?.map((item, i) =>  {

      return(
        <LibPostCard key={i} video = {item}  />
      )
    })}
</Box>
  )
}
