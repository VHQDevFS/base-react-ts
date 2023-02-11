import { Link as UIChakraLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import type { LinkProps as UIChakraLinkProps } from '@chakra-ui/react';
import type { LinkProps as RouterLinkProps } from 'react-router-dom';

type CustomLinkProps = UIChakraLinkProps & Omit<RouterLinkProps, 'style'>;

export function CustomLink({ children, to = '#', ...restProps }: CustomLinkProps) {
  return (
    <UIChakraLink
      as={Link}
      to={to}
      _hover={{
        color: 'primary',
        textDecor: 'underline',
      }}
      transition="all 1s ease"
      {...restProps}
    >
      {children}
    </UIChakraLink>
  );
}
