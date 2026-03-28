import { Flex, Text } from "@chakra-ui/react";
import { formatRevenue } from "@utils/format";

type StoreRevenueItemProps = {
  name: string;
  address: string;
  orderCount: number;
  revenue: number;
  isFirst: boolean;
};

export function StoreRevenueItem({
  name,
  address,
  orderCount,
  revenue,
  isFirst,
}: StoreRevenueItemProps) {
  return (
    <Flex
      align="center"
      px={5}
      py={3.5}
      gap={4}
      borderTopWidth={isFirst ? 0 : "1px"}
      borderColor="border.muted"
      _hover={{ bg: "bg.surface" }}
    >
      <Text flex={1} fontWeight="medium" fontSize="sm">
        {name}
      </Text>
      <Text fontSize="sm" color="fg.muted" display={{ base: "none", md: "block" }}>
        {address}
      </Text>
      <Text fontSize="sm" color="fg.muted" w="80px" textAlign="right">
        {orderCount} đơn
      </Text>
      <Text fontWeight="semibold" fontSize="sm" w="120px" textAlign="right">
        {revenue > 0 ? formatRevenue(revenue) : "—"}
      </Text>
    </Flex>
  );
}
