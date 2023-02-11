import { useMutation } from '@tanstack/react-query';

import type { MutationConfig } from '@/libs/react-query';
import type { IBaseResponse } from '@/types';

import { notify, showErrorFromApi } from '@/libs/helpers';
import { makeRequest } from '@/libs/react-query';
import { ALL_ENDPOINT_URL_STORE } from '@/services/endpoint-url-store';

const sendEmailForgotPasswordRequest = (data: { email: string }) =>
  makeRequest<typeof data, IBaseResponse>({
    url: ALL_ENDPOINT_URL_STORE.auth.resetPassword,
    method: 'POST',
    data,
  });

type SendEmailForgotPasswordMutationOptionsType = {
  configs?: MutationConfig<typeof sendEmailForgotPasswordRequest>;
};
export const useMutationSendEmailForgotPassword = ({
  configs,
}: SendEmailForgotPasswordMutationOptionsType = {}) =>
  useMutation({
    mutationFn: sendEmailForgotPasswordRequest,

    onSuccess(data) {
      notify({ type: 'success', message: data?.message ?? 'Link verify sent' });
    },

    onError(error) {
      showErrorFromApi(error);
    },

    ...configs,
  });
