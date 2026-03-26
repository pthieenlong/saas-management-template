import { Box, Flex, Input, NativeSelect } from "@chakra-ui/react";
import { Search } from "lucide-react";

export type ProductFilters = {
  search: string;
  category: string;
  status: string;
};

type Props = {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
};

const CATEGORY_OPTIONS = [
  { value: "", label: "Tất cả danh mục" },
  { value: "electronics", label: "Điện tử" },
  { value: "clothing", label: "Thời trang" },
  { value: "food", label: "Thực phẩm" },
  { value: "furniture", label: "Nội thất" },
];

const STATUS_OPTIONS = [
  { value: "", label: "Tất cả trạng thái" },
  { value: "active", label: "Đang bán" },
  { value: "inactive", label: "Ngừng bán" },
  { value: "out_of_stock", label: "Hết hàng" },
];

export function ProductFilterBar({ filters, onChange }: Props) {
  return (
    <Flex gap={3} align="center">
      <Box position="relative" flex="1">
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
          placeholder="Tìm theo tên hoặc SKU..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          size="sm"
        />
      </Box>

      <NativeSelect.Root size="sm" w="160px" flexShrink={0}>
        <NativeSelect.Field
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
        >
          {CATEGORY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>

      <NativeSelect.Root size="sm" w="160px" flexShrink={0}>
        <NativeSelect.Field
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Flex>
  );
}
