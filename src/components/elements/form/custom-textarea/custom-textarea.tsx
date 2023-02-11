import { InputGroup, InputLeftElement, Textarea, forwardRef } from '@chakra-ui/react';
import ResizeTextarea from 'react-textarea-autosize';

import { FieldWrapper } from '../field-wrapper';

import type { FieldWrapperProps } from '../field-wrapper';
import type { TextareaProps } from '@chakra-ui/react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { TextareaAutosizeProps } from 'react-textarea-autosize';

interface CustomTextAreaProps
  extends Omit<TextareaProps, 'style'>,
    Omit<TextareaAutosizeProps, 'color'>,
    FieldWrapperProps {
  registration?: Partial<UseFormRegisterReturn>;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
}
export const CustomTextArea = forwardRef<CustomTextAreaProps, 'textarea'>((props, ref) => {
  const {
    labelProps,
    controlProps,
    errorMessageProps,
    registration,
    error,
    label,
    leftIcon,
    ...textAreaProps
  } = props;

  return (
    <FieldWrapper
      labelProps={labelProps}
      controlProps={{ ...controlProps, isRequired: textAreaProps.isRequired }}
      errorMessageProps={errorMessageProps}
      error={error}
      label={label}
    >
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none" alignSelf="center" display="flex" pt="5px">
            {leftIcon}
          </InputLeftElement>
        )}
        <Textarea
          ref={ref}
          as={ResizeTextarea}
          size="lg"
          w="full"
          py="13px"
          px="16px"
          fontSize="md"
          lineHeight="22px"
          fontWeight={400}
          color="textColor"
          _placeholder={{
            color: 'border.inner',
            fontWeight: '400',
            fontSize: '14px',
            lineHeight: '19px',
          }}
          _focus={{
            borderColor: 'primary',
          }}
          _disabled={{ bg: '#EBEBEB', border: 'none', _focus: {}, color: 'neutral.300' }}
          {...textAreaProps}
          {...registration}
        />
      </InputGroup>
    </FieldWrapper>
  );
});
