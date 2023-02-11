import { z } from 'zod';

import type { TypeOf } from 'zod';

import { getPasswordField } from '@/validations';

export const changePasswordFormSchema = z
  .object({
    old_password: getPasswordField('Current password'),
    password: getPasswordField('New password'),
    password_confirmation: getPasswordField('Confirm password'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password don't match",
    path: ['password_confirmation'],
  });

export type ChangePasswordFormType = TypeOf<typeof changePasswordFormSchema>;
