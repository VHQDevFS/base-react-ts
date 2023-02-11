import React from 'react';

import { useLocation } from 'react-router-dom';

/**
 * It takes a URL query string and returns an object with the query string parameters as keys and their
 * values as values
 * @param {string} url - string - The URL search to parse. @example ?name=John&age=30
 * @returns An object. @example { name: 'John', age: 30 }
 */
export const parseQueryStringToObject = <T extends Record<string, unknown> | object = object>(
  url: string
) => {
  const params = new Map<string, unknown>(
    url
      .slice(1)
      .split('&')
      .map((kv: string) => kv.split('=')) as any
  );

  return Object.fromEntries(params) as T;
};

export function useGetQueryString<T extends Record<string, unknown> | object = object>() {
  const location = useLocation();

  const query = React.useMemo(
    () => parseQueryStringToObject<T>(location.search),
    [location.search]
  );

  return query;
}
