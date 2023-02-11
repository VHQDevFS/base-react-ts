import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { signInRequest } from '../api';

import type { ITokenStorage } from '../../models/sign-in.model';
import type { MutationConfig, TErrorResponse } from '@/libs/react-query';

import { clearStoredAuth, notify, setStoredAuth } from '@/libs/helpers';
import { APP_ROUTES_PATHS } from '@/routes/app-routes-paths';

type SignInMutationOptionsType = {
  configs?: MutationConfig<typeof signInRequest, TErrorResponse>;
};

export const useMutationSignIn = ({ configs }: SignInMutationOptionsType = {}) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signInRequest,

    onMutate() {
      clearStoredAuth();
    },
    onSuccess: (data) => {
      if (data.statusCode !== 200) {
        notify({ type: 'error', message: 'Something went wrong!' });
        return;
      }
      const user = data?.data.user;

      setStoredAuth<ITokenStorage>({
        access_token: user.access_token,
        refresh_token: user.refresh_token,
      });

      // queryClient.setQueryData([authEndpoint.CURRENT_USER], user);

      navigate(APP_ROUTES_PATHS.CONTACTS);
    },

    onError(error) {
      notify({ type: 'error', message: error?.message });
      if (error.statusCode === 401) {
        clearStoredAuth();
      }
    },

    ...configs,
  });
};
