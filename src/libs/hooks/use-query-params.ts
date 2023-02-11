import { useCallback, useMemo, useState } from 'react';

export type IBaseQueryParams = {
  page: number;
  per: number;
  'q[sorts]'?: string;
};

const queryPaginationDefault: IBaseQueryParams = {
  page: 1,
  per: 20,
  'q[sorts]': undefined,
};

const useQueryParams = <TQuery extends Record<string, unknown> | object = Record<string, unknown>>(
  initParams: Partial<IBaseQueryParams & TQuery> = {}
) => {
  const defaultQueryParams = useMemo(
    () =>
      ({
        ...queryPaginationDefault,
        ...initParams,
      } as IBaseQueryParams & TQuery),
    [initParams]
  );

  const [queryParams, setQueryParams] = useState<IBaseQueryParams & TQuery>(defaultQueryParams);

  const memoSetQueryParams = useCallback(
    (newQueryParams: Partial<IBaseQueryParams & TQuery>) =>
      setQueryParams((prevState) => ({ ...prevState, ...newQueryParams })),
    []
  );

  const memoSetQueryParamsOverride = useCallback(
    (newQueryParams?: Partial<IBaseQueryParams & TQuery>) =>
      setQueryParams((prevState) => {
        if (newQueryParams) {
          return newQueryParams as IBaseQueryParams & TQuery;
        }
        return prevState;
      }),
    []
  );

  const resetQueryParams = useCallback(
    () => setQueryParams(() => defaultQueryParams),
    [defaultQueryParams]
  );

  const memoQueryParams = useMemo(() => queryParams, [queryParams]);

  return {
    queryParams: memoQueryParams,
    setQueryParams: memoSetQueryParams,
    setQueryParamsOverride: memoSetQueryParamsOverride,
    resetQueryParams,
  };
};

export { useQueryParams };
