import { useEffect } from 'react';

import { Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { useMutationResetPassword } from '../services/api';
import { resetPasswordFormSchema } from '../validations';
import { AuthWidget } from '../widgets/auth.widget';

import type { ResetPasswordFormType } from '../validations';

import { CustomFormProvider, CustomInput, Head } from '@/components/elements';
import { useOutletForgotPasswordContext } from '@/components/layouts';
import { useFormWithSchema } from '@/libs/hooks';

export function ResetPasswordPage() {
  const navigate = useNavigate();

  const [valuesOutletForgotPassword] = useOutletForgotPasswordContext();

  const form = useFormWithSchema({
    schema: resetPasswordFormSchema,
  });
  const { formState, register, setValue } = form;
  const { errors } = formState;

  const mutationResetPassword = useMutationResetPassword();

  function handleSubmit(values: ResetPasswordFormType) {
    mutationResetPassword.mutate(values);
  }

  useEffect(() => {
    if (!valuesOutletForgotPassword.codeVerify && !valuesOutletForgotPassword.email) {
      navigate('/auth');
      return;
    }

    setValue('email', valuesOutletForgotPassword.email);
    setValue('reset_password_token', valuesOutletForgotPassword.codeVerify);
  }, [valuesOutletForgotPassword, navigate, setValue]);

  return (
    <>
      <Head title="Reset password" />
      <AuthWidget title="Reset password" description="">
        <CustomFormProvider form={form} onSubmit={handleSubmit}>
          <Stack direction="column" spacing={6}>
            <CustomInput
              label="New password"
              size="lg"
              isRequired
              placeholder="Enter your password"
              type="password"
              registration={register('password')}
              error={errors.password}
            />

            <CustomInput
              label="Confirm Password"
              type="password"
              size="lg"
              isRequired
              placeholder="Enter your confirm password"
              registration={register('password_confirmation')}
              error={errors.password_confirmation}
            />

            <Button
              variant="primaryBlue"
              size={{ base: 'md', xl: 'lg' }}
              type="submit"
              isLoading={mutationResetPassword.isLoading}
              isDisabled={mutationResetPassword.isLoading}
            >
              Continue
            </Button>
          </Stack>
        </CustomFormProvider>
      </AuthWidget>
    </>
  );
}
