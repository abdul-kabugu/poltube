// @ts-nocheck
import {encodeAddress, isEthereumAddress} from '@polkadot/util-crypto'

export const convertAddressToChainFormat  = (address, ss58Format) => {
    if (!address || ss58Format === undefined || isEthereumAddress(address)) return
    return encodeAddress(address.toString(), ss58Format)
}

 // Store the user's video history in local storage
 export const saveToLibrary = (video) => {
  let history = JSON.parse(localStorage.getItem('poltubeUserHistory_v2')) || [];
   console.log("the clicked video", video)
  //history.push(video);
   // Check if the video is already in the history
   /*const videoExists = history.some(v => v.id === video.video.id);
     if (!videoExists) {
     history.push(video);

   }*/

   const videoExists = history.some(v => JSON.stringify(v) === JSON.stringify(video));
if (!videoExists) {
  history.push(video);
}

   

     
     localStorage.setItem('poltubeUserHistory_v2', JSON.stringify(history));
};