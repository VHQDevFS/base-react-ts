import { useCallback, useEffect } from 'react';

import { useIsFetching } from '@tanstack/react-query';

import type { QueryKey } from '@tanstack/react-query';

import { createStoreContext } from '@/libs/utils';

interface GlobalLoadingState {
  isLoading: boolean;
}

const initialState: GlobalLoadingState = {
  isLoading: false,
};

const { Provider: GlobalLoadingProvider, useStore } = createStoreContext(initialState);

const queryKeyNotUseGlobalLoading: QueryKey = [];

const useGlobalLoadingStore = (initLoading = false) => {
  const [state, setState] = useStore((state) => state);

  const setLoading = useCallback(
    (isLoading: boolean) => {
      setState({ isLoading });
    },
    [setState]
  );

  const fetchingCount = useIsFetching({
    predicate(query) {
      const hasQueryKeyIncluded = query.queryKey.some((key) =>
        queryKeyNotUseGlobalLoading.includes(key)
      );

      return !hasQueryKeyIncluded;
    },
  });

  useEffect(() => {
    const isFetching = !!fetchingCount;

    if (state.isLoading === isFetching) return;

    setState({ isLoading: isFetching || initLoading });
  }, [fetchingCount, initLoading, setState, state.isLoading]);

  return {
    ...state,
    setLoading,
  };
};

export { GlobalLoadingProvider, useGlobalLoadingStore };
