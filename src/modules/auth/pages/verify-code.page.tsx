import { useEffect } from 'react';

import { Button, HStack, PinInput, PinInputField, Stack, Text } from '@chakra-ui/react';
import { Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useMutationSendEmailForgotPassword, useMutationVerifyCode } from '../services/api';
import { verifyCodeSchema } from '../validations';
import { AuthWidget } from '../widgets/auth.widget';

import type { VerifyCodeFormType } from '../validations';

import { CustomFormProvider, Head } from '@/components/elements';
import { useOutletForgotPasswordContext } from '@/components/layouts';
import { useFormWithSchema } from '@/libs/hooks';
import { APP_ROUTES_PATHS } from '@/routes';

export function VerifyCodePage() {
  const navigate = useNavigate();
  const form = useFormWithSchema({
    schema: verifyCodeSchema,
  });

  const { formState, control, setValue, getValues } = form;

  const { errors } = formState;

  const [valuesOutletForgotPassword, setValueOutletForgotPassword] =
    useOutletForgotPasswordContext();

  const mutationVerifyCode = useMutationVerifyCode();

  const mutationSendEmailForgotPassword = useMutationSendEmailForgotPassword();

  useEffect(() => {
    if (valuesOutletForgotPassword.email) {
      setValue('email', valuesOutletForgotPassword.email);
      return;
    }

    navigate(APP_ROUTES_PATHS.AUTH);
  }, [valuesOutletForgotPassword.email, setValue, navigate]);

  function onSubmit(values: VerifyCodeFormType) {
    mutationVerifyCode.mutate(values, {
      onSuccess() {
        const valuesForm = getValues();

        setValueOutletForgotPassword({ codeVerify: valuesForm.reset_password_token });

        navigate(APP_ROUTES_PATHS.AUTH + APP_ROUTES_PATHS.RESET_PASSWORD);
      },
    });
  }

  function handleResendVerifyCode() {
    setValue('reset_password_token', '');
    mutationSendEmailForgotPassword.mutate({ email: valuesOutletForgotPassword.email });
  }

  return (
    <AuthWidget
      title="Verification"
      description="Please enter the verification code sent to your email"
    >
      <Head
        title="Verification"
        description="Please enter the verification code sent to your email"
      />
      <CustomFormProvider form={form} onSubmit={onSubmit}>
        <Stack spacing={{ base: 4, xl: 8 }}>
          <Controller
            name="reset_password_token"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <>
                <HStack spacing={6} mx="auto">
                  <PinInput
                    isDisabled={
                      mutationVerifyCode.isLoading || mutationSendEmailForgotPassword.isLoading
                    }
                    isInvalid={!!errors.reset_password_token}
                    autoFocus
                    otp
                    size={{ base: 'md', '2xl': 'lg' }}
                    {...field}
                  >
                    <PinInputField bg="isabelline" border="none" />
                    <PinInputField bg="isabelline" border="none" />
                    <PinInputField bg="isabelline" border="none" />
                    <PinInputField bg="isabelline" border="none" />
                    <PinInputField bg="isabelline" border="none" />
                    <PinInputField bg="isabelline" border="none" />
                  </PinInput>
                </HStack>

                <Text color="red.500">{error?.message}</Text>
              </>
            )}
          />

          <Button
            variant="primaryBlue"
            type="submit"
            size={{ base: 'md', xl: 'lg' }}
            isDisabled={mutationVerifyCode.isLoading || mutationSendEmailForgotPassword.isLoading}
            isLoading={mutationVerifyCode.isLoading}
          >
            Confirm
          </Button>
        </Stack>
      </CustomFormProvider>
      <Text mt={8} textAlign="center">
        Didn’t receive?{' '}
        <Text
          as="span"
          fontWeight={600}
          _hover={{ textDecor: 'underline' }}
          role="presentation"
          cursor="pointer"
          color="primary"
          onClick={handleResendVerifyCode}
        >
          Resend Code
        </Text>
        {/* <Text ml={6} as="span" fontWeight={600}>
          {times}
        </Text> */}
      </Text>
    </AuthWidget>
  );
}
