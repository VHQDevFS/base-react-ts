import { Button, Link as ChakraLink, Stack, Text } from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { useMutationSignIn } from '../services';
import { signInFormSchema } from '../validations';
import { AuthWidget } from '../widgets/auth.widget';

import type { SignInFormType } from '../validations';

import { CustomFormProvider, CustomInput, Head } from '@/components/elements';
import { useFormWithSchema } from '@/libs/hooks';

export function SignInPage() {
  const form = useFormWithSchema({
    schema: signInFormSchema,
  });

  const { formState, register } = form;

  const { errors } = formState;

  const mutationSignIn = useMutationSignIn();

  function onSubmit(values: SignInFormType) {
    mutationSignIn.mutate({ user: values });
  }

  return (
    <AuthWidget title="Sign In" description="Welcome back! Please enter your details">
      <Head title="Sign In" description="Welcome back! Please enter your details" />
      <CustomFormProvider form={form} onSubmit={onSubmit}>
        <Stack direction="column" spacing={{ base: 4, xl: 8 }}>
          <CustomInput
            label="Email"
            size="lg"
            isRequired
            placeholder="Enter your email"
            registration={register('email')}
            error={errors.email}
            rightIcon={<AiOutlineMail />}
            pr={12}
            maxLength={255}
          />
          <CustomInput
            label="Password"
            type="password"
            size="lg"
            isRequired
            placeholder="Enter your password"
            registration={register('password')}
            error={errors.password}
          />
          <Stack direction="row" justify="flex-end" align="center">
            {/* <Checkbox
              size="lg"
              defaultChecked
              textColor="secondary"
              variant="withBorder"
              spacing="10px"
              isDisabled={mutationSignIn.isLoading}
            >
              <Text
                color="grayColor"
                fontWeight={500}
                fontSize={{ base: 'sm', xl: 'md' }}
                lineHeight="150%"
              >
                Remember me
              </Text>
            </Checkbox> */}
            <ChakraLink
              to={mutationSignIn.isLoading ? '#' : '../forgot-password'}
              as={Link}
              color="primary"
              fontWeight={600}
              fontSize={{ base: 'sm', xl: 'md' }}
            >
              Forgot your password?
            </ChakraLink>
          </Stack>
          <Button
            variant="primaryBlue"
            type="submit"
            size={{ base: 'md', xl: 'lg' }}
            isLoading={mutationSignIn.isLoading}
            isDisabled={mutationSignIn.isLoading}
          >
            Sign in
          </Button>
        </Stack>
      </CustomFormProvider>
      <Text mt={8} textAlign="center">
        You don’t have an account?{' '}
        <ChakraLink
          as={Link}
          color="primary"
          fontWeight={600}
          to={mutationSignIn.isLoading ? '#' : '../sign-up'}
        >
          Create an account
        </ChakraLink>
      </Text>
    </AuthWidget>
  );
}
