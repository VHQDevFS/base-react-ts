import { Box } from '@chakra-ui/react';

interface AuthWidgetProps {
  title?: string;
  description?: string;

  children?: React.ReactNode;
}

export function AuthWidget({ description, title, children }: AuthWidgetProps) {
  return (
    <Box
      w="full"
      minH="40vh"
      py={10}
      px={{ sm: '7%', xl: '10%' }}
      h="100%"
      overflowY="auto"
      pos="relative"
    >
      <Box w="full">
        <Box
          as="h1"
          fontSize={{ base: '40px', xl: '48px' }}
          lineHeight={{ base: '55px', '2xl': '72px' }}
          color="black"
          fontWeight={500}
        >
          {title}
        </Box>
        <Box
          as="p"
          fontSize="md"
          lineHeight="24px"
          color="neutral.500"
          mt={2}
          mb={{ base: 4, xl: 8 }}
        >
          {description}
        </Box>
        {children}
      </Box>
    </Box>
  );
}
