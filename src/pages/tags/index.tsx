import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { MOCK_TAGS, type Tag } from "@lib/mock/tags";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { usePagination } from "@hooks/usePagination";
import { TablePagination } from "@components/TablePagination";
import { TagTable } from "./components/TagTable";
import { TagFormModal } from "./components/TagFormModal";
import type { TagFormValues } from "./schemas/tagSchema";

export function TagsPage() {
  const [tags, setTags] = useState<Tag[]>(MOCK_TAGS);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);

  const { isAdmin } = useCurrentUser();

  const filtered = tags.filter(
    (t) =>
      !search.trim() ||
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.includes(search.toLowerCase()),
  );

  const pagination = usePagination(filtered, 10);

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    setIsModalOpen(true);
  };

  const handleToggleActive = (tag: Tag) => {
    setTags((prev) =>
      prev.map((t) => (t.id === tag.id ? { ...t, isActive: !t.isActive } : t)),
    );
  };

  const handleDelete = (tag: Tag) => {
    setTags((prev) => prev.filter((t) => t.id !== tag.id));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTag(null);
  };

  const handleSubmit = (values: TagFormValues, id?: string) => {
    if (id) {
      setTags((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...values } : t)),
      );
    } else {
      const newTag: Tag = {
        id: `tag-${Date.now()}`,
        name: values.name,
        slug: values.slug,
        isActive: true,
      };
      setTags((prev) => [...prev, newTag]);
    }
  };

  return (
    <Flex direction="column" gap={5}>
      <Flex align="center" justify="space-between">
        <Box>
          <Heading size="lg">Tags sản phẩm</Heading>
          <Text fontSize="sm" color="fg.muted" mt={1}>
            Quản lý tags dùng chung cho sản phẩm và bài viết
          </Text>
        </Box>
        <Flex align="center" gap={3}>
          <Text fontSize="sm" color="fg.muted">
            {filtered.length} tags
          </Text>
          {isAdmin && (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus size={14} />
              Thêm tag
            </Button>
          )}
        </Flex>
      </Flex>

      <Input
        placeholder="Tìm theo tên hoặc slug..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        maxW="320px"
      />

      {filtered.length === 0 ? (
        <Flex align="center" justify="center" h="200px" color="fg.muted">
          <Text fontSize="sm">Không tìm thấy tag nào</Text>
        </Flex>
      ) : (
        <Box
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.muted"
          borderRadius="lg"
          overflow="hidden"
        >
          <TagTable
            tags={pagination.paginatedItems}
            canEdit={isAdmin}
            onToggleActive={handleToggleActive}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <TablePagination
            page={pagination.page}
            totalCount={pagination.totalCount}
            pageSize={pagination.pageSize}
            onPageChange={pagination.setPage}
          />
        </Box>
      )}

      <TagFormModal
        open={isModalOpen}
        editingTag={editingTag}
        onClose={handleModalClose}
        onSubmit={handleSubmit}
      />
    </Flex>
  );
}
