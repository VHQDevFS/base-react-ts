import { useCallback, useMemo, useState } from 'react';

import { Box, Flex, Stack } from '@chakra-ui/react';
import { Outlet, useOutletContext } from 'react-router-dom';

interface IValueForgotPassword {
  email: string;
  codeVerify: string;
}

export type TOutletContextForgotPassword = [
  IValueForgotPassword,
  (value: Partial<IValueForgotPassword>) => void
];

export const useOutletForgotPasswordContext = () => {
  const context = useOutletContext<TOutletContextForgotPassword>();

  if (!context) throw new Error('Context must be inside <Outlet/>');

  return context;
};

export function LayoutAuth() {
  const [value, setValue] = useState<IValueForgotPassword>({
    codeVerify: '',
    email: '',
  });

  const memoSetValue = useCallback(
    (newValues: Partial<IValueForgotPassword>) => setValue((prev) => ({ ...prev, ...newValues })),
    [setValue]
  );

  const contextValue = useMemo(() => [value, memoSetValue], [value, memoSetValue]);

  return (
    <Box w="full" h="100vh">
      <Stack direction="row" w="full" height="full" justify="center" align="center" spacing={0}>
        <Flex
          flex={1}
          direction="column"
          w={{ base: 'full', lg: 'auto' }}
          justify="center"
          align="center"
          maxH="100%"
          overflow="hidden"
        >
          <Outlet context={contextValue} />
        </Flex>
      </Stack>
    </Box>
  );
}
