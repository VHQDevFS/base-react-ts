import colors from '../foundations/colors';

import type { ComponentStyleConfig } from '@chakra-ui/react';

const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      zIndex: 1,

      border: 'none',
      bg: colors.secondary,
      _checked: {
        bg: colors.primary,
        border: 'none',
      },
      _indeterminate: {
        bg: colors.primary,
      },
    },
  },

  variants: {
    normal: {
      control: {
        bg: 'white',
      },
    },
    withBorder: {
      control: {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: colors.primary,
        bg: 'white',
        rounded: '4px',
      },
    },
  },
};
export default Checkbox;
