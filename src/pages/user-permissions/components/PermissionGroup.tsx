import { Box, Badge, Checkbox, Flex, Text, Tooltip } from "@chakra-ui/react";
import { MinusCircle } from "lucide-react";
import type { Permission } from "@lib/mock/companies";

interface PermissionGroupProps {
  group: string;
  permissions: Permission[];
  hasPermission: (id: string) => boolean;
  isFromRole: (id: string) => boolean;
  isRevoked: (id: string) => boolean;
  onToggle: (id: string) => void;
}

export function PermissionGroup({
  group,
  permissions,
  hasPermission,
  isFromRole,
  isRevoked,
  onToggle,
}: PermissionGroupProps) {
  const allChecked = permissions.every((p) => hasPermission(p.id));
  const someChecked = permissions.some((p) => hasPermission(p.id));

  const handleGroupToggle = () => {
    if (allChecked) {
      permissions.forEach((p) => { if (hasPermission(p.id)) onToggle(p.id); });
    } else {
      permissions.forEach((p) => { if (!hasPermission(p.id)) onToggle(p.id); });
    }
  };

  return (
    <Box bg="bg.panel" borderWidth="1px" borderColor="border.subtle" borderRadius="lg" overflow="hidden">
      <Flex
        px={4}
        py={3}
        borderBottomWidth="1px"
        borderColor="border.subtle"
        align="center"
        gap={3}
        cursor="pointer"
        onClick={handleGroupToggle}
        _hover={{ bg: "bg.subtle" }}
      >
        <Checkbox.Root
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onCheckedChange={handleGroupToggle}
          onClick={(e) => e.stopPropagation()}
        >
          <Checkbox.HiddenInput />
          <Checkbox.Control />
        </Checkbox.Root>
        <Text fontWeight="semibold" fontSize="sm">
          {group}
        </Text>
        <Text fontSize="xs" color="fg.muted">
          ({permissions.filter((p) => hasPermission(p.id)).length}/{permissions.length})
        </Text>
      </Flex>

      <Box px={4} py={2}>
        {permissions.map((perm) => {
          const fromRole = isFromRole(perm.id);
          const revoked = isRevoked(perm.id);
          return (
            <Flex
              key={perm.id}
              align="center"
              gap={3}
              py={2}
              cursor="pointer"
              onClick={() => onToggle(perm.id)}
              _hover={{ color: "colorPalette.600" }}
              colorPalette="blue"
            >
              <Checkbox.Root
                checked={hasPermission(perm.id)}
                onCheckedChange={() => onToggle(perm.id)}
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control />
              </Checkbox.Root>
              <Text fontSize="sm">{perm.label}</Text>
              <Text fontSize="xs" color="fg.muted" fontFamily="mono">
                {perm.id}
              </Text>
              {fromRole && (
                <Badge size="sm" colorPalette="blue" variant="subtle" ml="auto">
                  Role
                </Badge>
              )}
              {revoked && (
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Flex align="center" color="red.500" ml={fromRole ? 1 : "auto"}>
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
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}
