import { Flex, Input, NativeSelect } from "@chakra-ui/react";
import { MOCK_CATEGORIES } from "@lib/mock/categories";

export type CategoryFilters = {
  search: string;
  parentId: string;
  status: string;
};

type Props = {
  filters: CategoryFilters;
  onChange: (filters: CategoryFilters) => void;
};

const rootCategories = MOCK_CATEGORIES.filter((c) => c.parentId === null);

export function CategoryFilterBar({ filters, onChange }: Props) {
  return (
    <Flex gap={3} flexWrap="wrap">
      <Input
        placeholder="Tìm theo tên hoặc slug..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        maxW="280px"
      />
      <NativeSelect.Root maxW="200px">
        <NativeSelect.Field
          value={filters.parentId}
          onChange={(e) => onChange({ ...filters, parentId: e.target.value })}
        >
          <option value="">Tất cả cấp</option>
          <option value="__root__">Danh mục gốc</option>
          {rootCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </NativeSelect.Field>
      </NativeSelect.Root>
      <NativeSelect.Root maxW="160px">
        <NativeSelect.Field
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Ẩn</option>
        </NativeSelect.Field>
      </NativeSelect.Root>
    </Flex>
  );
}
