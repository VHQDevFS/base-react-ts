import React from 'react';

import { CloseButton, Icon } from '@chakra-ui/react';
import { AiOutlineSearch } from 'react-icons/ai';

import { CustomInput } from '../custom-input';

import type { CustomInputProps } from '../custom-input';
import type { CloseButtonProps, IconProps } from '@chakra-ui/react';

import { useDebounce } from '@/libs/hooks';

interface SearchInputProps extends CustomInputProps {
  searchValue?: string;

  onHandleSearch: (value: string | undefined) => void;

  iconSearchProps?: IconProps;

  clearButtonProps?: CloseButtonProps;
}

export const SearchInput = React.memo(
  ({
    onHandleSearch,
    searchValue = undefined,
    iconSearchProps,
    clearButtonProps,
    ...rest
  }: SearchInputProps) => {
    const [debounceSearchValue, setSearchValue, currentValue] = useDebounce(searchValue);

    const searchRef = React.useRef<HTMLInputElement>() as React.RefObject<HTMLInputElement>;

    const memoHandleSearch = React.useCallback(onHandleSearch, [onHandleSearch]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    };

    // Fetch API
    React.useEffect(() => {
      memoHandleSearch(debounceSearchValue || undefined);
      searchRef.current?.focus();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceSearchValue]);

    React.useEffect(() => {
      searchRef.current?.focus();
    }, [debounceSearchValue, searchRef]);

    return (
      <CustomInput
        ref={searchRef}
        placeholder="Search..."
        leftIcon={<Icon as={AiOutlineSearch} w={5} h={5} {...iconSearchProps} />}
        _disabled={{
          bg: 'white',
        }}
        pl="40px"
        pr="30px"
        value={currentValue}
        onChange={handleChange}
        {...rest}
        rightIcon={<CloseButton size="sm" {...clearButtonProps} />}
        onClickRightIcon={() => {
          setSearchValue('');
        }}
      />
    );
  }
);
