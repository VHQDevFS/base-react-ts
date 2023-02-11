import { CloseButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import type { MenuProps, MenuItemProps, MenuButtonProps, MenuListProps } from '@chakra-ui/react';

export interface IActionMenuItems {
  label: React.ReactNode;
  icon?: React.ReactElement;
  onClick?: () => void;
  menuItemProps?: MenuItemProps;
}

export interface ActionMenuTableProps extends Omit<MenuProps, 'children'> {
  children: (props: {
    isOpen: boolean;
    onClose: () => void;
    forceUpdate: (() => void) | undefined;
  }) => React.ReactNode;

  actionMenuItems: IActionMenuItems[];

  menuButtonProps?: MenuButtonProps;

  menuListProps?: MenuListProps;
}

export function ActionMenuTable({
  children,
  actionMenuItems = [],
  menuListProps,
  menuButtonProps,
  ...menuProps
}: ActionMenuTableProps) {
  return (
    <Menu
      isLazy
      closeOnSelect
      direction="ltr"
      placement="left"
      strategy="absolute"
      offset={[0, -42]}
      {...menuProps}
    >
      {({ isOpen, onClose, forceUpdate }) => (
        <>
          <MenuButton {...menuButtonProps}>{children({ isOpen, onClose, forceUpdate })}</MenuButton>

          <MenuList
            w="755px"
            bg="primary"
            display="flex"
            flexDir="row"
            alignItems="center"
            overflow="hidden"
            rounded={0}
            roundedTopLeft={16}
            roundedBottomLeft={16}
            px={6}
            py="2%"
            h="full"
            {...menuListProps}
          >
            {actionMenuItems.map(({ label, icon, onClick, menuItemProps }) => (
              <MenuItem
                key={label?.toLocaleString()}
                icon={icon}
                flex={1}
                display="flex"
                minW="fit-content"
                alignItems="center"
                justifyContent="center"
                color="white"
                bg="primary"
                _focus={{
                  color: 'white',
                }}
                _hover={{
                  opacity: 0.8,
                }}
                fontSize="sm"
                _active={{}}
                textAlign="center"
                borderRight="1px"
                borderColor="secondary"
                _last={{
                  borderColor: 'transparent',
                }}
                onClick={onClick && onClick}
                {...menuItemProps}
              >
                {label}
              </MenuItem>
            ))}
            <CloseButton size="sm" color="white" ml="100px" onClick={onClose} />
          </MenuList>
        </>
      )}
    </Menu>
  );
}
