import {
  Avatar,
  Box,
  Field,
  Flex,
  Input,
  NativeSelect,
  Switch,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";
import type { Company } from "@lib/mock/companies";
import type { StaffInfoValues } from "../schemas/staffInfoSchema";

interface StaffInfoFormProps {
  allBranches: Company[];
  avatar: string | null;
  canEditName: boolean;
  canEditEmail: boolean;
  canEditPhone: boolean;
  canEditBranch: boolean;
  canEditJoinDate: boolean;
  canEditStatus: boolean;
  canEditAvatar: boolean;
  onAvatarChange: (file: File) => void;
}

export function StaffInfoForm({
  allBranches,
  avatar,
  canEditName,
  canEditEmail,
  canEditPhone,
  canEditBranch,
  canEditJoinDate,
  canEditStatus,
  canEditAvatar,
  onAvatarChange,
}: StaffInfoFormProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<StaffInfoValues>();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isActive = watch("isActive");
  const name = watch("name");

  return (
    <Box
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.muted"
      borderRadius="lg"
      p={4}
    >
      <Text fontWeight="semibold" fontSize="sm" mb={4}>
        Thông tin cơ bản
      </Text>

      <Flex direction="column" gap={4}>
        {/* Avatar */}
        <Flex align="center" gap={4}>
          <Avatar.Root size="xl" colorPalette="primary">
            <Avatar.Image src={avatar ?? "https://placehold.co/80x80"} />
            <Avatar.Fallback name={name} />
          </Avatar.Root>
          {canEditAvatar && (
            <>
              <VisuallyHidden>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onAvatarChange(file);
                  }}
                />
              </VisuallyHidden>
              <Text
                fontSize="xs"
                color="colorPalette.fg"
                colorPalette="primary"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={() => fileInputRef.current?.click()}
              >
                Thay đổi ảnh
              </Text>
            </>
          )}
        </Flex>

        {/* Tên */}
        <Field.Root invalid={!!errors.name}>
          <Field.Label fontSize="sm">Tên nhân viên</Field.Label>
          {canEditName ? (
            <Input size="sm" {...register("name")} />
          ) : (
            <Text fontSize="sm" py={1}>{watch("name")}</Text>
          )}
          {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
        </Field.Root>

        {/* Email */}
        <Field.Root invalid={!!errors.email}>
          <Field.Label fontSize="sm">Email</Field.Label>
          {canEditEmail ? (
            <Input size="sm" type="email" {...register("email")} />
          ) : (
            <Text fontSize="sm" py={1}>{watch("email")}</Text>
          )}
          {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
        </Field.Root>

        {/* Số điện thoại */}
        <Field.Root invalid={!!errors.phone}>
          <Field.Label fontSize="sm">Số điện thoại</Field.Label>
          {canEditPhone ? (
            <Input size="sm" type="tel" {...register("phone")} />
          ) : (
            <Text fontSize="sm" py={1}>{watch("phone")}</Text>
          )}
          {errors.phone && <Field.ErrorText>{errors.phone.message}</Field.ErrorText>}
        </Field.Root>

        {/* Chi nhánh */}
        <Field.Root invalid={!!errors.branchId}>
          <Field.Label fontSize="sm">Chi nhánh</Field.Label>
          {canEditBranch ? (
            <NativeSelect.Root size="sm">
              <NativeSelect.Field {...register("branchId")}>
                {allBranches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          ) : (
            <Text fontSize="sm" py={1}>
              {allBranches.find((b) => b.id === watch("branchId"))?.name ?? watch("branchId")}
            </Text>
          )}
          {errors.branchId && <Field.ErrorText>{errors.branchId.message}</Field.ErrorText>}
        </Field.Root>

        {/* Ngày vào làm */}
        <Field.Root invalid={!!errors.joinDate}>
          <Field.Label fontSize="sm">Ngày vào làm</Field.Label>
          {canEditJoinDate ? (
            <Input size="sm" type="date" {...register("joinDate")} />
          ) : (
            <Text fontSize="sm" py={1}>{watch("joinDate")}</Text>
          )}
          {errors.joinDate && <Field.ErrorText>{errors.joinDate.message}</Field.ErrorText>}
        </Field.Root>

        {/* Trạng thái */}
        <Flex align="center" justify="space-between">
          <Text fontSize="sm" fontWeight="medium">Trạng thái</Text>
          <Flex align="center" gap={2}>
            {canEditStatus ? (
              <Switch.Root
                checked={isActive}
                onCheckedChange={({ checked }) => setValue("isActive", checked)}
                colorPalette="primary"
                size="sm"
              >
                <Switch.HiddenInput />
                <Switch.Control />
              </Switch.Root>
            ) : null}
            <Text fontSize="sm" color={isActive ? "green.600" : "fg.muted"}>
              {isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
