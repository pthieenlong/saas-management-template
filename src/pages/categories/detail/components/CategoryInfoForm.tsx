import {
  Field,
  Image,
  Input,
  NativeSelect,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { Category } from "@lib/mock/categories";
import type { CategoryFormValues } from "../schemas/categorySchema";

type Props = {
  rootCategories: Pick<Category, "id" | "name">[];
  isNew: boolean;
};

export function CategoryInfoForm({ rootCategories, isNew }: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<CategoryFormValues>();

  const imageUrl = watch("imageUrl");
  const isActive = watch("isActive");

  return (
    <Stack gap={4}>
      <Field.Root invalid={!!errors.name}>
        <Field.Label>Tên danh mục</Field.Label>
        <Input {...register("name")} placeholder="Ví dụ: Phòng ngủ" />
        {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
      </Field.Root>

      <Field.Root invalid={!!errors.slug}>
        <Field.Label>Slug</Field.Label>
        <Input {...register("slug")} placeholder="phong-ngu" />
        {errors.slug && <Field.ErrorText>{errors.slug.message}</Field.ErrorText>}
        {isNew && (
          <Field.HelperText>Tự động sinh từ tên, có thể chỉnh thủ công</Field.HelperText>
        )}
      </Field.Root>

      <Field.Root>
        <Field.Label>Danh mục cha</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field {...register("parentId")}>
            <option value="">Không có (danh mục gốc)</option>
            {rootCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </NativeSelect.Field>
        </NativeSelect.Root>
        <Field.HelperText>Chỉ danh mục gốc được phép làm cha</Field.HelperText>
      </Field.Root>

      <Field.Root invalid={!!errors.imageUrl}>
        <Field.Label>URL ảnh đại diện</Field.Label>
        <Input
          {...register("imageUrl")}
          placeholder="https://..."
        />
        {errors.imageUrl && <Field.ErrorText>{errors.imageUrl.message}</Field.ErrorText>}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Preview"
            h="80px"
            w="120px"
            objectFit="cover"
            borderRadius="md"
            mt={1}
            onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/120x80/e5ddd3/9e8e7e"; }}
          />
        )}
      </Field.Root>

      <Field.Root invalid={!!errors.sortOrder}>
        <Field.Label>Thứ tự hiển thị</Field.Label>
        <Input
          {...register("sortOrder")}
          type="number"
          min={0}
          placeholder="0"
          maxW="120px"
        />
        {errors.sortOrder && <Field.ErrorText>{errors.sortOrder.message}</Field.ErrorText>}
      </Field.Root>

      <Field.Root>
        <Field.Label>Trạng thái</Field.Label>
        <Switch.Root
          checked={isActive}
          onCheckedChange={(e) => setValue("isActive", e.checked)}
          colorPalette="primary"
        >
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>
            <Text fontSize="sm">{isActive ? "Hoạt động" : "Ẩn"}</Text>
          </Switch.Label>
        </Switch.Root>
      </Field.Root>
    </Stack>
  );
}
