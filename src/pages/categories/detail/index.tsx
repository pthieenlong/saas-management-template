import { Box, Button, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Route } from "@routes/categories/$categoryId";
import { useCurrentUser } from "@hooks/useCurrentUser";
import { useCategoryDetail } from "./hooks/useCategoryDetail";
import { CategoryInfoForm } from "./components/CategoryInfoForm";
import { categorySchema, type CategoryFormValues } from "./schemas/categorySchema";

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function CategoryDetailPage() {
  const { categoryId } = Route.useParams();
  const navigate = useNavigate();
  const detail = useCategoryDetail(categoryId);
  const { isAdmin } = useCurrentUser();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      parentId: null,
      imageUrl: null,
      sortOrder: 0,
      isActive: true,
    },
    values: detail?.category
      ? {
          name: detail.category.name,
          slug: detail.category.slug,
          parentId: detail.category.parentId,
          imageUrl: detail.category.imageUrl,
          sortOrder: detail.category.sortOrder,
          isActive: detail.category.isActive,
        }
      : undefined,
  });

  // Auto-generate slug from name when creating new category
  const nameValue = form.watch("name");
  useEffect(() => {
    if (detail?.isNew && nameValue) {
      form.setValue("slug", toSlug(nameValue), { shouldValidate: false });
    }
  }, [nameValue, detail?.isNew, form]);

  if (!detail) {
    return (
      <Flex align="center" justify="center" h="300px" color="fg.muted" direction="column" gap={3}>
        <Spinner />
        <Text fontSize="sm">Không tìm thấy danh mục</Text>
      </Flex>
    );
  }

  const onSubmit = (_values: CategoryFormValues) => {
    detail.handleSave();
  };

  const pageTitle = detail.isNew
    ? "Thêm danh mục mới"
    : (detail.category?.name ?? "Chi tiết danh mục");

  return (
    <FormProvider {...form}>
      <Flex direction="column" gap={5}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={3}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ to: "/categories" })}
            >
              <ArrowLeft size={16} />
            </Button>
            <Box>
              <Heading size="md">{pageTitle}</Heading>
              {!detail.isNew && detail.category && (
                <Text fontSize="xs" color="fg.muted">
                  {detail.category.slug}
                </Text>
              )}
            </Box>
          </Flex>
          {isAdmin && (
            <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
              <Save size={14} />
              {detail.saved ? "Đã lưu!" : detail.isNew ? "Tạo danh mục" : "Lưu thay đổi"}
            </Button>
          )}
        </Flex>

        <Box maxW="480px">
          <CategoryInfoForm
            rootCategories={detail.rootCategories}
            isNew={detail.isNew}
          />
        </Box>
      </Flex>
    </FormProvider>
  );
}
