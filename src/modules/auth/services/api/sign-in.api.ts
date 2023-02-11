import type { ISignInResponse } from '../../models/sign-in.model';
import type { SignInFormType } from '@/modules/auth/validations';
import type { IBaseResponse } from '@/types';

import { makeRequest } from '@/libs/react-query';
import { ALL_ENDPOINT_URL_STORE } from '@/services/endpoint-url-store';

/**
 * It's a function that takes a SignInFormType object and returns a promise that resolves to a
 * IBaseResponse<ISignInResponse> object
 * @param {SignInFormType} data - SignInFormType - the data that will be sent to the server
 */
export const signInRequest = (data: { user: SignInFormType }) =>
  makeRequest<typeof data, IBaseResponse<ISignInResponse>>({
    url: ALL_ENDPOINT_URL_STORE.auth.signIn,
    method: 'POST',
    data,
  });
