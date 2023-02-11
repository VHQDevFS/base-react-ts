import { Box, Stack } from '@chakra-ui/react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

export function LayoutApp() {
  return (
    <>
      <Stack spacing={0} direction="row" bg="secondary">
        <Box
          w="full"
          h="full"
          overflowX="hidden"
          maxH="100vh"
          bg="secondary"
          overflow="auto"
          // maxW={`${maxW}px`}
          flexGrow={1}
        >
          <Outlet />
        </Box>
      </Stack>
      <ScrollRestoration />
    </>
  );
}
