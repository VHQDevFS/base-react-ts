import type React from 'react';
import { useMemo } from 'react';

import { Box, Icon } from '@chakra-ui/react';
import { Select, chakraComponents } from 'chakra-react-select';
import { Controller } from 'react-hook-form';

import type { MaybeController } from '../types';
import type { FieldWrapperProps } from '@/components/elements';
import type { As } from '@chakra-ui/react';
import type {
  Props as ChakraSelectProps,
  ChakraStylesConfig,
  GroupBase,
  MultiValue,
  OnChangeValue,
  OptionBase,
  SelectComponentsConfig,
  SelectInstance,
  SingleValue,
} from 'chakra-react-select';
import type { FieldValues, Path } from 'react-hook-form';

import { FieldWrapper } from '@/components/elements';

export interface CustomOptionSelectBase extends OptionBase {
  label: string;
  value: string | number;
  onClickOption?: () => void;
  IconOption?: As<any>;
}

export type CustomChakraReactSelectProps<
  TOption extends CustomOptionSelectBase,
  IsMulti extends boolean,
  TFormValues extends FieldValues
> = ChakraSelectProps<TOption, IsMulti, GroupBase<TOption>> &
  React.RefAttributes<SelectInstance<TOption, IsMulti, GroupBase<TOption>>> &
  FieldWrapperProps &
  MaybeController<TFormValues>;

export const CustomChakraReactSelect = <
  TOption extends CustomOptionSelectBase,
  IsMulti extends boolean,
  TFormValues extends FieldValues
>(
  props: CustomChakraReactSelectProps<TOption, IsMulti, TFormValues>
) => {
  const {
    control,
    name,
    labelProps,
    controlProps,
    errorMessageProps,
    label,
    error,
    components,
    chakraStyles,
    ...selectProps
  } = props;

  const customComponents: SelectComponentsConfig<TOption, IsMulti, GroupBase<TOption>> = useMemo(
    () => ({
      Option: ({ children, ...props }) => {
        const { data } = props;
        const { IconOption, onClickOption } = data;
        return (
          <chakraComponents.Option {...props}>
            <Box w="full" display="flex" alignItems="center" justifyContent="space-between">
              {children}
              {IconOption && (
                <Icon
                  as={IconOption}
                  mr={2}
                  boxSize={5}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClickOption && onClickOption();
                  }}
                />
              )}
            </Box>
          </chakraComponents.Option>
        );
      },
      ...components,
    }),
    [components]
  );

  const stylesComponents: ChakraStylesConfig<TOption, IsMulti, GroupBase<TOption>> = useMemo(
    () => ({
      control: (provide) => ({
        ...provide,
        pr: 4,
      }),
      indicatorsContainer: (provide) => ({
        ...provide,
        background: 'none',
        pr: '0',
        borderColor: 'transparent !important',
      }),
      dropdownIndicator: (provide) => ({
        ...provide,
        background: 'none',
        pr: '0',
      }),
      option: (provide, state) => ({
        ...provide,
        backgroundColor: state.isSelected ? 'primary' : 'white',
        _hover: { backgroundColor: 'primary', color: 'white' },
        transition: 'all 0.3s',
      }),

      container: (provide) => ({
        ...provide,
        bg: 'white',
        rounded: 8,
      }),

      ...chakraStyles,
    }),
    [chakraStyles]
  );

  const basePropsSelect: Partial<ChakraSelectProps<TOption, IsMulti, GroupBase<TOption>>> = {
    size: 'lg',
    menuPosition: 'fixed',
    closeMenuOnSelect: true,
    components: customComponents,
    chakraStyles: stylesComponents,
    focusBorderColor: 'primary',
    autoFocus: false,
  };

  return (
    <>
      {control && name ? (
        <Controller
          control={control}
          name={name as Path<TFormValues>}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <FieldWrapper
              labelProps={labelProps}
              controlProps={{ ...controlProps, isRequired: selectProps.isRequired }}
              errorMessageProps={errorMessageProps}
              error={error}
              label={label}
            >
              <Select
                ref={ref}
                name={(field.name as string) || name}
                {...basePropsSelect}
                onChange={(option: OnChangeValue<TOption, IsMulti>) => {
                  if (!option) return undefined;

                  const multipleOption = option as MultiValue<TOption>;

                  if (Array.isArray(multipleOption)) {
                    return field.onChange(multipleOption.map((opt) => opt.value));
                  }

                  const singleOption = option as SingleValue<TOption>;

                  if (!singleOption?.value) return undefined;

                  return field.onChange(singleOption.value);
                }}
                {...selectProps}
              />
            </FieldWrapper>
          )}
        />
      ) : (
        <FieldWrapper
          labelProps={labelProps}
          controlProps={{ ...controlProps, isRequired: selectProps.isRequired }}
          errorMessageProps={errorMessageProps}
          error={error}
          label={label}
        >
          <Select name={name as string} {...basePropsSelect} {...selectProps} />
        </FieldWrapper>
      )}
    </>
  );
};
