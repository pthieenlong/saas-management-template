import { Box, IconButton, Image, Switch, Table, Text } from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import type { Category } from "@lib/mock/categories";

type Props = {
  category: Category;
  parentName: string | null;
  canEdit: boolean;
  onToggleActive: (category: Category) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export function CategoryTableItem({ category, parentName, canEdit, onToggleActive, onEdit, onDelete }: Props) {
  return (
    <Table.Row>
      <Table.Cell>
        <Box display="flex" alignItems="center" gap={3}>
          <Image
            src={category.imageUrl ?? "https://placehold.co/40x40/e2e8f0/64748b"}
            alt={category.name}
            boxSize="40px"
            objectFit="cover"
            borderRadius="md"
            flexShrink={0}
          />
          <Box>
            <Text
              fontWeight="medium"
              fontSize="sm"
              asChild
            >
              <Link to="/categories/$categoryId" params={{ categoryId: category.id }}>
                {category.name}
              </Link>
            </Text>
            <Text fontSize="xs" color="fg.muted">
              {category.slug}
            </Text>
          </Box>
        </Box>
      </Table.Cell>
      <Table.Cell>
        {parentName ? (
          <Text fontSize="sm">{parentName}</Text>
        ) : (
          <Text fontSize="sm" color="fg.muted">
            —
          </Text>
        )}
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="sm" color="fg.muted" textAlign="center">
          {category.sortOrder}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Switch.Root
          checked={category.isActive}
          onCheckedChange={() => onToggleActive(category)}
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
            aria-label="Sửa danh mục"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(category)}
          >
            <Pencil size={14} />
          </IconButton>
          <IconButton
            aria-label="Xóa danh mục"
            variant="ghost"
            size="sm"
            colorPalette="red"
            onClick={() => onDelete(category)}
          >
            <Trash2 size={14} />
          </IconButton>
        </Table.Cell>
      )}
    </Table.Row>
  );
}
