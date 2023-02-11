import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { MutationConfig } from '@/libs/react-query';
import type { IBaseResponse } from '@/types';

import { clearStoredAuth, notify } from '@/libs/helpers';
import { makeRequest } from '@/libs/react-query';
import { APP_ROUTES_PATHS } from '@/routes/app-routes-paths';
import { ALL_ENDPOINT_URL_STORE } from '@/services/endpoint-url-store';

export const logoutRequest = () =>
  makeRequest<never, IBaseResponse>({
    url: ALL_ENDPOINT_URL_STORE.auth.logout,
    method: 'DELETE',
  });

type LogoutMutationOptionsType = {
  configs?: MutationConfig<typeof logoutRequest>;
};
export const useMutationLogout = ({ configs }: LogoutMutationOptionsType = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutRequest,

    onMutate() {
      queryClient.clear();
      clearStoredAuth();
      navigate(APP_ROUTES_PATHS.AUTH);
      window.location.reload();
    },
    onError() {
      notify({ type: 'error', message: 'Logout failed! Try Again' });
    },

    ...configs,
  });
};
