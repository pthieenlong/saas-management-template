import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Badge,
  IconButton,
  Collapsible,
} from "@chakra-ui/react";
import {
  ChevronRight,
  ChevronDown,
  Building2,
  GitBranch,
  Layers,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import type { Company } from "@features/company";

interface CompanyTreeItemProps {
  company: Company;
  depth?: number;
  selectedId?: string;
  onSelect?: (company: Company) => void;
  onEdit?: (company: Company) => void;
  onDelete?: (id: string) => void;
  onAdd?: (parentId: string) => void;
}

const TYPE_ICON: Record<Company["type"], typeof Building2> = {
  group: Layers,
  company: Building2,
  branch: GitBranch,
};

const TYPE_LABEL: Record<Company["type"], string> = {
  group: "Tập đoàn",
  company: "Công ty",
  branch: "Chi nhánh",
};

export function CompanyTreeItem({
  company,
  depth = 0,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
  onAdd,
}: CompanyTreeItemProps) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = company.children && company.children.length > 0;
  const Icon = TYPE_ICON[company.type];
  const isSelected = selectedId === company.id;

  return (
    <Box>
      <Flex
        align="center"
        gap={2}
        py={2}
        px={3}
        pl={`${12 + depth * 24}px`}
        borderRadius="md"
        bg={isSelected ? "colorPalette.subtle" : undefined}
        colorPalette="primary"
        _hover={{ bg: isSelected ? "colorPalette.subtle" : "bg.surface" }}
        role="group"
        cursor={onSelect ? "pointer" : "default"}
        onClick={() => onSelect?.(company)}
      >
        {/* Expand toggle */}
        <Box w={5} flexShrink={0}>
          {hasChildren ? (
            <IconButton
              aria-label={expanded ? "Thu gọn" : "Mở rộng"}
              variant="ghost"
              size="xs"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </IconButton>
          ) : null}
        </Box>

        {/* Icon */}
        <Box color={company.status === "active" ? "colorPalette.600" : "fg.muted"} colorPalette="primary">
          <Icon size={16} />
        </Box>

        {/* Name & meta */}
        <Flex flex={1} align="center" gap={2} minW={0}>
          <Text fontWeight={depth === 0 ? "bold" : "medium"} fontSize="sm" truncate>
            {company.name}
          </Text>
          <Text fontSize="xs" color="fg.muted" flexShrink={0}>
            ({company.code})
          </Text>
          <Badge
            size="sm"
            colorPalette={company.status === "active" ? "green" : "gray"}
            flexShrink={0}
          >
            {TYPE_LABEL[company.type]}
          </Badge>
          {company.status === "inactive" && (
            <Badge size="sm" colorPalette="red" flexShrink={0}>
              Tạm ngưng
            </Badge>
          )}
        </Flex>

        {/* Actions — only shown when edit handlers are provided */}
        {(onEdit ?? onDelete ?? onAdd) && (
          <Flex gap={1} opacity={0} _groupHover={{ opacity: 1 }} transition="opacity 0.15s" flexShrink={0}>
            {company.type !== "branch" && onAdd && (
              <IconButton
                aria-label="Thêm con"
                variant="ghost"
                size="xs"
                colorPalette="primary"
                onClick={(e) => { e.stopPropagation(); onAdd(company.id); }}
              >
                <Plus size={13} />
              </IconButton>
            )}
            {onEdit && (
              <IconButton
                aria-label="Sửa"
                variant="ghost"
                size="xs"
                onClick={(e) => { e.stopPropagation(); onEdit(company); }}
              >
                <Pencil size={13} />
              </IconButton>
            )}
            {onDelete && (
              <IconButton
                aria-label="Xóa"
                variant="ghost"
                size="xs"
                colorPalette="red"
                onClick={(e) => { e.stopPropagation(); onDelete(company.id); }}
              >
                <Trash2 size={13} />
              </IconButton>
            )}
          </Flex>
        )}
      </Flex>

      {hasChildren && (
        <Collapsible.Root open={expanded}>
          <Collapsible.Content>
            {company.children!.map((child) => (
              <CompanyTreeItem
                key={child.id}
                company={child}
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                onEdit={onEdit}
                onDelete={onDelete}
                onAdd={onAdd}
              />
            ))}
          </Collapsible.Content>
        </Collapsible.Root>
      )}
    </Box>
  );
}
