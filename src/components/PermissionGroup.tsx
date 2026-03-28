import { Badge, Box, Flex, Switch, Text, Tooltip } from "@chakra-ui/react";
import { MinusCircle } from "lucide-react";
import type { Permission } from "@lib/mock/companies";

interface PermissionGroupProps {
  group: string;
  permissions: Permission[];
  hasPermission: (id: string) => boolean;
  onToggle: (id: string) => void;
  onToggleGroup: (ids: string[]) => void;
  isFromRole?: (id: string) => boolean;
  isRevoked?: (id: string) => boolean;
}

export function PermissionGroup({
  group,
  permissions,
  hasPermission,
  onToggle,
  onToggleGroup,
  isFromRole,
  isRevoked,
}: PermissionGroupProps) {
  const permIds = permissions.map((p) => p.id);
  const checkedCount = permissions.filter((p) => hasPermission(p.id)).length;
  const allChecked = checkedCount === permissions.length;

  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.muted"
      borderRadius="lg"
      overflow="hidden"
    >
      {/* Group header */}
      <Flex
        px={4}
        py={3}
        borderBottomWidth="1px"
        borderColor="border.muted"
        align="center"
        gap={3}
        cursor="pointer"
        _hover={{ bg: "bg.surface" }}
        onClick={() => onToggleGroup(permIds)}
      >
        <Text fontWeight="semibold" fontSize="sm" flex={1}>
          {group}
        </Text>
        <Text fontSize="xs" color="fg.muted" mr={2}>
          {checkedCount}/{permissions.length}
        </Text>
        <Switch.Root
          checked={allChecked}
          colorPalette="primary"
          size="sm"
          onCheckedChange={() => onToggleGroup(permIds)}
          onClick={(e) => e.stopPropagation()}
        >
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </Flex>

      {/* Permission rows */}
      <Box py={1}>
        {permissions.map((perm) => {
          const fromRole = isFromRole?.(perm.id);
          const revoked = isRevoked?.(perm.id);
          return (
            <Flex
              key={perm.id}
              align="center"
              gap={3}
              px={4}
              py={2.5}
              cursor="pointer"
              _hover={{ bg: "bg.surface" }}
              onClick={() => onToggle(perm.id)}
            >
              <Text fontSize="sm" flex={1}>
                {perm.label}
              </Text>
              <Text fontSize="xs" color="fg.muted" fontFamily="mono">
                {perm.id}
              </Text>
              {fromRole && (
                <Badge size="sm" colorPalette="primary" variant="subtle">
                  Role
                </Badge>
              )}
              {revoked && (
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Flex align="center" color="red.500">
                      <MinusCircle size={12} />
                    </Flex>
                  </Tooltip.Trigger>
                  <Tooltip.Positioner>
                    <Tooltip.Content>
                      <Tooltip.Arrow />
                      Đã thu hồi — quyền mặc định của Role bị tắt
                    </Tooltip.Content>
                  </Tooltip.Positioner>
                </Tooltip.Root>
              )}
              <Switch.Root
                checked={hasPermission(perm.id)}
                colorPalette="primary"
                size="sm"
                onCheckedChange={() => onToggle(perm.id)}
                onClick={(e) => e.stopPropagation()}
              >
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
