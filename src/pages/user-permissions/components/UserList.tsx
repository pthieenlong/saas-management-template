import { Stack, Flex, Text, Box } from "@chakra-ui/react";
import type { User } from "@lib/mock/companies";
import { UserItem } from "./UserItem";

interface UserListProps {
  users: User[];
  selectedUserId: string;
  onSelect: (id: string) => void;
}

export function UserList({ users, selectedUserId, onSelect }: UserListProps) {
  return (
    <Box bg="bg.surface" borderWidth="1px" borderColor="border.muted" borderRadius="lg" overflow="hidden">
      <Flex px={4} py={3} borderBottomWidth="1px" borderColor="border.muted">
        <Text fontWeight="semibold" fontSize="sm">
          Danh sách người dùng
        </Text>
      </Flex>
      <Stack gap={0} py={1}>
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            isSelected={user.id === selectedUserId}
            onSelect={onSelect}
          />
        ))}
      </Stack>
    </Box>
  );
}
