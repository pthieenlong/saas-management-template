import { Table } from "@chakra-ui/react";
import { MOCK_CATEGORIES, type Category } from "@lib/mock/categories";
import { CategoryTableItem } from "./CategoryTableItem";

type Props = {
  categories: Category[];
  canEdit: boolean;
  onToggleActive: (category: Category) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoryTable({ categories, canEdit, onToggleActive, onEdit, onDelete }: Props) {
  const parentMap = Object.fromEntries(
    MOCK_CATEGORIES.map((c) => [c.id, c.name]),
  );

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row >
          <Table.ColumnHeader>Tên danh mục</Table.ColumnHeader>
          <Table.ColumnHeader>Danh mục cha</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="center">Thứ tự</Table.ColumnHeader>
          <Table.ColumnHeader>Trạng thái</Table.ColumnHeader>
          {canEdit && <Table.ColumnHeader textAlign="end">Thao tác</Table.ColumnHeader>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {categories.map((category) => (
          <CategoryTableItem
            key={category.id}
            category={category}
            parentName={category.parentId ? (parentMap[category.parentId] ?? null) : null}
            canEdit={canEdit}
            onToggleActive={onToggleActive}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
