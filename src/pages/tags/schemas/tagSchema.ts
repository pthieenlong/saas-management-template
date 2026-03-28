import { z } from "zod";

export const tagSchema = z.object({
  name: z.string().min(1, "Tên tag không được để trống"),
  slug: z.string().min(1, "Slug không được để trống").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug chỉ gồm chữ thường, số và dấu gạch ngang"),
});

export type TagFormValues = z.infer<typeof tagSchema>;
