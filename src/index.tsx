import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { SubsocialContextProvider } from './subsocial/provider'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom"
import { client } from './graphql/apolloClient'
import {ApolloProvider} from '@apollo/client'
import {IntlProvider} from 'react-intl'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
    <SubsocialContextProvider>
      <ApolloProvider client={client}>
        <IntlProvider locale='en'>
      <App />
      </IntlProvider>
      </ApolloProvider>
    </SubsocialContextProvider>
    </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
