// @ts-nocheck
import { Box, Button, HStack, Input, Spacer, Text } from '@chakra-ui/react'
import {useState, useEffect, useContext} from 'react'
import { useDonate, useTruncateText } from '../Hooks'
import { SubsocialContext } from "../subsocial/provider"
import polkadotjs from "../subsocial/wallets/polkadotjs";
import {decodeAddress as SS58} from '@polkadot/util-crypto'
export default function TipUser({video}) {
  const {shortenTxt} = useTruncateText()
  const [amount, setamount] = useState("")
  const [balance, setBalance] = useState(null);
  console.log("the post from tip component", video)
  const [isDonating, setisDonating] = useState(false)
  const {api, isReady} = useContext(SubsocialContext)
  const CONNECTED_USER_DETAILS = JSON.parse(localStorage.getItem('poltubeUserDetails'));
  const currentConnectedUser = CONNECTED_USER_DETAILS?.address
  // const {donate, isDonating, getBalance} = useDonate()

  const donate = async () => {
    const ss58Address = SS58(video?.postById?.createdByAccount?.id, 42);
    console.log("the decoded address", ss58Address)
  const substrateApi = await api!.blockchain.api
   const transfer = substrateApi.tx.balances.transfer(ss58Address, amount);
     // Sign and Send the transaction
await polkadotjs.signAndSendTx(transfer, CONNECTED_USER_DETAILS?.address)
console.log("the space tx", transfer)
     
  }

   
  return (
    <Box>
        <Box display="flex" flexDir="column" gap={2}>
          <Text>Amount</Text>
          <Input  value={amount} onChange={e => setamount(e.target.value)} 
            variant="unstyled"
            px={3}
            py={2}
            border="1px solid"
            borderColor="gray.400"
            placeholder='10 SUB'
          />
        </Box>

         <Button bgGradient="linear(to-r, #7626D1, #BB2694 )" _hover={{bg : "#7626D1"}} color="white" fontWeight="semibold" px={6} w="100%" mt={4} onClick={() => donate()}>{isDonating ? "Sending Sub.." : "Send Sub"} </Button>

          <Spacer   />
            <Box display="flex" alignItems="center" justifyContent="center" gap={1} flexDir="column" mt={3}>
              <Text fontWeight="semibold">NOTE: On send  Token Will be  Sent  Directly To</Text>
               <Text fontSize="sm" color="pink.400">{shortenTxt(video?.postById?.createdByAccount?.id, 17)}</Text>
            </Box>
    </Box>
  )
}
