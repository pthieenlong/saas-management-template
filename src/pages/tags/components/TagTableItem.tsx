import { Badge, Box, IconButton, Switch, Table, Text } from "@chakra-ui/react";
import { Pencil, Trash2 } from "lucide-react";
import type { Tag } from "@lib/mock/tags";

type Props = {
  tag: Tag;
  canEdit: boolean;
  onToggleActive: (tag: Tag) => void;
  onEdit: (tag: Tag) => void;
  onDelete: (tag: Tag) => void;
};

export function TagTableItem({ tag, canEdit, onToggleActive, onEdit, onDelete }: Props) {
  return (
    <Table.Row>
      <Table.Cell>
        <Text fontWeight="medium">{tag.name}</Text>
      </Table.Cell>
      <Table.Cell>
        <Box>
          <Badge variant="outline" colorPalette="gray" fontSize="xs">
            {tag.slug}
          </Badge>
        </Box>
      </Table.Cell>
      <Table.Cell>
        <Switch.Root
          checked={tag.isActive}
          onCheckedChange={() => onToggleActive(tag)}
          disabled={!canEdit}
          colorPalette="primary"
          size="sm"
        >
          <Switch.HiddenInput />
          <Switch.Control />
        </Switch.Root>
      </Table.Cell>
      {canEdit && (
        <Table.Cell textAlign="end">
          <IconButton
            aria-label="Sửa tag"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(tag)}
          >
            <Pencil size={14} />
          </IconButton>
          <IconButton
            aria-label="Xóa tag"
            variant="ghost"
            size="sm"
            colorPalette="red"
            onClick={() => onDelete(tag)}
          >
            <Trash2 size={14} />
          </IconButton>
        </Table.Cell>
      )}
    </Table.Row>
  );
}
