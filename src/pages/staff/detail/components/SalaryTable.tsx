import { Table } from "@chakra-ui/react";
import type { SalaryRecord } from "@lib/mock/salaries";
import { SalaryItem } from "./SalaryItem";

interface SalaryTableProps {
  records: SalaryRecord[];
  onView: (id: string) => void;
}

export function SalaryTable({ records, onView }: SalaryTableProps) {
  return (
    <Table.Root variant="outline" size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Tháng</Table.ColumnHeader>
          <Table.ColumnHeader>Lương cơ bản</Table.ColumnHeader>
          <Table.ColumnHeader>Thưởng</Table.ColumnHeader>
          <Table.ColumnHeader>Thực nhận</Table.ColumnHeader>
          <Table.ColumnHeader>Trạng thái</Table.ColumnHeader>
          <Table.ColumnHeader />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {records.map((r) => (
          <SalaryItem key={r.id} record={r} onView={onView} />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
