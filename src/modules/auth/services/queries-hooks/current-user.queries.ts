import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getCurrentUser } from '../api';

import type { QueryCurrentUserFnType } from '../api';
import type { QueryConfig, TErrorResponse } from '@/libs/react-query';

import { clearStoredAuth, getAccessToken } from '@/libs/helpers';
import { allQueryKeysStore } from '@/services/query-keys-store';

export type UseGetCurrentUserOptionsType = {
  configs?: QueryConfig<QueryCurrentUserFnType, TErrorResponse>;
};

export function useGetCurrentUser({ configs }: UseGetCurrentUserOptionsType = {}) {
  const token = getAccessToken();

  const { data, ...queryInfo } = useQuery({
    enabled: !!token,

    keepPreviousData: true,

    onError: (error) => {
      if (error?.code === 401 || error?.statusCode === 401) {
        clearStoredAuth();
      }
    },
    ...allQueryKeysStore.auth['current-user-infor'],
    queryFn: getCurrentUser,
    ...configs,
  });

  const user = useMemo(() => data?.data.current_user, [data?.data?.current_user]);

  return { user, ...queryInfo };
}

export function useCheckAuthentication() {
  const token = getAccessToken();

  const { user, ...restQueryInfo } = useGetCurrentUser();

  const isLogged = useMemo(() => !!token && !!user, [token, user]);

  return { isLogged, ...restQueryInfo };
}
