import {AiOutlineHome, AiOutlineHistory, AiOutlineTwitter} from 'react-icons/ai'
import {BsCollection} from 'react-icons/bs'
import {MdOutlineVideoLibrary, MdOutlinePrivacyTip} from 'react-icons/md'
import {FcAbout} from 'react-icons/fc'
export const navigations = [
    {
      title : "Home",
      to : "/",
      icon : AiOutlineHome
    },
    
    {
        title : "Subscribtions",
        to : "/subscribtions",
        icon : BsCollection
      },

      {
        title : "Library",
        to : "/library",
        icon : MdOutlineVideoLibrary
      },

      {
        title : "History",
        to : "/history",
        icon : AiOutlineHistory
      },
]

export const mobileNavigations = [
  {
    title : "Home",
    to : "/",
    icon : AiOutlineHome
  },

  {
    title : "Library",
    to : "/library",
    icon : MdOutlineVideoLibrary
  },

  {
    title : "History",
    to : "/history",
    icon : AiOutlineHistory
  },
]

export const socialIcons = [
    {
        title : "Twitter",
        to : "twitter",
        icon : AiOutlineTwitter

    },

    {
        title : "About",
        to : "twitter",
        icon : FcAbout,


    },

    
    {
        title : "Privacy",
        to : "privacy",
        icon : MdOutlinePrivacyTip,


    },
]