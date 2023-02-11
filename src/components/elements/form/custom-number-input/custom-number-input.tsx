import {
  forwardRef,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import { Controller } from 'react-hook-form';

import { FieldWrapper } from '../field-wrapper';

import type { FieldWrapperProps } from '../field-wrapper';
import type { MaybeController } from '../types';
import type {
  NumberDecrementStepperProps,
  NumberIncrementStepperProps,
  NumberInputFieldProps,
  NumberInputProps,
  NumberInputStepperProps,
} from '@chakra-ui/react';
import type { FieldValues, Path } from 'react-hook-form';

export type CustomNumberInputProps<TFormValues extends FieldValues> = NumberInputProps &
  FieldWrapperProps &
  MaybeController<TFormValues> & {
    numberInputFieldProps?: NumberInputFieldProps;
    numberInputStepperProps?: NumberInputStepperProps;
    numberIncrementStepperProps?: NumberIncrementStepperProps;
    numberDecrementStepperProps?: NumberDecrementStepperProps;
  };

export const CustomNumberInput = forwardRef(
  <TFormValues extends FieldValues>(
    {
      numberInputFieldProps,
      numberInputStepperProps,
      numberIncrementStepperProps,
      numberDecrementStepperProps,
      controlProps,
      labelProps,
      errorMessageProps,
      label,
      error,
      control,
      name,
      ...numberInputProps
    }: CustomNumberInputProps<TFormValues>,
    ref: React.Ref<HTMLInputElement>
  ) =>
    control && name ? (
      <Controller
        control={control}
        name={name as Path<TFormValues>}
        render={({ field, fieldState: { error } }) => (
          <FieldWrapper
            labelProps={labelProps}
            controlProps={{ ...controlProps, isRequired: numberInputProps.isRequired }}
            errorMessageProps={errorMessageProps}
            error={error}
            label={label}
          >
            <NumberInput
              size="lg"
              onChange={(value) => (Number(value) ? field.onChange(Number(value)) : undefined)}
              {...numberInputProps}
            >
              <NumberInputField
                ref={field.ref}
                _placeholder={{ fontSize: 'sm' }}
                name={field.name}
                {...numberInputFieldProps}
              />
              <NumberInputStepper {...numberInputStepperProps}>
                <NumberIncrementStepper {...numberIncrementStepperProps} />
                <NumberDecrementStepper {...numberDecrementStepperProps} />
              </NumberInputStepper>
            </NumberInput>
          </FieldWrapper>
        )}
      />
    ) : (
      <FieldWrapper
        labelProps={labelProps}
        controlProps={{ ...controlProps, isRequired: numberInputProps.isRequired }}
        errorMessageProps={errorMessageProps}
        error={error}
        label={label}
      >
        <NumberInput size="lg" {...numberInputProps}>
          <NumberInputField
            ref={ref}
            name={name}
            _placeholder={{ fontSize: 'sm' }}
            {...numberInputFieldProps}
          />
          <NumberInputStepper {...numberInputStepperProps}>
            <NumberIncrementStepper {...numberIncrementStepperProps} />
            <NumberDecrementStepper {...numberDecrementStepperProps} />
          </NumberInputStepper>
        </NumberInput>
      </FieldWrapper>
    )
);
