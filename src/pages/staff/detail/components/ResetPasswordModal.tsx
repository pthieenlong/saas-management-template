import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
type ChangePasswordValues = z.infer<typeof changePasswordSchema>;

function ResetForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (_values: ResetPasswordValues) => {
    reset();
    onClose();
  };

  return (
    <form id="reset-password-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <Field.Root invalid={!!errors.newPassword}>
          <Field.Label>Mật khẩu mới</Field.Label>
          <Input type="password" {...register("newPassword")} placeholder="Nhập mật khẩu mới" />
          {errors.newPassword && <Field.ErrorText>{errors.newPassword.message}</Field.ErrorText>}
        </Field.Root>
        <Field.Root invalid={!!errors.confirmPassword}>
          <Field.Label>Xác nhận mật khẩu</Field.Label>
          <Input type="password" {...register("confirmPassword")} placeholder="Nhập lại mật khẩu" />
          {errors.confirmPassword && (
            <Field.ErrorText>{errors.confirmPassword.message}</Field.ErrorText>
          )}
        </Field.Root>
      </Stack>
    </form>
  );
}

function ChangeForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = (_values: ChangePasswordValues) => {
    reset();
    onClose();
  };

  return (
    <form id="change-password-form" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={4}>
        <Field.Root invalid={!!errors.currentPassword}>
          <Field.Label>Mật khẩu hiện tại</Field.Label>
          <Input type="password" {...register("currentPassword")} placeholder="Nhập mật khẩu hiện tại" />
          {errors.currentPassword && (
            <Field.ErrorText>{errors.currentPassword.message}</Field.ErrorText>
          )}
        </Field.Root>
        <Field.Root invalid={!!errors.newPassword}>
          <Field.Label>Mật khẩu mới</Field.Label>
          <Input type="password" {...register("newPassword")} placeholder="Nhập mật khẩu mới" />
          {errors.newPassword && <Field.ErrorText>{errors.newPassword.message}</Field.ErrorText>}
        </Field.Root>
        <Field.Root invalid={!!errors.confirmPassword}>
          <Field.Label>Xác nhận mật khẩu</Field.Label>
          <Input type="password" {...register("confirmPassword")} placeholder="Nhập lại mật khẩu" />
          {errors.confirmPassword && (
            <Field.ErrorText>{errors.confirmPassword.message}</Field.ErrorText>
          )}
        </Field.Root>
      </Stack>
    </form>
  );
}

type PasswordModalMode = "reset" | "change";

interface ResetPasswordModalProps {
  open: boolean;
  onClose: () => void;
  mode: PasswordModalMode;
}

export function ResetPasswordModal({ open, onClose, mode }: ResetPasswordModalProps) {
  const formId = mode === "reset" ? "reset-password-form" : "change-password-form";
  const title = mode === "reset" ? "Đặt lại mật khẩu" : "Đổi mật khẩu";

  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
              <CloseButton onClick={onClose} />
            </Dialog.Header>
            <Dialog.Body>
              {mode === "reset" ? (
                <ResetForm onClose={onClose} />
              ) : (
                <ChangeForm onClose={onClose} />
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Flex gap={3} justify="flex-end">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Hủy
                </Button>
                <Button type="submit" form={formId} size="sm">
                  {mode === "reset" ? "Đặt lại" : "Cập nhật"}
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
