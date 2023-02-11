import type React from 'react';

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Select,
  Stack,
} from '@chakra-ui/react';

import type {
  FormControlProps,
  FormErrorMessageProps,
  FormLabelProps,
  SelectProps,
} from '@chakra-ui/react';
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';

interface IOption {
  label: string;
  value: string | number;
}

interface CustomSelectProps extends SelectProps {
  controlProps?: FormControlProps;
  labelProps?: FormLabelProps;
  errorMessageProps?: FormErrorMessageProps;

  registration?: Partial<UseFormRegisterReturn>;
  error?: FieldError;

  options: IOption[];

  label?: React.ReactNode;
}
export const CustomSelect = forwardRef<CustomSelectProps, 'select'>((props, ref) => {
  const {
    controlProps,
    errorMessageProps,
    labelProps,
    registration,
    error,
    options,
    label,
    ...selectFieldProps
  } = props;

  const isError = !!error;

  return (
    <FormControl isInvalid={isError} isRequired={selectFieldProps.isRequired} {...controlProps}>
      <Stack direction="column" spacing={0}>
        {label && (
          <FormLabel
            color="secondary"
            opacity={0.75}
            fontSize="15px"
            lineHeight="20px"
            fontWeight={600}
            {...labelProps}
          >
            {label}
          </FormLabel>
        )}
        <Select
          ref={ref}
          size="lg"
          bg="neutral.600"
          border="none"
          color="secondary"
          _focusVisible={{
            boxShadow: '0 0 0 1px #597be9',
          }}
          _placeholder={{
            color: 'border.inner',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '22px',
          }}
          fontSize="sm"
          lineHeight="22px"
          fontWeight={600}
          _disabled={{
            bg: 'textColor',
            border: 'none',
            _focus: {},
            color: 'neutral.300',
            cursor: 'not-allowed',
            opacity: 0.8,
          }}
          {...selectFieldProps}
          {...registration}
        >
          {options.map((opt) => (
            <Box key={opt.value} as="option" color="textColor" value={opt.value}>
              {opt.label}
            </Box>
          ))}
        </Select>
      </Stack>

      {isError && <FormErrorMessage {...errorMessageProps}>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
});
