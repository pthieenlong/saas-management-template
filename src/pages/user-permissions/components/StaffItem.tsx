import { Flex, Text, Box, Avatar, Badge } from "@chakra-ui/react";
import type { User, Role } from "@lib/mock/companies";

interface StaffItemProps {
  user: User;
  role: Role;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function StaffItem({ user, role, isSelected, onSelect }: StaffItemProps) {
  return (
    <Flex
      align="center"
      gap={3}
      px={4}
      py={2.5}
      cursor="pointer"
      bg={isSelected ? "colorPalette.subtle" : "transparent"}
      colorPalette="primary"
      _hover={{ bg: isSelected ? "colorPalette.subtle" : "bg.surface" }}
      onClick={() => onSelect(user.id)}
    >
      <Avatar.Root size="sm" colorPalette="primary">
        <Avatar.Fallback name={user.name} />
      </Avatar.Root>
      <Box flex={1} minW={0}>
        <Text fontSize="sm" fontWeight={isSelected ? "semibold" : "normal"} truncate>
          {user.name}
        </Text>
        <Text fontSize="xs" color="fg.muted" truncate>
          {user.email}
        </Text>
      </Box>
      <Badge size="sm" colorPalette="gray" flexShrink={0}>
        {role.name}
      </Badge>
    </Flex>
  );
}
