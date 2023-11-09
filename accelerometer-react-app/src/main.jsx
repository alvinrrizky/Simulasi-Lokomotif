import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={window.__REACT_QUERY_INITIAL_DATA__}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  </React.StrictMode>
);
