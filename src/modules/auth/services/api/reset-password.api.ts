import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { ResetPasswordFormType } from '../../validations';
import type { MutationConfig } from '@/libs/react-query';
import type { IBaseResponse } from '@/types';

import { notify, showErrorFromApi } from '@/libs/helpers';
import { makeRequest } from '@/libs/react-query';
import { APP_ROUTES_PATHS } from '@/routes/app-routes-paths';
import { ALL_ENDPOINT_URL_STORE } from '@/services/endpoint-url-store';

const resetPasswordRequest = (data: ResetPasswordFormType) =>
  makeRequest<typeof data, IBaseResponse>({
    url: ALL_ENDPOINT_URL_STORE.auth.resetPassword,
    method: 'PUT',
    data,
  });

type ResetPasswordMutationOptionsType = {
  configs?: MutationConfig<typeof resetPasswordRequest>;
};
export const useMutationResetPassword = ({ configs }: ResetPasswordMutationOptionsType = {}) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: resetPasswordRequest,

    onSuccess(data) {
      notify({ type: 'success', message: data?.message });
      navigate(APP_ROUTES_PATHS.AUTH);
      window.location.reload();
    },

    onError(error) {
      showErrorFromApi(error);
    },

    ...configs,
  });
};
