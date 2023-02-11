import { Modal, ModalContent, ModalOverlay, Spinner } from '@chakra-ui/react';

import { useGlobalLoadingStore } from '@/contexts';

export function GlobalLoading() {
  const { isLoading } = useGlobalLoadingStore();
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
      motionPreset="none"
      isOpen={isLoading}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClose={() => {}}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent bg="none" p={0} w="max-content" shadow="none">
        <Spinner size="xl" />
      </ModalContent>
    </Modal>
  );
}
