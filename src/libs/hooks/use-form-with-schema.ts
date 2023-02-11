import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';

import type {
  FieldValues,
  UseFormProps as UseHookFormProps,
  FieldNamesMarkedBoolean,
} from 'react-hook-form';
import type { TypeOf, ZodSchema, ZodTypeDef } from 'zod';

type UseFormProps<S extends ZodSchema<any, ZodTypeDef>> = {
  schema: S;
  options?: Omit<UseHookFormProps<TypeOf<S>>, 'resolver'>;
};
/**
 * @param UseFormProps with two properties: schema: Zod schema validations and options: UseFormProps from react-hook-form
 * @returns useForm with zod schema to pass props into <CustomFormProvider /> component
 * @example
 *```tsx
 *  const form = useFormWithSchema({
 *    schema: signInFormSchema,
 *    options: {
 *    ...
 *    }
 *  })
 *  const { register, formState } = form;
 *
 *    <CustomFormProvider form={form} onSubmit={(values)=> {
 *      console.log(values)
 *    }}>
 *       <InputField label="Name" error={formState.errors.name} registration={register('name')} />
 *    </CustomFormProvider>
 *```
 */
export const useFormWithSchema = <S extends ZodSchema<any, ZodTypeDef>>({
  schema,
  options,
}: UseFormProps<S>) => {
  const form = useHookForm({
    mode: 'onSubmit',
    shouldFocusError: true,
    ...options,
    resolver: zodResolver(schema),
  });
  const { formState } = form;
  const { isDirty, dirtyFields } = formState;

  const isDirtyFields = isDirty && Object.values(dirtyFields).length > 0;

  return { ...form, isDirtyFields };
};

/**
 * get fields change
 * @param dirtyFields from formState
 * @param allValues values from hookform after validation
 * @returns partial of values
 */
export function dirtyValues<TFormValues extends FieldValues = FieldValues>(
  dirtyFields: FieldNamesMarkedBoolean<TFormValues>,
  allValues: TFormValues
): Partial<TFormValues> {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [key, dirtyValues(dirtyFields[key], allValues[key])])
  ) as Partial<TFormValues>;
}
