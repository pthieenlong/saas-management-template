import {
  Badge,
  Box,
  Button,
  CloseButton,
  Dialog,
  Flex,
  NativeSelect,
  Portal,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { SalaryRecord, SalaryStatus } from "@lib/mock/salaries";
import { calcNetSalary } from "@lib/mock/salaries";

const STATUS_MAP: Record<SalaryStatus, { label: string; colorPalette: string }> = {
  pending: { label: "Chờ duyệt", colorPalette: "orange" },
  approved: { label: "Đã duyệt", colorPalette: "primary" },
  paid: { label: "Đã thanh toán", colorPalette: "green" },
};

function MoneyRow({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <Flex justify="space-between" align="center" py={1}>
      <Text fontSize="sm" color="fg.muted">{label}</Text>
      <Text fontSize="sm" fontWeight="medium" color={color}>
        {value.toLocaleString("vi-VN")}₫
      </Text>
    </Flex>
  );
}

interface SalaryDetailModalProps {
  record: SalaryRecord | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: SalaryStatus) => void;
  canEdit: boolean;
}

export function SalaryDetailModal({
  record,
  onClose,
  onUpdateStatus,
  canEdit,
}: SalaryDetailModalProps) {
  if (!record) return null;

  const net = calcNetSalary(record);
  const totalAllowances =
    record.allowances.meal + record.allowances.transport + record.allowances.other;
  const totalDeductions =
    record.deductions.insurance + record.deductions.tax + record.deductions.unpaidLeave;
  const status = STATUS_MAP[record.status];

  return (
    <Dialog.Root open={!!record} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="460px">
            <Dialog.Header>
              <Flex align="center" gap={3} flex={1}>
                <Dialog.Title>
                  Lương tháng {String(record.month).padStart(2, "0")}/{record.year}
                </Dialog.Title>
                <Badge colorPalette={status.colorPalette} size="sm">
                  {status.label}
                </Badge>
              </Flex>
              <CloseButton onClick={onClose} />
            </Dialog.Header>

            <Dialog.Body>
              <Stack gap={0}>
                {/* Lương cơ bản */}
                <MoneyRow label="Lương cơ bản" value={record.baseSalary} />

                {/* Phụ cấp */}
                <Box mt={3} mb={1}>
                  <Text fontSize="xs" fontWeight="semibold" color="fg.muted" textTransform="uppercase" letterSpacing="wide">
                    Phụ cấp
                  </Text>
                </Box>
                <MoneyRow label="Ăn trưa" value={record.allowances.meal} />
                <MoneyRow label="Đi lại" value={record.allowances.transport} />
                {record.allowances.other > 0 && (
                  <MoneyRow label="Khác" value={record.allowances.other} />
                )}
                <Flex justify="space-between" py={1}>
                  <Text fontSize="sm" fontWeight="medium">Tổng phụ cấp</Text>
                  <Text fontSize="sm" fontWeight="semibold" color="green.600">
                    +{totalAllowances.toLocaleString("vi-VN")}₫
                  </Text>
                </Flex>

                {/* Thưởng */}
                {record.bonus > 0 && (
                  <>
                    <Box mt={3} mb={1}>
                      <Text fontSize="xs" fontWeight="semibold" color="fg.muted" textTransform="uppercase" letterSpacing="wide">
                        Thưởng
                      </Text>
                    </Box>
                    <MoneyRow label="Thưởng" value={record.bonus} color="green.600" />
                  </>
                )}

                {/* Khấu trừ */}
                <Box mt={3} mb={1}>
                  <Text fontSize="xs" fontWeight="semibold" color="fg.muted" textTransform="uppercase" letterSpacing="wide">
                    Khấu trừ
                  </Text>
                </Box>
                <MoneyRow label="Bảo hiểm" value={record.deductions.insurance} />
                <MoneyRow label="Thuế TNCN" value={record.deductions.tax} />
                {record.deductions.unpaidLeave > 0 && (
                  <MoneyRow label="Nghỉ không phép" value={record.deductions.unpaidLeave} />
                )}
                <Flex justify="space-between" py={1}>
                  <Text fontSize="sm" fontWeight="medium">Tổng khấu trừ</Text>
                  <Text fontSize="sm" fontWeight="semibold" color="red.600">
                    -{totalDeductions.toLocaleString("vi-VN")}₫
                  </Text>
                </Flex>

                <Separator my={3} />

                {/* Thực nhận */}
                <Flex justify="space-between" align="center">
                  <Text fontSize="md" fontWeight="bold">Thực nhận</Text>
                  <Text fontSize="md" fontWeight="bold" color="green.600">
                    {net.toLocaleString("vi-VN")}₫
                  </Text>
                </Flex>

                {/* Ghi chú */}
                {record.note && (
                  <Box mt={3} p={3} bg="bg.surface" borderRadius="md">
                    <Text fontSize="xs" color="fg.muted" mb={1}>Ghi chú</Text>
                    <Text fontSize="sm">{record.note}</Text>
                  </Box>
                )}

                {/* Cập nhật trạng thái */}
                {canEdit && (
                  <Flex align="center" gap={3} mt={4}>
                    <Text fontSize="sm" fontWeight="medium" flexShrink={0}>Trạng thái</Text>
                    <NativeSelect.Root size="sm" flex={1}>
                      <NativeSelect.Field
                        value={record.status}
                        onChange={(e) =>
                          onUpdateStatus(record.id, e.target.value as SalaryStatus)
                        }
                      >
                        <option value="pending">Chờ duyệt</option>
                        <option value="approved">Đã duyệt</option>
                        <option value="paid">Đã thanh toán</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Flex>
                )}
              </Stack>
            </Dialog.Body>

            <Dialog.Footer>
              <Flex justify="flex-end">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Đóng
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
