import { Flex, Spinner } from '@chakra-ui/react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { APP_ROUTES_PATHS } from '../app-routes-paths';

import { useCheckAuthentication } from '@/modules/auth/services';

export function PublicRoute({ children }: { children?: JSX.Element }) {
  const location = useLocation();

  const { isLogged, isInitialLoading } = useCheckAuthentication();
  const from = location.state?.from?.pathname || APP_ROUTES_PATHS.CONTACTS;

  if (isInitialLoading) {
    return (
      <Flex
        pos="fixed"
        inset={0}
        h="full"
        w="full"
        alignItems="center"
        justify="center"
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      >
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isLogged) {
    return <Navigate to={from} replace />;
  }

  return children ?? <Outlet />;
}
