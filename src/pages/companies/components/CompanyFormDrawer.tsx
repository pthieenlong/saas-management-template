import {
  Drawer,
  Portal,
  CloseButton,
  Field,
  Input,
  Stack,
  Button,
  NativeSelect,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import type { Company } from "@features/company";

const schema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  code: z.string().min(1, "Mã không được để trống"),
  type: z.enum(["group", "company", "branch"]),
  status: z.enum(["active", "inactive"]),
  address: z.string().optional(),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface CompanyFormDrawerProps {
  open: boolean;
  onClose: () => void;
  company?: Company | null;
  parentId?: string | null;
  onSubmit: (values: FormValues & { parentId?: string }) => void;
}

export function CompanyFormDrawer({
  open,
  onClose,
  company,
  parentId,
  onSubmit,
}: CompanyFormDrawerProps) {
  const isEdit = !!company;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      code: "",
      type: "company",
      status: "active",
      address: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (company) {
      reset({
        name: company.name,
        code: company.code,
        type: company.type,
        status: company.status,
        address: company.address ?? "",
        phone: company.phone ?? "",
      });
    } else {
      reset({ name: "", code: "", type: "company", status: "active", address: "", phone: "" });
    }
  }, [company, reset]);

  const handleFormSubmit = (values: FormValues) => {
    onSubmit({ ...values, parentId: parentId ?? undefined });
    onClose();
  };

  return (
    <Drawer.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{isEdit ? "Sửa thông tin" : "Thêm công ty / chi nhánh"}</Drawer.Title>
              <CloseButton onClick={onClose} />
            </Drawer.Header>

            <Drawer.Body>
              <form id="company-form" onSubmit={handleSubmit(handleFormSubmit)}>
                <Stack gap={4}>
                  <Field.Root invalid={!!errors.name}>
                    <Field.Label>Tên</Field.Label>
                    <Input {...register("name")} placeholder="Nhập tên" />
                    {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root invalid={!!errors.code}>
                    <Field.Label>Mã</Field.Label>
                    <Input {...register("code")} placeholder="VD: CFT-HCM" />
                    {errors.code && <Field.ErrorText>{errors.code.message}</Field.ErrorText>}
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Loại</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field {...register("type")}>
                        <option value="group">Tập đoàn</option>
                        <option value="company">Công ty</option>
                        <option value="branch">Chi nhánh</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Trạng thái</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field {...register("status")}>
                        <option value="active">Hoạt động</option>
                        <option value="inactive">Tạm ngưng</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Địa chỉ</Field.Label>
                    <Input {...register("address")} placeholder="Nhập địa chỉ" />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label>Số điện thoại</Field.Label>
                    <Input {...register("phone")} placeholder="Nhập số điện thoại" />
                  </Field.Root>
                </Stack>
              </form>
            </Drawer.Body>

            <Drawer.Footer>
              <Flex gap={3} w="full" justify="flex-end">
                <Button variant="outline" onClick={onClose}>
                  Hủy
                </Button>
                <Button type="submit" form="company-form">
                  {isEdit ? "Cập nhật" : "Thêm mới"}
                </Button>
              </Flex>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
