import { useMutation } from '@tanstack/react-query';

import type { ChangePasswordFormType } from '../../validations';
import type { MutationConfig } from '@/libs/react-query';
import type { IBaseResponse } from '@/types';

import { notify, showErrorFromApi } from '@/libs/helpers';
import { makeRequest } from '@/libs/react-query';
import { ALL_ENDPOINT_URL_STORE } from '@/services/endpoint-url-store';

export const changePasswordRequest = (data: { user: ChangePasswordFormType }) =>
  makeRequest<typeof data, IBaseResponse>({
    url: ALL_ENDPOINT_URL_STORE.auth.changePassword,
    method: 'POST',
    data,
  });

type ChangePasswordMutationOptionsType = {
  configs?: MutationConfig<typeof changePasswordRequest>;
};
export const useMutationChangePassword = ({ configs }: ChangePasswordMutationOptionsType = {}) =>
  useMutation({
    mutationFn: changePasswordRequest,

    onSuccess(data) {
      notify({ type: 'success', message: data?.message });
    },

    onError(error) {
      showErrorFromApi(error);
    },

    ...configs,
  });
