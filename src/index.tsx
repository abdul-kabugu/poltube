import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SubsocialContextProvider } from './subsocial/provider'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom"
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
    <SubsocialContextProvider>
      <App />
    </SubsocialContextProvider>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
