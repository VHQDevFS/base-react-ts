import type { ICurrentUserResponse } from '../../models';
import type { IBaseResponse } from '@/types';

import { makeRequest } from '@/libs/react-query';
import { ALL_ENDPOINT_URL_STORE } from '@/services/endpoint-url-store';

export async function getCurrentUser() {
  return makeRequest<never, IBaseResponse<{ current_user: ICurrentUserResponse }>>({
    url: ALL_ENDPOINT_URL_STORE.auth.currentUserInfo,

    method: 'GET',
  });
}

export type QueryCurrentUserFnType = typeof getCurrentUser;
