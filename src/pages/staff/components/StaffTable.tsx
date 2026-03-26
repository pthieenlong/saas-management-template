import { Table } from "@chakra-ui/react";
import type { User } from "@lib/mock/companies";
import { StaffTableItem } from "./StaffTableItem";

interface StaffTableProps {
  users: User[];
}

export function StaffTable({ users }: StaffTableProps) {
  return (
    <Table.Root variant="outline" size="sm">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Nhân viên</Table.ColumnHeader>
          <Table.ColumnHeader>Role</Table.ColumnHeader>
          <Table.ColumnHeader>Chi nhánh</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <StaffTableItem key={user.id} user={user} />
        ))}
      </Table.Body>
    </Table.Root>
  );
}
