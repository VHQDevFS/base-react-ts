import { useEffect, useState } from 'react';

import { Button, Link as ChakraLink, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import { AiOutlineMail } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

import { useMutationSignUp } from '../services/api';
import { signUpFormSchema } from '../validations';
import { AuthWidget } from '../widgets/auth.widget';

import type { ISignUpReqBody } from '../services/api';
import type { SignUpFormType } from '../validations';

import { CustomFormProvider, CustomInput, Head } from '@/components/elements';
import { decodeUriReplacePlusToSpace, parseQueryString } from '@/libs/helpers';
import { useFormWithSchema } from '@/libs/hooks';

export function SignUpPage() {
  const form = useFormWithSchema({
    schema: signUpFormSchema,
  });

  const location = useLocation();
  const companyName = parseQueryString(location.search).get('company_name') as string;
  const email = parseQueryString(location.search).get('email') as string;
  const companyId = parseQueryString(location.search).get('company_id') as number;

  const { formState, register, setValue, reset } = form;

  const { errors } = formState;

  const mutationSignUp = useMutationSignUp();

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (companyName) {
      setValue('companies_attributes', decodeUriReplacePlusToSpace(companyName));
      setValue('email', email);
      setIsDisabled(true);
    }
  }, [setValue, companyName, email]);

  function onSubmit(values: SignUpFormType) {
    const body: ISignUpReqBody = { ...values };
    if (companyId && companyName && email) {
      body.companyUser = { company_id: Number(companyId) };
    }

    mutationSignUp.mutate(body, {
      onSuccess() {
        setIsDisabled(false);
        reset();
      },
    });
  }

  return (
    <AuthWidget
      title="Create your Account"
      description="Before we start, please enter your information"
    >
      <Head
        title="Create your Account"
        description="Before we start, please enter your information"
      />
      <CustomFormProvider form={form} onSubmit={onSubmit}>
        <Stack direction="column" spacing={6}>
          <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={{ base: 4, xl: '45px' }}>
            <CustomInput
              label="First name"
              size="lg"
              isRequired
              placeholder="Enter your first name"
              registration={register('first_name')}
              error={errors.first_name}
            />
            <CustomInput
              label="Last name"
              size="lg"
              isRequired
              placeholder="Enter your last name"
              registration={register('last_name')}
              error={errors.last_name}
            />
          </SimpleGrid>

          <CustomInput
            label="Email"
            size="lg"
            isRequired
            placeholder="Enter your email"
            registration={register('email')}
            error={errors.email}
            rightIcon={<AiOutlineMail color="black" />}
            isDisabled={isDisabled}
          />

          <CustomInput
            label="Your company"
            size="lg"
            isRequired
            placeholder="Enter your your company"
            registration={register('companies_attributes')}
            isDisabled={isDisabled}
            error={errors.companies_attributes}
          />

          <CustomInput
            label="Password"
            size="lg"
            type="password"
            isRequired
            placeholder="Enter your password"
            registration={register('password')}
            error={errors.password}
          />

          <CustomInput
            label="Confirm password"
            size="lg"
            type="password"
            isRequired
            placeholder="Enter your confirm password"
            registration={register('password_confirmation')}
            error={errors.password_confirmation}
          />
          <Button
            variant="primaryBlue"
            type="submit"
            size={{ base: 'md', xl: 'lg' }}
            isLoading={mutationSignUp.isLoading}
            isDisabled={mutationSignUp.isLoading}
            loadingText="Submitting..."
          >
            Create Account
          </Button>
        </Stack>
      </CustomFormProvider>
      <Text mt={8} textAlign="center">
        You had an account?{' '}
        <ChakraLink as={Link} color="primary" fontWeight={600} to="../sign-in">
          Sign in
        </ChakraLink>
      </Text>
    </AuthWidget>
  );
}
