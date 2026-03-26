import { Flex, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

type ChartPanelProps = {
  title: string;
  children: ReactNode;
};

export function ChartPanel({ title, children }: ChartPanelProps) {
  return (
    <Flex
      direction="column"
      gap={3}
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      p={5}
    >
      <Text fontWeight="semibold" fontSize="sm">
        {title}
      </Text>
      {children}
    </Flex>
  );
}
