import {
  Badge,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  TrendingUp,
  ShoppingCart,
  Warehouse,
  Users,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "@tanstack/react-router";
import { useCompanyStore } from "@store/useCompanyStore";
import { KpiCard } from "@components/KpiCard";
import { MOCK_MONTHLY_BY_COMPANY } from "@lib/mock/charts";
import { formatRevenue } from "@utils/format";

const TYPE_LABEL: Record<string, string> = {
  group: "Tập đoàn",
  company: "Công ty",
  branch: "Chi nhánh",
};

export function CompanyDashboardPage() {
  const navigate = useNavigate();
  const selectedCompany = useCompanyStore((s) => s.selectedCompany);

  if (!selectedCompany) {
    return (
      <Flex
        align="center"
        justify="center"
        h="300px"
        direction="column"
        gap={3}
        color="fg.muted"
      >
        <Text fontSize="sm">Chưa chọn công ty nào.</Text>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate({ to: "/companies" })}
        >
          <ArrowLeft size={14} />
          Quay lại danh sách
        </Button>
      </Flex>
    );
  }

  const isBranch = selectedCompany.type === "branch";
  const monthlyData = isBranch
    ? (MOCK_MONTHLY_BY_COMPANY.find((s) => s.companyId === selectedCompany.id)?.data ?? [])
    : [];

  return (
    <Flex direction="column" gap={6}>
      <Flex align="center" gap={3}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate({ to: "/companies" })}
        >
          <ArrowLeft size={14} />
        </Button>
        <Flex direction="column" gap={1}>
          <Flex align="center" gap={2}>
            <Heading size="lg">{selectedCompany.name}</Heading>
            <Badge
              colorPalette={
                selectedCompany.status === "active" ? "green" : "gray"
              }
              size="sm"
            >
              {TYPE_LABEL[selectedCompany.type]}
            </Badge>
            {selectedCompany.status === "inactive" && (
              <Badge colorPalette="red" size="sm">
                Tạm ngưng
              </Badge>
            )}
          </Flex>
          <Text fontSize="sm" color="fg.muted">
            {selectedCompany.code}
            {selectedCompany.address ? ` · ${selectedCompany.address}` : ""}
            {selectedCompany.phone ? ` · ${selectedCompany.phone}` : ""}
          </Text>
        </Flex>
      </Flex>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
        <KpiCard
          label="Doanh thu"
          value={
            selectedCompany.revenue != null
              ? formatRevenue(selectedCompany.revenue)
              : "—"
          }
          sub="Tháng này"
          icon={TrendingUp}
          color="green"
        />
        <KpiCard
          label="Đơn hàng"
          value={
            selectedCompany.orderCount != null
              ? selectedCompany.orderCount.toString()
              : "—"
          }
          sub="Tháng này"
          icon={ShoppingCart}
          color="blue"
        />
        <KpiCard
          label="Tồn kho thấp"
          value="—"
          sub="Chưa có dữ liệu"
          icon={Warehouse}
          color="orange"
        />
        <KpiCard
          label="Nhân viên"
          value={
            selectedCompany.staffCount != null
              ? selectedCompany.staffCount.toString()
              : "—"
          }
          sub="Đang hoạt động"
          icon={Users}
          color="purple"
        />
      </SimpleGrid>

      {isBranch && monthlyData.length > 0 && (
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={5}>
          <Flex
            direction="column"
            gap={3}
            bg="bg.surface"
            borderWidth="1px"
            borderColor="border.muted"
            borderRadius="xl"
            p={5}
          >
            <Text fontWeight="semibold" fontSize="sm">
              Doanh thu (6 tháng)
            </Text>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient
                    id="companyRevenueGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--chakra-colors-border-subtle)"
                />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}tr`}
                  tick={{ fontSize: 12 }}
                  width={48}
                />
                <Tooltip formatter={(v) => formatRevenue(Number(v))} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="Doanh thu"
                  stroke="#10b981"
                  fill="url(#companyRevenueGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Flex>

          <Flex
            direction="column"
            gap={3}
            bg="bg.surface"
            borderWidth="1px"
            borderColor="border.muted"
            borderRadius="xl"
            p={5}
          >
            <Text fontWeight="semibold" fontSize="sm">
              Đơn hàng (6 tháng)
            </Text>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--chakra-colors-border-subtle)"
                />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} width={32} />
                <Tooltip />
                <Bar
                  dataKey="orders"
                  name="Đơn hàng"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Flex>
        </SimpleGrid>
      )}
    </Flex>
  );
}
