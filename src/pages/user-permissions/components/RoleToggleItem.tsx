import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import type { Role } from "@lib/mock/companies";

const ROLE_COLOR: Record<string, string> = {
  "role-admin": "primary",
  "role-manager": "accent",
  "role-cashier": "green",
  "role-warehouse": "orange",
};

interface RoleToggleItemProps {
  role: Role;
  permissionCount: number;
  isSelected: boolean;
  onSelect: (roleId: string) => void;
}

export function RoleToggleItem({
  role,
  permissionCount,
  isSelected,
  onSelect,
}: RoleToggleItemProps) {
  return (
    <Flex
      align="center"
      justify="space-between"
      px={4}
      py={3}
      cursor="pointer"
      bg={isSelected ? "colorPalette.subtle" : "transparent"}
      colorPalette={ROLE_COLOR[role.id] ?? "gray"}
      borderLeftWidth="3px"
      borderLeftColor={isSelected ? "colorPalette.500" : "transparent"}
      _hover={{ bg: isSelected ? "colorPalette.subtle" : "bg.surface" }}
      transition="all 0.15s"
      onClick={() => onSelect(role.id)}
    >
      <Box>
        <Text
          fontSize="sm"
          fontWeight={isSelected ? "semibold" : "medium"}
        >
          {role.name}
        </Text>
        <Text fontSize="xs" color="fg.muted" mt={0.5}>
          {permissionCount} quyền
        </Text>
      </Box>
      {isSelected && (
        <Badge size="sm" colorPalette={ROLE_COLOR[role.id] ?? "gray"} variant="subtle">
          Đang chọn
        </Badge>
      )}
    </Flex>
  );
}
