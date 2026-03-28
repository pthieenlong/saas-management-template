import { Flex, Text, Box, Avatar } from "@chakra-ui/react";
import type { User } from "@lib/mock/companies";

interface UserItemProps {
  user: User;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function UserItem({ user, isSelected, onSelect }: UserItemProps) {
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
          {user.role}
        </Text>
      </Box>
    </Flex>
  );
}
