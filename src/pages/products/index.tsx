import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { usePagination } from "@hooks/usePagination";
import { TablePagination } from "@components/TablePagination";
import {
  ProductFilterBar,
  type ProductFilters,
} from "./components/ProductFilterBar";
import { ProductList } from "./components/ProductList";
import { type Product } from "./components/ProductItem";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    sku: "SKU-001",
    name: "Áo thun basic unisex",
    category: "Thời trang",
    price: 199000,
    stock: 120,
    status: "active",
  },
  {
    id: "2",
    sku: "SKU-002",
    name: "Tai nghe không dây Bluetooth",
    category: "Điện tử",
    price: 850000,
    stock: 45,
    status: "active",
  },
  {
    id: "3",
    sku: "SKU-003",
    name: "Cà phê rang xay Arabica 500g",
    category: "Thực phẩm",
    price: 320000,
    stock: 0,
    status: "out_of_stock",
  },
  {
    id: "4",
    sku: "SKU-004",
    name: "Ghế văn phòng ergonomic",
    category: "Nội thất",
    price: 4500000,
    stock: 8,
    status: "active",
  },
  {
    id: "5",
    sku: "SKU-005",
    name: "Quần jean slim fit nam",
    category: "Thời trang",
    price: 450000,
    stock: 60,
    status: "inactive",
  },
  {
    id: "6",
    sku: "SKU-006",
    name: "Loa bluetooth mini",
    category: "Điện tử",
    price: 590000,
    stock: 30,
    status: "active",
  },
];

const CATEGORY_LABEL_MAP: Record<string, string> = {
  electronics: "Điện tử",
  clothing: "Thời trang",
  food: "Thực phẩm",
  furniture: "Nội thất",
};

export function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    search: "",
    category: "",
    status: "",
  });

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const q = filters.search.trim().toLowerCase();
    if (
      q &&
      !p.name.toLowerCase().includes(q) &&
      !p.sku.toLowerCase().includes(q)
    ) {
      return false;
    }
    if (
      filters.category &&
      p.category !== CATEGORY_LABEL_MAP[filters.category]
    ) {
      return false;
    }
    if (filters.status && p.status !== filters.status) {
      return false;
    }
    return true;
  });

  const pagination = usePagination(filtered, 10);

  return (
    <Flex direction="column" gap={5}>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="lg">Sản phẩm</Heading>
          <Text fontSize="sm" color="fg.muted" mt={1}>
            Quản lý toàn bộ danh sách sản phẩm
          </Text>
        </Box>
        <Button size="sm" colorPalette="primary">
          <Plus size={14} />
          Thêm sản phẩm
        </Button>
      </Flex>

      <ProductFilterBar filters={filters} onChange={setFilters} />

      {filtered.length === 0 ? (
        <Flex align="center" justify="center" h="200px" color="fg.muted">
          <Text fontSize="sm">Không tìm thấy sản phẩm nào</Text>
        </Flex>
      ) : (
        <Box
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.muted"
          borderRadius="lg"
          overflow="hidden"
        >
          <Flex
            px={4}
            py={3}
            borderBottomWidth="1px"
            borderColor="border.muted"
            align="center"
            justify="space-between"
          >
            <Text fontSize="sm" color="fg.muted">
              {filtered.length} sản phẩm
            </Text>
          </Flex>
          <ProductList products={pagination.paginatedItems} />
          <TablePagination
            page={pagination.page}
            totalCount={pagination.totalCount}
            pageSize={pagination.pageSize}
            onPageChange={pagination.setPage}
          />
        </Box>
      )}
    </Flex>
  );
}
