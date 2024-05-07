import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import router from './utils/router.tsx';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster visibleToasts={1} position='bottom-right' />
    </QueryClientProvider>
  </React.StrictMode>
);
