import type { ReactElement } from 'react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  Box,
  Checkbox,
  Flex,
  HStack,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';

import TableHeader from './table-header';

import type { TableCellProps, TableProps } from '@chakra-ui/react';

import { CustomChakraReactSelect } from '@/components/elements';
import Pagination from '@/components/elements/pagination';

interface ColumnItems<ObjectType> {
  key: keyof ObjectType;
  title: string;
  Cell?: (value: ObjectType, index?: number) => JSX.Element | null;
  isNumeric?: boolean;
  tableCellProps?: TableCellProps;
  hasSort: boolean;
}

export type ColumnsProps<ObjectType> = {
  header: string;
  columns: ColumnItems<ObjectType>[];
}[];

interface RenderFilterTableProps<ObjectType> {
  listSelected: ObjectType[];
  resetSelected: () => void;
}

interface TableComponentProps<ObjectType> {
  data: ObjectType[];
  groupColumns: ColumnsProps<ObjectType>;
  hasCheckbox?: boolean;
  additionalFeature?(value: ObjectType): JSX.Element;

  // paginate
  totalCount?: number;
  currentPage?: number;
  perPage?: number;
  onPageChange?(page: number, perPage?: number): void;

  isLoading: boolean;
  withoutHeader?: boolean;
  isError: boolean;
  TableProps?: TableProps;
  hasNoPaginate?: boolean;

  // filter

  showChangeEntries?: boolean;

  renderFilterTable?(props: RenderFilterTableProps<ObjectType>): React.ReactNode;

  onFilterChange?(values: string): void;
}

type FiltersProps<ObjectType extends { id?: string | number; selected?: boolean }> = {
  sortBy: 'asc' | 'desc' | 'all';
  accessor: keyof ObjectType;
}[];

function TableComponent<ObjectType extends { id?: string | number; selected?: boolean }>({
  data,
  groupColumns,
  totalCount,
  additionalFeature = undefined,
  hasCheckbox = false,
  showChangeEntries = false,
  TableProps,
  isError,
  isLoading,
  withoutHeader = false,

  renderFilterTable,
  onFilterChange = undefined,

  // paginate
  currentPage = 1,
  perPage,
  onPageChange,
  hasNoPaginate,
}: TableComponentProps<ObjectType>) {
  const [page, setPage] = useState(currentPage);
  const [sortedData, setSortedData] = useState<ObjectType[]>([]);
  const filters = useRef<FiltersProps<ObjectType>>([]);
  const [rowsCount, setRowsCount] = useState(20);
  const wrapperTableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRowsCount(Number(perPage));
  }, [perPage]);

  useEffect(() => {
    setPage(Number(currentPage));
  }, [currentPage]);

  useEffect(() => {
    if (data) {
      setSortedData(() =>
        data.map((item) => ({
          ...item,
          selected: false,
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    groupColumns.forEach((group) => {
      group.columns.forEach((column) => {
        if (column.hasSort) {
          filters.current.push({
            accessor: String(column.key) as keyof ObjectType,
            sortBy: 'all',
          });
        }
      });
    });
  }, [groupColumns]);

  const handleChangePage = useCallback(
    (newPage: number) => {
      if (onPageChange) onPageChange(newPage, rowsCount);

      setPage(newPage);
      wrapperTableRef.current?.scrollIntoView({ behavior: 'smooth' });
    },
    [onPageChange, rowsCount]
  );

  const handleSortBy = useCallback(
    (sortBy: 'asc' | 'desc' | 'all', accessor: keyof ObjectType) => {
      const newSortBy = sortBy === 'all' ? 'asc' : sortBy === 'asc' ? 'desc' : 'all';

      filters.current = [
        { accessor, sortBy: newSortBy },
        ...filters.current.filter((predicate) => predicate.accessor !== accessor),
      ];

      const sorted = filters.current
        .reduce<string[]>((acc, cur) => {
          if (cur.sortBy !== 'all') {
            acc.push(`${String(cur.accessor)}_${cur.sortBy}`);
          }

          // by default using key first name, when sort by full name must push key last name
          if (cur.accessor === 'first_name' && cur.sortBy !== 'all') {
            acc.push(`last_name_${cur.sortBy}`);
          }

          return acc;
        }, [])
        .join(',');

      onFilterChange && onFilterChange(sorted);
    },
    [onFilterChange]
  );

  const setSelected = useCallback((id?: number | string, selected?: boolean | 'all' | 'none') => {
    setSortedData((prev) =>
      prev.map((item) => {
        if (selected === 'all') {
          return {
            ...item,
            selected: true,
          };
        }

        if (selected === 'none') {
          return {
            ...item,
            selected: false,
          };
        }
        if (item.id === id) {
          return {
            ...item,
            selected,
          };
        }

        return item;
      })
    );
  }, []);

  const listSelected = useMemo(() => sortedData.filter(({ selected }) => selected), [sortedData]);
  const isCheckAll = sortedData.every(({ selected }) => selected);
  const isIndeterminate = sortedData.some(({ selected }) => selected) && !isCheckAll;

  return (
    <Stack ref={wrapperTableRef} spacing={4} w="full">
      {renderFilterTable &&
        renderFilterTable({ listSelected, resetSelected: () => setSelected(undefined, 'none') })}
      <Box w="full">
        {!isLoading && isError ? (
          <Flex mt="5" justify="center">
            <Text>No data available</Text>
          </Flex>
        ) : isLoading ? (
          <Table bg="white">
            <Tbody>
              {[...Array(7)].map((_, index) => (
                <Tr key={`loading-${index}`}>
                  <Td>
                    <Checkbox isDisabled />
                  </Td>
                  {groupColumns[0].columns.slice(0, 5).map((column) => (
                    <Td key={String(column.key)}>
                      <Skeleton color="gray.800" height="10px" />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <TableContainer {...TableProps} maxW="full">
            {/* <TableSearch handleOnSearch={handleOnSearch} /> */}
            <Table size="md" overflow="hidden">
              {!withoutHeader && (
                <TableHeader<ObjectType>
                  hasCheckbox={hasCheckbox && sortedData && !!sortedData.length}
                  groupColumns={groupColumns}
                  additionalFeature={!!additionalFeature}
                  handleSortBy={handleSortBy}
                  isCheckAll={isCheckAll}
                  isIndeterminate={isIndeterminate}
                  onHandleCheckbox={(checked) => {
                    setSelected(undefined, checked ? 'all' : 'none');
                  }}
                />
              )}

              <Tbody rounded="12px" bg="white">
                {sortedData &&
                  sortedData.map((object, index) => (
                    <Tr
                      key={object.id}
                      borderBottom="1px solid"
                      borderColor="secondary"
                      _last={{
                        border: 'none',
                      }}
                    >
                      {hasCheckbox && (
                        <Td pl="16px" border="none">
                          <Checkbox
                            pt="2px"
                            isChecked={object.selected}
                            size="lg"
                            onChange={() => {
                              setSelected(object.id ?? '', !object.selected);
                            }}
                          />
                        </Td>
                      )}
                      {groupColumns.map((group) => (
                        <React.Fragment key={group.header}>
                          {group.columns.map((column) =>
                            column?.Cell ? (
                              <Td
                                key={String(column.key)}
                                border="none"
                                isNumeric={typeof object[column.key] === 'number'}
                                sx={{
                                  fontWeight: 400,
                                  fontSize: '14px',
                                  lineHeight: '21px',
                                  color: 'textColor',
                                }}
                                {...column.tableCellProps}
                              >
                                {column.Cell(object, index)}
                              </Td>
                            ) : (
                              <Td
                                key={String(column.key)}
                                border="none"
                                isNumeric={typeof object[column.key] === 'number'}
                                sx={{
                                  fontWeight: 400,
                                  fontSize: '14px',
                                  lineHeight: '21px',
                                  color: 'textColor',
                                }}
                                {...column.tableCellProps}
                              >
                                {object[column.key] ? (object[column.key] as ReactElement) : ''}
                              </Td>
                            )
                          )}
                        </React.Fragment>
                      ))}

                      {additionalFeature && (
                        <Td border="none" textAlign="right" pos="relative" p={0}>
                          {additionalFeature(object)}
                        </Td>
                      )}
                    </Tr>
                  ))}
              </Tbody>
            </Table>
            {sortedData && !sortedData.length && (
              <Flex mt="5" justify="center">
                <Text>No data available</Text>
              </Flex>
            )}
          </TableContainer>
        )}

        {!hasNoPaginate && sortedData && !!sortedData.length && (
          <HStack
            direction="row"
            pt={4}
            justify={showChangeEntries ? 'space-between' : 'flex-end'}
            align="center"
            spacing="6"
          >
            {showChangeEntries && (
              <HStack spacing={2} align="center" py={3}>
                <Text>Show</Text>
                <Box w="120px">
                  <CustomChakraReactSelect
                    defaultValue={{ value: 20, label: '20' }}
                    size="md"
                    isMulti={false}
                    isSearchable={false}
                    options={[
                      { value: 10, label: '10' },
                      { value: 20, label: '20' },
                      { value: 50, label: '50' },
                      { value: 100, label: '100' },
                    ]}
                    onChange={(option) => {
                      if (!option?.value) return;

                      onPageChange && onPageChange(1, option.value);
                      wrapperTableRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />
                </Box>

                <Text>entries</Text>
              </HStack>
            )}

            <Pagination
              totalCount={Number(totalCount)}
              currentPage={page}
              perPage={rowsCount}
              onPageChange={handleChangePage}
            />
          </HStack>
        )}
      </Box>
    </Stack>
  );
}

// const TableComponent = forwardRef(TableComponentRef) as <
//   ObjectType extends { id: string }
// >(
//   p: TableComponentProps<ObjectType> & { ref?: Ref<RefProps> },
// ) => JSX.Element;

export default React.memo(TableComponent) as typeof TableComponent;
