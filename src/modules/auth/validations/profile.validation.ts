import { z } from 'zod';

import type { TypeOf } from 'zod';

import { getEmailField, getStringRequiredField } from '@/validations';

export const profileFormSchema = z
  .object({
    avatar: z.instanceof(File, { message: 'File is invalid' }).or(z.string()).nullable().optional(),
    email: getEmailField(),
    first_name: getStringRequiredField('First name').max(100, 'First name maximum 100 characters'),
    last_name: getStringRequiredField('Last name').max(100, 'Last name maximum 100 characters'),
  })
  .partial();

export type ProfileFormType = TypeOf<typeof profileFormSchema>;
