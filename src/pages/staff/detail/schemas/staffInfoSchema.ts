import { z } from "zod";

export const staffInfoSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  branchId: z.string().min(1, "Vui lòng chọn chi nhánh"),
  isActive: z.boolean(),
});

export type StaffInfoValues = z.infer<typeof staffInfoSchema>;
