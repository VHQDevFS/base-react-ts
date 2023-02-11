import { z } from 'zod';

import type { TypeOf } from 'zod';

import { getEmailField, getPasswordField, getStringRequiredField } from '@/validations';

export const signUpFormSchema = z
  .object({
    email: getEmailField(),
    first_name: getStringRequiredField('First name').max(100, 'First name maximum 100 characters'),
    last_name: getStringRequiredField('Last name').max(100, 'Last name maximum 100 characters'),
    companies_attributes: getStringRequiredField('Company').max(
      40,
      'Company name maximum 40 characters'
    ),
    password: getPasswordField(),
    password_confirmation: getPasswordField('Confirm password'),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Confirm password does not match password',
    path: ['password_confirmation'],
  });

export type SignUpFormType = TypeOf<typeof signUpFormSchema>;
