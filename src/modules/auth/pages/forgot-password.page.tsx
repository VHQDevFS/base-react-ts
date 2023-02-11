import { Button } from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { useMutationSendEmailForgotPassword } from '../services/api';
import { AuthWidget } from '../widgets/auth.widget';

import { CustomFormProvider, CustomInput, Head } from '@/components/elements';
import { useOutletForgotPasswordContext } from '@/components/layouts';
import { useFormWithSchema } from '@/libs/hooks';
import { APP_ROUTES_PATHS } from '@/routes';
import { getEmailField } from '@/validations';

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const [, setValueOutletForgotPassword] = useOutletForgotPasswordContext();

  const form = useFormWithSchema({
    schema: z.object({
      email: getEmailField(),
    }),
  });

  const { formState, register } = form;

  const { errors } = formState;

  const mutationSendEmailForgotPassword = useMutationSendEmailForgotPassword();

  function onSubmit(values: { email: string }) {
    mutationSendEmailForgotPassword.mutate(values, {
      onSuccess() {
        navigate(`${APP_ROUTES_PATHS.AUTH}${APP_ROUTES_PATHS.VERIFY_CODE}`);
        setValueOutletForgotPassword({ email: values.email });
      },
    });
  }

  return (
    <AuthWidget
      title="Forgot Password"
      description="Please enter your registered email. We will send you the instruction to reset your password"
    >
      <Head
        title="Forgot Password"
        description="Please enter your registered email. We will send you the instruction to reset 
        your password"
      />
      <CustomFormProvider form={form} onSubmit={onSubmit}>
        <CustomInput
          label="Email"
          size="lg"
          isRequired
          placeholder="Enter your email"
          registration={register('email')}
          error={errors.email}
          rightIcon={<AiOutlineMail color="black" />}
        />

        <Button
          variant="primaryBlue"
          size={{ base: 'md', xl: 'lg' }}
          w="full"
          type="submit"
          mt={8}
          isDisabled={mutationSendEmailForgotPassword.isLoading}
          isLoading={mutationSendEmailForgotPassword.isLoading}
        >
          Send Request
        </Button>
      </CustomFormProvider>
    </AuthWidget>
  );
}
