import { theme } from '@chakra-ui/react';

import colors from '../foundations/colors';

import type { ComponentStyleConfig } from '@chakra-ui/react';

const Button: ComponentStyleConfig = {
  baseStyle: {
    fontSize: 'md',
    fontWeight: 500,
  },

  sizes: {
    lg: {
      fontSize: 'md',
      p: '19px',
      h: '60px',
      rounded: '12px',
    },
    md: {
      fontSize: 'sm',
      h: '46px',
      p: '16px',
      rounded: '10px',
    },
  },
  variants: {
    solid: () => ({
      bg: colors.primary,
      fontSize: 'md',
      color: 'white',
      fontWeight: 400,

      _hover: {
        opacity: 0.8,
        color: 'white',
        bg: colors.primary,
        _disabled: {
          bg: colors.neutral[300],
        },
      },
      _loading: {
        opacity: 0.5,
        _hover: {
          bg: colors.primary,
          color: 'white',
        },
      },
    }),
    ghost: {
      fontWeight: 500,
      fontSize: 'md',
      lineHeight: '24px',
      color: colors.white,
      bg: 'rgba(70, 70, 73, 0.15)',
      transition: 'color 0.1s linear',
      opacity: 1,

      _hover: {
        opacity: 0.8,
        color: colors.primary,
        bg: 'rgba(70, 70, 73, 0.15)',
        _disabled: {
          bg: 'rgba(70, 70, 73, 0.15)',
          _hover: { opacity: 1, color: colors.white },
        },
      },
      _active: {
        opacity: 1,
      },
      _focusVisible: {
        opacity: 1,
      },
      _disabled: {
        opacity: 1,
      },
    },
    noBackground: {
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: 400,
      bg: colors.white,
      paddingLeft: 0,
      color: colors.action.green,
      _hover: {
        backgroundColor: colors.white,
        color: colors.action.green,
      },
    },
    white: {
      fontWeight: 500,
      fontSize: 'md',
      lineHeight: '24px',
      color: colors.neutral,
      bg: 'white',
      transition: 'color 0.05s linear',
      _hover: {
        opacity: 0.8,
        color: colors.primary,
        bg: 'white',
      },
      _active: {
        opacity: 1,
      },
      _focusVisible: {
        opacity: 1,
      },
    },
    primaryBlue: (props) => ({
      ...theme.components.Button.variants?.solid(props),
      bg: colors.primaryBlue,
      fontSize: 'md',
      lineHeight: '21px',
      color: 'white',
      rounded: '8px',
      fontWeight: 600,
      _hover: {
        opacity: 0.8,
        color: 'white',
        bg: colors.primaryBlue,
        _disabled: {
          bg: colors.neutral[300],
        },
      },
      _loading: {
        opacity: 0.5,
        _hover: {
          bg: colors.primaryBlue,
          color: 'white',
        },
      },
    }),
  },
};
export default Button;
