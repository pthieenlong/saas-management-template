import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Tên danh mục không được để trống"),
  slug: z.string().min(1, "Slug không được để trống").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang"),
  parentId: z.string().nullable(),
  imageUrl: z.string().nullable(),
  sortOrder: z.coerce.number().int().min(0, "Thứ tự phải >= 0"),
  isActive: z.boolean(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
