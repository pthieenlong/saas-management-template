import { z } from "zod";

export const staffInfoSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  branchId: z.string().min(1, "Vui lòng chọn chi nhánh"),
  joinDate: z.string().min(1, "Ngày vào làm không được để trống"),
  isActive: z.boolean(),
});

export type StaffInfoValues = z.infer<typeof staffInfoSchema>;
