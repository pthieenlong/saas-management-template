import { Badge, Box, Image, Table, Text } from "@chakra-ui/react";

export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "out_of_stock";
  image?: string;
};

const STATUS_MAP: Record<Product["status"], { label: string; colorPalette: string }> = {
  active: { label: "Đang bán", colorPalette: "green" },
  inactive: { label: "Ngừng bán", colorPalette: "gray" },
  out_of_stock: { label: "Hết hàng", colorPalette: "red" },
};

type Props = {
  product: Product;
};

export function ProductItem({ product }: Props) {
  const status = STATUS_MAP[product.status];

  return (
    <Table.Row>
      <Table.Cell>
        <Box display="flex" alignItems="center" gap={3}>
          <Image
            src={product.image ?? `https://placehold.co/40x40`}
            alt={product.name}
            boxSize="40px"
            objectFit="cover"
            borderRadius="md"
            flexShrink={0}
          />
          <Box>
            <Text fontWeight="medium" fontSize="sm" lineClamp={1}>
              {product.name}
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {product.sku}
            </Text>
          </Box>
        </Box>
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="sm">{product.category}</Text>
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="sm" fontWeight="medium">
          {product.price.toLocaleString("vi-VN")}₫
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="sm">{product.stock}</Text>
      </Table.Cell>
      <Table.Cell>
        <Badge colorPalette={status.colorPalette} size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
    </Table.Row>
  );
}
