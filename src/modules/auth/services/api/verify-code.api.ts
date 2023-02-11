import { useMutation } from '@tanstack/react-query';

import type { VerifyCodeFormType } from '../../validations';
import type { MutationConfig } from '@/libs/react-query';
import type { IBaseResponse } from '@/types';

import { showErrorFromApi } from '@/libs/helpers';
import { makeRequest } from '@/libs/react-query';
import { ALL_ENDPOINT_URL_STORE } from '@/services/endpoint-url-store';

const verifyCodeRequest = (params: VerifyCodeFormType) =>
  makeRequest<never, IBaseResponse>({
    url: ALL_ENDPOINT_URL_STORE.auth.verifyCode,
    method: 'GET',
    params,
  });

type VerifyCodeMutationOptionsType = {
  configs?: MutationConfig<typeof verifyCodeRequest>;
};
export const useMutationVerifyCode = ({ configs }: VerifyCodeMutationOptionsType = {}) =>
  useMutation({
    mutationFn: verifyCodeRequest,

    onError(error) {
      showErrorFromApi(error);
    },

    ...configs,
  });
