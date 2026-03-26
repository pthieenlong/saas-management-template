import { Box, Flex, Text } from "@chakra-ui/react";
import type { LucideIcon } from "lucide-react";

type KpiCardProps = {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  color: string;
};

export function KpiCard({ label, value, sub, icon: Icon, color }: KpiCardProps) {
  return (
    <Flex
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      p={5}
      align="center"
      gap={4}
    >
      <Flex
        w={11}
        h={11}
        borderRadius="lg"
        bg={`${color}.subtle`}
        color={`${color}.fg`}
        align="center"
        justify="center"
        flexShrink={0}
      >
        <Box as={Icon} boxSize={5} />
      </Flex>
      <Flex direction="column" gap={0.5}>
        <Text fontSize="sm" color="fg.muted">
          {label}
        </Text>
        <Text fontWeight="bold" fontSize="xl">
          {value}
        </Text>
        {sub && (
          <Text fontSize="xs" color="fg.subtle">
            {sub}
          </Text>
        )}
      </Flex>
    </Flex>
  );
}
