import { useState } from "react";
import {
  MOCK_SALARIES,
  calcNetSalary,
  type SalaryRecord,
  type SalaryStatus,
} from "@lib/mock/salaries";

export function useSalary(userId: string) {
  const [records, setRecords] = useState<SalaryRecord[]>(
    MOCK_SALARIES.filter((s) => s.userId === userId)
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (records.length === 0 && !MOCK_SALARIES.some((s) => s.userId === userId)) {
    return null;
  }

  const selected = records.find((r) => r.id === selectedId) ?? null;

  const updateStatus = (id: string, status: SalaryStatus) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const sorted = [...records].sort((a, b) =>
    a.year !== b.year ? b.year - a.year : b.month - a.month
  );

  return {
    records: sorted,
    selected,
    selectRecord: setSelectedId,
    clearSelection: () => setSelectedId(null),
    updateStatus,
    calcNetSalary,
  };
}
