import { z } from 'zod';

import type { TypeOf } from 'zod';

import { getEmailField } from '@/validations';

export const verifyCodeSchema = z.object({
  email: getEmailField(),
  reset_password_token: z
    .string({ required_error: 'Verification code is required' })
    .min(6, 'Verification code must be 6 numbers')
    .max(6, 'Verification code must be 6 numbers'),
});

export type VerifyCodeFormType = TypeOf<typeof verifyCodeSchema>;
