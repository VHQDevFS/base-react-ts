import { useState, useEffect, useCallback } from 'react';

export function useDebounce<T>(initialValue: T, time = 600): [T, React.Dispatch<T>, T] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, time);

    return () => {
      clearTimeout(debounce);
    };
  }, [value, time]);

  const memoSetValue = useCallback(setValue, [setValue]);

  return [debouncedValue, memoSetValue, value];
}
