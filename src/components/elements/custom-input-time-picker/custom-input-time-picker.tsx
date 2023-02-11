import { useState } from 'react';

import { Box, Button, HStack, Text } from '@chakra-ui/react';

import type { StackProps } from '@chakra-ui/react';

export interface CustomInputTimePickerProps extends Omit<StackProps, 'onChange'> {
  onChange: (values: string) => void;
  onClose?: () => void;
  isDisable?: boolean;
}

const hoursData = [...Array(24).keys()].map((i) => ({
  value: String(i),
}));

const minutesData = [{ value: '00' }, { value: '30' }];

export function CustomInputTimePicker({
  onChange,
  onClose,
  ...stackProps
}: CustomInputTimePickerProps) {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const handleChangeValue = () => {
    const value = `${hour}:${minute}`;
    onChange(value);
    onClose && onClose();
  };

  return (
    <Box>
      <HStack
        p={3}
        dir="row"
        rounded={12}
        top={0}
        bg="white"
        left={0}
        boxShadow="-4px 4px 13px 2px rgb(0 0 0 / 15%)"
        right={0}
        pos="absolute"
        align="flex-start"
        {...stackProps}
      >
        <Box
          maxH="120px"
          overflow="auto"
          flex={1}
          borderRight="1px"
          borderColor="secondary"
          sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
        >
          {hoursData.map((item) => (
            <Text
              key={item.value}
              cursor="pointer"
              bg={item.value === hour ? 'primary' : 'white'}
              rounded={4}
              _hover={{ bg: 'primary', color: 'white' }}
              p={2}
              fontWeight={500}
              textAlign="center"
              color={item.value === hour ? 'white' : 'textColor'}
              m={0}
              onClick={() => setHour(item.value)}
            >
              {item.value}
            </Text>
          ))}
        </Box>
        <Box h="120px" overflow="auto" flex={1} borderRight="1px" borderColor="secondary">
          {minutesData.map((item) => (
            <Text
              key={item.value}
              bg={item.value === minute ? 'primary' : 'white'}
              cursor="pointer"
              rounded={4}
              _hover={{ bg: 'primary', color: 'white' }}
              p={2}
              fontWeight={500}
              textAlign="center"
              color={item.value === minute ? 'white' : 'textColor'}
              m={0}
              onClick={() => setMinute(item.value)}
            >
              {item.value}
            </Text>
          ))}
        </Box>
        <Button
          isDisabled={!hour || !minute}
          w="20px"
          h="20px"
          fontSize="12px"
          onClick={handleChangeValue}
        >
          Ok
        </Button>
      </HStack>
    </Box>
  );
}
