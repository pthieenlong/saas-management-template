import { Flex } from "@chakra-ui/react";
import { StoreRevenueItem } from "./StoreRevenueItem";
import type { Company } from "@features/company";

type StoreRevenueListProps = {
  branches: Company[];
};

export function StoreRevenueList({ branches }: StoreRevenueListProps) {
  return (
    <Flex
      direction="column"
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.muted"
      borderRadius="xl"
      overflow="hidden"
    >
      {branches.map((branch, index) => (
        <StoreRevenueItem
          key={branch.id}
          name={branch.name}
          address={branch.address ?? ""}
          orderCount={branch.orderCount ?? 0}
          revenue={branch.revenue ?? 0}
          isFirst={index === 0}
        />
      ))}
    </Flex>
  );
}
