import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import type { SignUpFormType } from '../../validations';
import type { MutationConfig } from '@/libs/react-query';
import type { IBaseResponse } from '@/types';

import { notify, showErrorFromApi } from '@/libs/helpers';
import { makeRequest } from '@/libs/react-query';
import { APP_ROUTES_PATHS } from '@/routes/app-routes-paths';
import { ALL_ENDPOINT_URL_STORE } from '@/services/endpoint-url-store';

/**
 * It's a function that takes a SignUpFormType object and returns a promise that resolves to a
 * IBaseResponse<SignUpFormType> object
 * @param {SignUpFormType} data - SignUpFormType - the data that will be sent to the server
 */

export type ISignUpReqBody = SignUpFormType & {
  companyUser?: {
    company_id: number;
  };
};

export function signUpRequest(data: ISignUpReqBody) {
  return makeRequest<typeof data, IBaseResponse>({
    url: ALL_ENDPOINT_URL_STORE.auth.signUp,
    method: 'POST',
    data,
  });
}

type SignUpMutationOptionsType = {
  configs?: MutationConfig<typeof signUpRequest>;
};

export const useMutationSignUp = ({ configs }: SignUpMutationOptionsType = {}) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signUpRequest,

    onSuccess: (data) => {
      notify({ type: 'success', message: data.message });
      navigate(APP_ROUTES_PATHS.SUBSCRIPTION, { state: data });
      window.location.reload();
    },

    onError(error) {
      showErrorFromApi(error);
    },

    ...configs,
  });
};
