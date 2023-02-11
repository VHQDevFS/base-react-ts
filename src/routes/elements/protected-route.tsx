import { Flex, Spinner } from '@chakra-ui/react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useCheckAuthentication } from '@/modules/auth/services';

type ProtectedRouteType = {
  children?: JSX.Element;
};

export function ProtectedRoute({ children }: ProtectedRouteType) {
  const { isLogged, isInitialLoading } = useCheckAuthentication();

  const location = useLocation();

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

  if (!isLogged) {
    return <Navigate state={{ from: location }} to="/auth" replace />;
  }

  return children ?? <Outlet />;
}
