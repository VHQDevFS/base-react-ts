import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

import type { FormControlProps, FormErrorMessageProps, FormLabelProps } from '@chakra-ui/react';
import type { FieldError } from 'react-hook-form';

export interface FieldWrapperProps {
  controlProps?: FormControlProps;
  labelProps?: FormLabelProps;
  errorMessageProps?: FormErrorMessageProps;

  label?: React.ReactNode;
  error?: FieldError;

  children?: React.ReactNode;
}

export function FieldWrapper({
  controlProps,
  errorMessageProps,
  labelProps,
  label,
  error,
  children,
}: FieldWrapperProps) {
  return (
    <FormControl isInvalid={!!error} {...controlProps}>
      {label && (
        <FormLabel
          color="black"
          opacity={0.75}
          fontSize="md"
          lineHeight="18px"
          fontWeight={500}
          {...labelProps}
        >
          {label}
        </FormLabel>
      )}

      {children}

      {!!error && <FormErrorMessage {...errorMessageProps}>{error?.message}</FormErrorMessage>}
    </FormControl>
  );
}
