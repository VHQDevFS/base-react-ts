import { Suspense, useState } from 'react';

import { ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import themes from './themes';

import { GlobalLoading } from '@/components/elements';
import { AlertDialogProvider, GlobalLoadingProvider } from '@/contexts';
import { queryClientOptions } from '@/libs/react-query';
import { router } from '@/routes/';

const App = () => {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ChakraProvider theme={themes}>
          <Suspense
            fallback={
              <Flex
                pos="fixed"
                inset={0}
                h="full"
                w="full"
                align="center"
                justify="center"
                bg="blackAlpha.300"
                backdropFilter="blur(10px) hue-rotate(90deg)"
              >
                <Spinner size="xl" />
              </Flex>
            }
          >
            <GlobalLoadingProvider>
              <AlertDialogProvider>
                <RouterProvider
                  router={router}
                  fallbackElement={
                    <Flex
                      pos="fixed"
                      inset={0}
                      h="full"
                      w="full"
                      align="center"
                      justify="center"
                      bg="blackAlpha.300"
                      backdropFilter="blur(10px) hue-rotate(90deg)"
                    >
                      <Spinner size="xl" />
                    </Flex>
                  }
                />
              </AlertDialogProvider>
              <GlobalLoading />
            </GlobalLoadingProvider>

            <Toaster />
          </Suspense>
        </ChakraProvider>
      </HelmetProvider>
      <ReactQueryDevtools
        initialIsOpen={false}
        panelProps={{ style: { minHeight: 250 } }}
        position="bottom-right"
        closeButtonProps={{
          style: {
            right: 0,
            left: 'unset',
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
