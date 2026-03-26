import {
  Box,
  Field,
  Flex,
  Input,
  NativeSelect,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import type { Company } from "@lib/mock/companies";
import type { StaffInfoValues } from "../schemas/staffInfoSchema";

interface StaffInfoFormProps {
  allBranches: Company[];
}

export function StaffInfoForm({ allBranches }: StaffInfoFormProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<StaffInfoValues>();

  const isActive = watch("isActive");

  return (
    <Box
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="lg"
      p={4}
    >
      <Text fontWeight="semibold" fontSize="sm" mb={4}>
        Thông tin cơ bản
      </Text>

      <Flex direction="column" gap={4}>
        <Field.Root invalid={!!errors.name}>
          <Field.Label fontSize="sm">Tên nhân viên</Field.Label>
          <Input size="sm" {...register("name")} />
          {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
        </Field.Root>

        <Field.Root invalid={!!errors.email}>
          <Field.Label fontSize="sm">Email</Field.Label>
          <Input size="sm" type="email" {...register("email")} />
          {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
        </Field.Root>

        <Field.Root invalid={!!errors.branchId}>
          <Field.Label fontSize="sm">Chi nhánh</Field.Label>
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
          {errors.branchId && <Field.ErrorText>{errors.branchId.message}</Field.ErrorText>}
        </Field.Root>

        <Flex align="center" justify="space-between">
          <Text fontSize="sm" fontWeight="medium">Trạng thái</Text>
          <Flex align="center" gap={2}>
            <Switch.Root
              checked={isActive}
              onCheckedChange={({ checked }) => setValue("isActive", checked)}
              colorPalette="green"
              size="sm"
            >
              <Switch.HiddenInput />
              <Switch.Control />
            </Switch.Root>
            <Text fontSize="sm" color={isActive ? "green.600" : "fg.muted"}>
              {isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
