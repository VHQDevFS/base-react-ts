import { Box } from '@chakra-ui/react';
import { createBrowserRouter } from 'react-router-dom';

import { authRoutes } from './elements';
import { ProtectedRoute } from './elements/protected-route';

import { lazyImport } from '@/libs/utils';

const { LayoutApp } = lazyImport(() => import('@/components/layouts'), 'LayoutApp');
const { ErrorPage } = lazyImport(() => import('./elements'), 'ErrorPage');

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: (
      <ProtectedRoute>
        <LayoutApp />
      </ProtectedRoute>
    ),
    children: [{ index: true, element: <Box>Dashboard</Box> }],
  },
  authRoutes(),
]);
