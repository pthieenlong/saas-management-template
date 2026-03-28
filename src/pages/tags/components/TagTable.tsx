import { Table } from "@chakra-ui/react";
import type { Tag } from "@lib/mock/tags";
import { TagTableItem } from "./TagTableItem";

type Props = {
  tags: Tag[];
  canEdit: boolean;
  onToggleActive: (tag: Tag) => void;
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
};

export function TagTable({ tags, canEdit, onToggleActive, onEdit, onDelete }: Props) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row >
          <Table.ColumnHeader>Tên tag</Table.ColumnHeader>
          <Table.ColumnHeader>Slug</Table.ColumnHeader>
          <Table.ColumnHeader>Hiển thị</Table.ColumnHeader>
          {canEdit && <Table.ColumnHeader textAlign="end">Thao tác</Table.ColumnHeader>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tags.map((tag) => (
          <TagTableItem
            key={tag.id}
            tag={tag}
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
