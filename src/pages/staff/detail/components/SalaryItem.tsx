import { Badge, Button, Table, Text } from "@chakra-ui/react";
import { Eye } from "lucide-react";
import type { SalaryRecord } from "@lib/mock/salaries";
import { calcNetSalary } from "@lib/mock/salaries";

const STATUS_MAP: Record<SalaryRecord["status"], { label: string; colorPalette: string }> = {
  pending: { label: "Chờ duyệt", colorPalette: "orange" },
  approved: { label: "Đã duyệt", colorPalette: "primary" },
  paid: { label: "Đã thanh toán", colorPalette: "green" },
};

const MONTH_LABEL = (month: number, year: number) =>
  `Tháng ${String(month).padStart(2, "0")}/${year}`;

interface SalaryItemProps {
  record: SalaryRecord;
  onView: (id: string) => void;
}

export function SalaryItem({ record, onView }: SalaryItemProps) {
  const net = calcNetSalary(record);
  const status = STATUS_MAP[record.status];

  return (
    <Table.Row>
      <Table.Cell>
        <Text fontSize="sm" fontWeight="medium">
          {MONTH_LABEL(record.month, record.year)}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="sm">{record.baseSalary.toLocaleString("vi-VN")}₫</Text>
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="sm" color={record.bonus > 0 ? "green.600" : "fg.muted"}>
          {record.bonus > 0 ? `+${record.bonus.toLocaleString("vi-VN")}₫` : "—"}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text fontSize="sm" fontWeight="semibold">
          {net.toLocaleString("vi-VN")}₫
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Badge colorPalette={status.colorPalette} size="sm">
          {status.label}
        </Badge>
      </Table.Cell>
      <Table.Cell>
        <Button size="xs" variant="ghost" onClick={() => onView(record.id)}>
          <Eye size={13} />
          Chi tiết
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
