import { useCallback, useState } from 'react';
import type { ReactNode } from 'react';

import { Box, Checkbox, Icon, Stack, Th, Thead, Tr } from '@chakra-ui/react';
import { HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi';
import { TbArrowsDownUp } from 'react-icons/tb';

import type { TableColumnHeaderProps } from '@chakra-ui/react';

type ColumnProps = {
  key: number | symbol | string;
  title: string;
  isNumeric?: boolean;
  hasSort?: boolean;
}[];

type GroupColumnProps = {
  header: string;
  columns: ColumnProps;
}[];

interface TableHeadProps<T> {
  groupColumns: GroupColumnProps;
  additionalFeature?: boolean;
  hasCheckbox: boolean;
  onHandleCheckbox?: (checked: boolean) => void;
  handleSortBy: (sortBy: 'asc' | 'desc' | 'all', accessor: keyof T) => void;
  isCheckAll?: boolean;
  isIndeterminate?: boolean;
}

interface HeadCellProps<T extends object> extends TableColumnHeaderProps {
  accessor: keyof T;
  children: ReactNode;
  handleSortBy: (sortBy: 'asc' | 'desc' | 'all', accessor: keyof T) => void;

  hasSort?: boolean;
}

const HeaderCell = <T extends object>({
  children,
  handleSortBy,
  accessor,
  hasSort,
  ...rest
}: HeadCellProps<T>) => {
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | 'all'>('all');

  const handleOnClick = useCallback(
    (e: React.MouseEvent<SVGElement, MouseEvent>) => {
      e.preventDefault();
      setSortBy((prev) => {
        if (prev === 'all') return 'asc';

        if (prev === 'asc') return 'desc';

        return 'all';
      });
      handleSortBy(sortBy, accessor);
    },
    [accessor, handleSortBy, sortBy]
  );

  function renderIcon() {
    if (sortBy === 'all') {
      return TbArrowsDownUp;
    }

    if (sortBy === 'asc') {
      return HiArrowNarrowUp;
    }

    return HiArrowNarrowDown;
  }

  return (
    <Th
      color="textColor"
      fontWeight={400}
      fontSize="sm"
      lineHeight="21px"
      textTransform="capitalize"
      {...rest}
    >
      <Stack
        direction="row"
        align="center"
        justify="space-between"
        borderRight="1px solid #fff"
        pr="15px"
      >
        <Box>{children}</Box>

        {hasSort && (
          <Icon
            as={renderIcon()}
            fontSize="md"
            color="textColor"
            _hover={{
              cursor: 'pointer',
            }}
            userSelect="none"
            onClick={hasSort ? handleOnClick : undefined}
          />
        )}
      </Stack>
    </Th>
  );
};

const TableHeader = <T extends object>({
  groupColumns,
  additionalFeature = false,
  hasCheckbox,
  handleSortBy,
  onHandleCheckbox,
  isCheckAll,
  isIndeterminate,
}: TableHeadProps<T>) => {
  const totalColumns = groupColumns.reduce(
    (acc, value) => [
      ...acc,
      ...value.columns.map((col) => {
        if ('hasSort' in col) {
          return { ...col, hasSort: col?.hasSort };
        }

        return {
          ...col,
          hasSort: true,
        };
      }),
    ],
    [] as any[]
  );

  return (
    <Thead
      sx={{
        // position: 'sticky',
        top: '-10px',
        margin: 0,
        bg: 'secondary',
        p: 2,
      }}
    >
      <Tr py="16px">
        {groupColumns.length > 1 &&
          groupColumns.map((group) => (
            <Th
              key={group.header}
              colSpan={Math.ceil(totalColumns.length / groupColumns.length)}
              textAlign="center"
              textTransform="uppercase"
              sx={{
                fontWeight: '400',
                fontSize: '12px',
                lineHeight: '21px',
              }}
            >
              {group.header}
            </Th>
          ))}
      </Tr>
      <Tr>
        {hasCheckbox && (
          <Th pl={4} color="gray.300" width="8">
            <Checkbox
              defaultChecked={false}
              isChecked={isCheckAll}
              isIndeterminate={isIndeterminate}
              size="lg"
              variant="normal"
              onChange={
                onHandleCheckbox
                  ? (e) => {
                      onHandleCheckbox(e.target.checked);
                    }
                  : undefined
              }
            />
          </Th>
        )}

        {totalColumns.map((col) => (
          <HeaderCell<T>
            key={String(col.key)}
            isNumeric={col.isNumeric}
            accessor={String(col.key) as keyof T}
            // ref={refs[index]}
            handleSortBy={handleSortBy}
            hasSort={col?.hasSort}
          >
            {col.title}
          </HeaderCell>
        ))}
        {additionalFeature && (
          <Th
            width="8"
            textAlign="center"
            textTransform="capitalize"
            color="textColor"
            userSelect="none"
            fontWeight={400}
            fontSize="sm"
            lineHeight="21px"
          />
        )}
      </Tr>
    </Thead>
  );
};

TableHeader.defaultProps = {
  additionalFeature: false,
};

export default TableHeader;
