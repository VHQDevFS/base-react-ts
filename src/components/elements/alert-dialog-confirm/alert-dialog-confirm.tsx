import React from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import type { AlertDialogProps, UseDisclosureProps } from '@chakra-ui/react';

interface AlertDialogConfirmProps extends Partial<AlertDialogProps> {
  type?: 'info' | 'error';
  title?: React.ReactNode;
  description?: string;
  textConfirm?: string;

  isLoading?: boolean;

  onHandleConfirm: (props: UseDisclosureProps) => void;

  isDone?: boolean;
}

export type AlertDialogConfirmHandle = {
  showAlert: () => void;
  hideAlert: () => void;
  isOpenAlert: boolean;
};

export const useAlertDialogRef = () => React.useRef<AlertDialogConfirmHandle>(null);

export const AlertDialogConfirm = React.forwardRef<
  AlertDialogConfirmHandle,
  AlertDialogConfirmProps
>((props, ref) => {
  const {
    title = 'Confirmation?',
    description = `Are you sure? You can't undo this action afterwards.`,
    textConfirm = 'OK',
    type = 'error',
    isLoading = false,
    isDone = false,
    onHandleConfirm,

    ...restAlertProps
  } = props;
  const disclosure = useDisclosure();

  const { isOpen, onOpen, onClose: onCloseDisclosure } = disclosure;

  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const onClose = React.useCallback(() => {
    if (isLoading) return;
    onCloseDisclosure();
  }, [isLoading, onCloseDisclosure]);

  React.useImperativeHandle(ref, () => ({
    showAlert: onOpen,
    hideAlert: onClose,
    isOpenAlert: isOpen,
  }));

  React.useEffect(() => {
    if (isDone) {
      onClose();
    }
  }, [isDone, onClose]);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      {...restAlertProps}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="semibold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              variant="ghost"
              border="1px"
              borderColor="transparent"
              color="textColor"
              _hover={{
                borderColor: 'primary',
              }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              minW="80px"
              bg={type === 'error' ? 'red.600' : 'primary'}
              _hover={{
                bg: type === 'error' ? 'red.600' : 'primary',
                opacity: 0.8,
              }}
              ml={3}
              isLoading={isLoading}
              isDisabled={isLoading}
              onClick={() => onHandleConfirm(disclosure)}
            >
              {textConfirm}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
});
