import React from 'react';

import {
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  forwardRef,
} from '@chakra-ui/react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import { FieldWrapper } from '../field-wrapper';

import type { FieldWrapperProps } from '../field-wrapper';
import type { InputProps } from '@chakra-ui/react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { YESTERDAY } from '@/configs';
import { formatDate } from '@/libs/helpers';

export interface CustomInputProps extends InputProps, FieldWrapperProps {
  registration?: Partial<UseFormRegisterReturn>;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  inputLeftAddon?: string;
  onClickRightIcon?: () => void;
}

export const CustomInput = forwardRef<CustomInputProps, 'input'>((props, ref) => {
  const {
    labelProps,
    controlProps,
    errorMessageProps,
    registration,
    error,
    label,
    inputLeftAddon = '',
    leftIcon,
    rightIcon,
    onClickRightIcon,
    type = 'text',
    ...inputProps
  } = props;

  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  function renderType() {
    if (type === 'password' && show) {
      return 'text';
    }

    return type;
  }

  return (
    <FieldWrapper
      labelProps={labelProps}
      controlProps={{ ...controlProps, isRequired: inputProps.isRequired }}
      errorMessageProps={errorMessageProps}
      error={error}
      label={label}
    >
      <InputGroup>
        {inputLeftAddon && (
          <InputLeftAddon h="53px" w="70px" border="none" bg="transparent">
            {inputLeftAddon}
          </InputLeftAddon>
        )}
        {leftIcon && (
          <InputLeftElement pointerEvents="none" alignSelf="center" display="flex">
            {leftIcon}
          </InputLeftElement>
        )}
        <Input
          ref={ref}
          type={renderType()}
          size="lg"
          focusBorderColor="primary"
          maxLength={255}
          max={
            type === 'date' && registration?.name === 'birthday'
              ? formatDate({
                  date: YESTERDAY,
                  format: 'YYYY-MM-DD',
                })
              : undefined
          }
          css={
            type === 'date' || type === 'time'
              ? {
                  '&::-webkit-calendar-picker-indicator:hover': {
                    opacity: 0.7,
                    cursor: 'pointer',
                    transition: 'all ease .5s',
                  },
                }
              : undefined
          }
          _disabled={{
            opacity: 0.8,
            color: 'neutral.300',
            cursor: 'not-allowed',
          }}
          {...inputProps}
          {...registration}
        />
        {rightIcon && (
          <InputRightElement
            width="50px"
            h="full"
            cursor="pointer"
            color="black"
            zIndex={2}
            onClick={() => {
              onClickRightIcon && onClickRightIcon();
            }}
          >
            {rightIcon}
          </InputRightElement>
        )}
        {type === 'password' && (
          <InputRightElement width="24px" h="full" pr="20px" cursor="pointer">
            <Icon onClick={handleClick}>{show ? <AiFillEyeInvisible /> : <AiFillEye />}</Icon>
          </InputRightElement>
        )}
      </InputGroup>
    </FieldWrapper>
  );
});
