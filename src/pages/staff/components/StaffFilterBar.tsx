import { Flex, Input, NativeSelect, Box } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { MOCK_ROLES } from "@lib/mock/companies";

export type StaffFilters = {
  search: string;
  status: "" | "active" | "inactive";
  roleId: string;
};

interface StaffFilterBarProps {
  filters: StaffFilters;
  onChange: (filters: StaffFilters) => void;
  showRoleFilter: boolean;
}

export function StaffFilterBar({ filters, onChange, showRoleFilter }: StaffFilterBarProps) {
  return (
    <Flex gap={2} align="center">
      <Box position="relative" flex={1}>
        <Box
          position="absolute"
          left={3}
          top="50%"
          transform="translateY(-50%)"
          color="fg.muted"
          pointerEvents="none"
        >
          <Search size={14} />
        </Box>
        <Input
          pl={8}
          placeholder="Tìm theo tên hoặc email..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          size="sm"
        />
      </Box>

      <NativeSelect.Root size="sm" w="160px">
        <NativeSelect.Field
          value={filters.status}
          onChange={(e) =>
            onChange({ ...filters, status: e.target.value as StaffFilters["status"] })
          }
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang hoạt động</option>
          <option value="inactive">Ngừng hoạt động</option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      {showRoleFilter && (
        <NativeSelect.Root size="sm" w="140px">
          <NativeSelect.Field
            value={filters.roleId}
            onChange={(e) => onChange({ ...filters, roleId: e.target.value })}
          >
            <option value="">Tất cả role</option>
            {MOCK_ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      )}
    </Flex>
  );
}
