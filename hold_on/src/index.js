import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

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
    <ColorModeScript />
    <ChakraProvider theme={theme}>

      <App /> 
    </ChakraProvider>

  </StrictMode>
);
