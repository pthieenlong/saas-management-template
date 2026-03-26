import { Table } from "@chakra-ui/react";
import { type Product, ProductItem } from "./ProductItem";

type Props = {
  products: Product[];
};

export function ProductList({ products }: Props) {
  return (
    <Table.Root size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Sản phẩm</Table.ColumnHeader>
          <Table.ColumnHeader>Danh mục</Table.ColumnHeader>
          <Table.ColumnHeader>Giá bán</Table.ColumnHeader>
          <Table.ColumnHeader>Tồn kho</Table.ColumnHeader>
          <Table.ColumnHeader>Trạng thái</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
