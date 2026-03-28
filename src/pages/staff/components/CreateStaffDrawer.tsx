import {
  Button,
  CloseButton,
  Drawer,
  Field,
  Flex,
  Input,
  NativeSelect,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { Company } from "@lib/mock/companies";
import { MOCK_ROLES } from "@lib/mock/companies";

const createStaffSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  branchId: z.string().min(1, "Vui lòng chọn chi nhánh"),
  roleId: z.string().min(1, "Vui lòng chọn vai trò"),
});

type CreateStaffFormValues = z.infer<typeof createStaffSchema>;

interface CreateStaffDrawerProps {
  open: boolean;
  onClose: () => void;
  availableBranches: Company[];
  onSubmit: (values: CreateStaffFormValues) => void;
}

export function CreateStaffDrawer({
  open,
  onClose,
  availableBranches,
  onSubmit,
}: CreateStaffDrawerProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateStaffFormValues>({
    resolver: zodResolver(createStaffSchema),
    defaultValues: { name: "", email: "", phone: "", branchId: "", roleId: "" },
  });

  const handleFormSubmit = (values: CreateStaffFormValues) => {
    onSubmit(values);
    reset();
    onClose();
  };

  return (
    <Drawer.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Thêm nhân viên mới</Drawer.Title>
              <CloseButton onClick={onClose} />
            </Drawer.Header>

            <Drawer.Body>
              <form id="create-staff-form" onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack gap={4}>
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>Tên nhân viên</Field.Label>
                    <Input {...register("name")} placeholder="Nhập tên" />
                    {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root invalid={!!errors.email}>
                    <Field.Label>Email</Field.Label>
                    <Input {...register("email")} type="email" placeholder="Nhập email" />
                    {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root invalid={!!errors.phone}>
                    <Field.Label>Số điện thoại</Field.Label>
                    <Input {...register("phone")} type="tel" placeholder="Nhập số điện thoại" />
                    {errors.phone && <Field.ErrorText>{errors.phone.message}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root invalid={!!errors.branchId}>
                    <Field.Label>Chi nhánh</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field {...register("branchId")}>
                        <option value="">Chọn chi nhánh</option>
                        {availableBranches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    {errors.branchId && <Field.ErrorText>{errors.branchId.message}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root invalid={!!errors.roleId}>
                    <Field.Label>Vai trò</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field {...register("roleId")}>
                        <option value="">Chọn vai trò</option>
                        {MOCK_ROLES.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.name}
                          </option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                    {errors.roleId && <Field.ErrorText>{errors.roleId.message}</Field.ErrorText>}
                  </Field.Root>
                </Stack>
              </form>
            </Drawer.Body>

            <Drawer.Footer>
              <Flex gap={3} w="full" justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Hủy
                </Button>
                <Button type="submit" form="create-staff-form">
                  Thêm nhân viên
                </Button>
              </Flex>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
