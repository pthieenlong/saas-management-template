import {
  Button,
  Dialog,
  Field,
  Input,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Tag } from "@lib/mock/tags";
import { tagSchema, type TagFormValues } from "../schemas/tagSchema";

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

type Props = {
  open: boolean;
  editingTag: Tag | null;
  onClose: () => void;
  onSubmit: (values: TagFormValues, id?: string) => void;
};

export function TagFormModal({ open, editingTag, onClose, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: { name: "", slug: "" },
  });

  const nameValue = watch("name");

  // Sync form values when editing tag changes
  useEffect(() => {
    if (editingTag) {
      reset({ name: editingTag.name, slug: editingTag.slug });
    } else {
      reset({ name: "", slug: "" });
    }
  }, [editingTag, reset]);

  // Auto-generate slug from name only when creating (not editing)
  useEffect(() => {
    if (!editingTag && nameValue) {
      setValue("slug", toSlug(nameValue), { shouldValidate: false });
    }
  }, [nameValue, editingTag, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (values: TagFormValues) => {
    onSubmit(values, editingTag?.id);
    handleClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && handleClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{editingTag ? "Sửa tag" : "Thêm tag mới"}</Dialog.Title>
          </Dialog.Header>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Dialog.Body>
              <Stack gap={4}>
                <Field.Root invalid={!!errors.name}>
                  <Field.Label>Tên tag</Field.Label>
                  <Input {...register("name")} placeholder="Ví dụ: Bán chạy" />
                  {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
                </Field.Root>
                <Field.Root invalid={!!errors.slug}>
                  <Field.Label>Slug</Field.Label>
                  <Input {...register("slug")} placeholder="ban-chay" />
                  {errors.slug && <Field.ErrorText>{errors.slug.message}</Field.ErrorText>}
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={handleClose} type="button">
                Hủy
              </Button>
              <Button type="submit">
                {editingTag ? "Lưu thay đổi" : "Thêm tag"}
              </Button>
            </Dialog.Footer>
          </form>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
