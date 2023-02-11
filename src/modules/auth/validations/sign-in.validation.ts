import { z } from 'zod';

import type { TypeOf } from 'zod';

import { getEmailField, getPasswordField } from '@/validations';

export const signInFormSchema = z.object({
  email: getEmailField(),
  password: getPasswordField(),
  token: z.string().optional(),
});

export type SignInFormType = TypeOf<typeof signInFormSchema>;
