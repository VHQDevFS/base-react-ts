import { FormControl, FormErrorMessage, FormLabel, Textarea, forwardRef } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';

import type { FieldWrapperProps } from '../field-wrapper';
import type { TextareaProps } from '@chakra-ui/react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';

export interface CustomTextAreaFloatingLabelProps
  extends Omit<TextareaProps, 'style'>,
    Omit<TextareaAutosizeProps, 'color'>,
    FieldWrapperProps {
  registration?: Partial<UseFormRegisterReturn>;
}

export const CustomTextAreaFloatingLabel = forwardRef<CustomTextAreaFloatingLabelProps, 'textarea'>(
  (props, ref) => {
    const {
      labelProps,
      controlProps,
      errorMessageProps,
      registration,
      error,
      label,
      ...textareaProps
    } = props;

    return (
      <FormControl
        variant="floating"
        isInvalid={!!error}
        isRequired={textareaProps.isRequired}
        {...controlProps}
      >
        <Textarea
          ref={ref}
          size="lg"
          placeholder=" "
          maxLength={255}
          bg="secondary"
          focusBorderColor="primary"
          pb={0}
          pt="30px"
          fontSize="md"
          lineHeight="24px"
          rounded="12px"
          rows={5}
          minH="50px"
          minRows={4}
          as={ResizeTextarea}
          {...textareaProps}
          {...registration}
        />
        <FormLabel fontWeight={400} {...labelProps}>
          {label}
        </FormLabel>
        {!!error && <FormErrorMessage {...errorMessageProps}> {error?.message}</FormErrorMessage>}
      </FormControl>
    );
  }
);
