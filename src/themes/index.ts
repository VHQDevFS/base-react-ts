import { extendTheme, theme } from '@chakra-ui/react';

import Button from './components/button';
import Checkbox from './components/checkbox';
import Heading from './components/heading';
import borderRadius from './foundations/border-radius';
import breakpoints from './foundations/breakpoints';
import colors from './foundations/colors';
import fontSizes from './foundations/fontsizes';
import letterSpacings from './foundations/letter-spacing';
import lineHeights from './foundations/line-heights';
import sizes from './foundations/sizes';
import spacing from './foundations/spacing';

import type { ThemeOverride } from '@chakra-ui/react';

const activeLabelStyles = {
  transform: 'scale(0.85) translateY(-12px)',
  color: colors.primary,
};
const customTheme: ThemeOverride = {
  colors,
  sizes,
  space: spacing,
  radii: borderRadius,
  breakpoints,
  fontSizes,
  lineHeights,
  letterSpacings,

  styles: {
    html: {
      scrollBehavior: 'smooth',
    },
    global: {
      boxSizing: 'border-box',
      '&::-webkit-scrollbar': {
        w: '6px',
      },
      '&::-webkit-scrollbar-thumb': {
        bg: '#878d8d78',
        rounded: '3px',
      },

      '&::-webkit-scrollbar-thumb:window-inactive': {
        bg: '#878d8d78',
      },
    },
    body: {
      overflow: 'hidden',
      color: colors.textColor,
      fontFamily: "'Montserrat', sans-serif",
    },
  },
  shadows: {
    card: '0px 11px 13px -5px rgb(0 0 0 / 15%)',
    button: '0px 8px 16px rgba(0, 0, 0, 0.149)',
  },

  fonts: {
    heading: "'Montserrat', sans-serif !important",
    body: "'Montserrat', sans-serif !important",
  },
  config: {
    useSystemColorMode: false,
    cssVarPrefix: 'css',
    initialColorMode: 'light',
  },

  components: {
    Button,
    Heading,
    Checkbox,
    Input: {
      sizes: {
        lg: {
          field: {
            h: '53px',
          },
        },
      },
      variants: {
        outline: (props) => ({
          field: {
            ...theme.components.Input.variants?.outline(props).field,
            border: '1px',
            borderColor: colors.neutral[200],
            w: 'full',
            color: 'black',
            p: 4,
            pr: 8,
            fontSize: '14px',
            lineHeight: '21px',
            rounded: '8px',
            fontWeight: 400,
            _placeholder: {
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '21px',
              color: colors.grayColor,
            },
            _disabled: {
              bg: '#EBEBEB',
              border: 'none',
              _focus: {},
              color: colors.textColor,
              opacity: 1,
            },
          },
        }),
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label':
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: 'absolute',
              pointerEvents: 'none',
              mx: 3,
              px: 1,
              mt: '18px',
              transformOrigin: 'left top',
            },
          },
        },
      },
    },

    PinInput: {
      sizes: {
        md: {
          w: '50px',
          h: '50px',
          fontSize: '25px',
          fontWeight: 500,
          rounded: '12px',
        },
        lg: {
          w: '80px',
          h: '86px',
          fontSize: '30px',
          fontWeight: 500,
          rounded: '12px',
        },
      },
      defaultProps: {
        focusBorderColor: colors.primary,
        manageFocus: true,
      },
    },
    Text: {
      baseStyle: {
        fontSize: '14px',
        lineHeight: '21px',
        fontWeight: 400,
        color: colors.textColor,
      },
    },
    Table: {
      sizes: {
        md: {
          td: {
            p: '23px',
          },
        },
      },
    },
    Modal: {
      sizes: {
        dialog: {
          md: {
            maxW: '552px',
          },
        },
      },
    },
    Spinner: {
      baseStyle: {
        color: colors.primary,
      },
    },
    Skeleton: {
      baseStyle: {
        h: '10px',
        color: 'gray.200',
        rounded: '4px',
      },
    },
    Switch: {
      baseStyle: {
        container: {
          w: '40px',
          h: '24px',
        },
        track: {
          _checked: {
            bg: colors.primary,
          },
          bg: colors.neutral[300],
        },
      },
    },
    MenuButton: {
      baseStyle: {
        color: colors.primary,
        bg: 'white',
      },
    },
    Radio: {
      baseStyle: {
        control: {
          bg: 'primary',
        },
      },
    },
  },
};

export default extendTheme(customTheme);
