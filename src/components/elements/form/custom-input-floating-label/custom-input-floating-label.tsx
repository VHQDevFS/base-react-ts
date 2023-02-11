import { FormControl, FormErrorMessage, FormLabel, Input, forwardRef } from '@chakra-ui/react';

import type { FieldWrapperProps } from '../field-wrapper';
import type { InputProps } from '@chakra-ui/react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { YESTERDAY } from '@/configs';
import { formatDate } from '@/libs/helpers';

export interface CustomInputFloatingLabelProps extends InputProps, FieldWrapperProps {
  registration?: Partial<UseFormRegisterReturn>;
}

export const CustomInputFloatingLabel = forwardRef<CustomInputFloatingLabelProps, 'input'>(
  (props, ref) => {
    const {
      labelProps,
      controlProps,
      errorMessageProps,
      registration,
      error,
      label,
      type = 'text',
      ...inputProps
    } = props;

    return (
      <FormControl
        variant="floating"
        isInvalid={!!error}
        isRequired={inputProps.isRequired}
        {...controlProps}
      >
        <Input
          ref={ref}
          type={type}
          size="lg"
          placeholder=" "
          maxLength={255}
          h="61px"
          bg="secondary"
          focusBorderColor="primary"
          pb={0}
          fontSize="md"
          lineHeight="24px"
          rounded="12px"
          max={
            type === 'date' && registration?.name === 'birthday'
              ? formatDate({
                  date: YESTERDAY,
                  format: 'YYYY-MM-DD',
                })
              : undefined
          }
          _disabled={{
            color: 'textColor',
            opacity: 0.8,
            cursor: 'not-allowed',
          }}
          // css={
          //   type === 'date'
          //     ? {
          //         '&::-webkit-calendar-picker-indicator:hover': {
          //           opacity: 0.7,
          //           cursor: 'pointer',
          //           transition: 'all ease .5s',
          //         },
          //         '&::-webkit-calendar-picker-indicator': {
          //           background: `url(${IMAGES.Calender}) center/100% no-repeat`,
          //         },
          //       }
          //     : undefined
          // }
          {...inputProps}
          {...registration}
        />
        <FormLabel fontWeight={400} {...labelProps}>
          {label}
        </FormLabel>
        {!!error && <FormErrorMessage {...errorMessageProps}>{error?.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);
