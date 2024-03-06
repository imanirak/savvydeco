import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clf8qr9qd0amx01ur7qrmdk26/master",
  cache: new InMemoryCache()
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const colors = {
  Savvybrown:{
    0:'#FFF8EC'
  }
}

const theme = extendTheme({colors})

root.render(
  <StrictMode>
    {/* <ApolloProvider client={client}> */}
    <ColorModeScript />
    <ChakraProvider theme={theme}>

      <App /> 
    </ChakraProvider>


  </StrictMode>
);
