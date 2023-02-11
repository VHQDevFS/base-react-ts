import { Spinner } from '@chakra-ui/react';

interface AdditionalFeatureProps {
  isLoading?: boolean;
}

export function AdditionalFeature({ isLoading = false }: AdditionalFeatureProps) {
  return isLoading ? (
    <Spinner size="md" />
  ) : (
    // <Flex justify="center" p={5}>
    //   <Icon fontSize="15px" cursor="pointer" color="black" as={AdditionalIcon} />
    // </Flex>

    <>Open</>
  );
}
