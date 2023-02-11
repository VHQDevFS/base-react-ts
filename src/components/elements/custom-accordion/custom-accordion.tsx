import React from 'react';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Skeleton,
} from '@chakra-ui/react';

import type { MaybeElementRenderProps } from '@/types';
import type {
  AccordionItemProps,
  AccordionPanelProps,
  AccordionProps,
  AccordionButtonProps,
} from '@chakra-ui/react';

interface IStateAccordion {
  isExpanded: boolean;
  isDisabled: boolean;
}

export interface IAccordionItem {
  title: MaybeElementRenderProps<IStateAccordion>;
  accordionItemProps?: Omit<AccordionItemProps, 'isDisabled'>;

  panel: MaybeElementRenderProps<IStateAccordion>;
  accordionPanelProps?: AccordionPanelProps;

  isDisabled?: boolean;

  accordionButtonProps?: AccordionButtonProps;
}

interface CustomAccordionProps extends AccordionProps {
  accordionItems: IAccordionItem[];
  isDisableAll?: boolean;
  isLoading?: boolean;
}

export const CustomAccordion = React.memo(
  ({
    accordionItems = [],
    isDisableAll = undefined,
    isLoading = false,
    ...accordionProps
  }: CustomAccordionProps) => (
    <Accordion allowMultiple {...accordionProps}>
      {accordionItems.map(
        (
          {
            panel,
            title,
            isDisabled = false,
            accordionButtonProps,
            accordionItemProps,
            accordionPanelProps,
          },
          index
        ) => (
          <AccordionItem
            key={index}
            border="none !important"
            isDisabled={isDisableAll || isLoading || isDisabled}
            {...accordionItemProps}
          >
            {(props) => {
              const titleRender = typeof title === 'function' ? title(props) : title;
              return (
                <>
                  <AccordionButton
                    py={{ base: 2, md: 3, lg: 4 }}
                    color={props.isExpanded ? 'primary' : 'textColor'}
                    rounded={8}
                    _hover={{ color: 'primary' }}
                    display="flex"
                    justifyContent="space-between"
                    {...accordionButtonProps}
                  >
                    {isLoading ? <Skeleton w="full" h="40px" /> : <>{titleRender}</>}
                    <AccordionIcon
                      fontWeight={400}
                      fontSize={{ base: '16px', md: '20px' }}
                      color={props.isExpanded ? 'primary' : 'textColor'}
                      _hover={{ color: 'primary' }}
                    />
                  </AccordionButton>

                  <AccordionPanel pb={4} px={0} {...accordionPanelProps}>
                    {typeof panel === 'function' ? panel(props) : panel}
                  </AccordionPanel>
                </>
              );
            }}
          </AccordionItem>
        )
      )}
    </Accordion>
  )
);
