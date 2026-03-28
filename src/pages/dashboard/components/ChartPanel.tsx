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
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.muted"
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
