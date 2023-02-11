import { z } from 'zod';

import type { TypeOf } from 'zod';

import { getEmailField, getPasswordField, getStringRequiredField } from '@/validations';

export const resetPasswordFormSchema = z
  .object({
    email: getEmailField(),
    reset_password_token: getStringRequiredField(),
    password: getPasswordField('New password'),
    password_confirmation: getPasswordField('Confirm password'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password don't match",
    path: ['password_confirmation'],
  });

export type ResetPasswordFormType = TypeOf<typeof resetPasswordFormSchema>;
