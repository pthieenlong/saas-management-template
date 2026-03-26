export type { Company } from "@features/company";
export { MOCK_COMPANY_TREE, MOCK_BRANCHES } from "@features/company";

export type Role = {
  id: string;
  name: string;
  permissionIds: string[];
};

export type Permission = {
  id: string;
  label: string;
  group: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  roleId: string;
  branchId: string;
  extraPermissionIds: string[];
  revokedPermissionIds: string[];
};

export const MOCK_PERMISSIONS: Permission[] = [
  // Đơn hàng
  { id: "orders.view", label: "Xem đơn hàng", group: "Đơn hàng" },
  { id: "orders.create", label: "Tạo đơn hàng", group: "Đơn hàng" },
  { id: "orders.edit", label: "Sửa đơn hàng", group: "Đơn hàng" },
  { id: "orders.delete", label: "Xóa đơn hàng", group: "Đơn hàng" },
  // Sản phẩm
  { id: "products.view", label: "Xem sản phẩm", group: "Sản phẩm" },
  { id: "products.create", label: "Thêm sản phẩm", group: "Sản phẩm" },
  { id: "products.edit", label: "Sửa sản phẩm", group: "Sản phẩm" },
  { id: "products.delete", label: "Xóa sản phẩm", group: "Sản phẩm" },
  // Kho
  { id: "inventory.view", label: "Xem kho", group: "Kho" },
  { id: "inventory.adjust", label: "Điều chỉnh tồn kho", group: "Kho" },
  // Nhân viên
  { id: "staff.view", label: "Xem nhân viên", group: "Nhân viên" },
  { id: "staff.manage", label: "Quản lý nhân viên", group: "Nhân viên" },
  // Báo cáo
  { id: "reports.view", label: "Xem báo cáo", group: "Báo cáo" },
  { id: "reports.export", label: "Xuất báo cáo", group: "Báo cáo" },
  // Cài đặt
  { id: "settings.view", label: "Xem cài đặt", group: "Cài đặt" },
  { id: "settings.edit", label: "Sửa cài đặt", group: "Cài đặt" },
];

export const MOCK_ROLES: Role[] = [
  {
    id: "role-admin",
    name: "Admin",
    permissionIds: MOCK_PERMISSIONS.map((p) => p.id),
  },
  {
    id: "role-manager",
    name: "Quản lý",
    permissionIds: [
      "orders.view", "orders.create", "orders.edit",
      "products.view", "products.edit",
      "inventory.view", "inventory.adjust",
      "staff.view",
      "reports.view", "reports.export",
      "settings.view",
    ],
  },
  {
    id: "role-cashier",
    name: "Thu ngân",
    permissionIds: [
      "orders.view", "orders.create",
      "products.view",
      "inventory.view",
    ],
  },
  {
    id: "role-warehouse",
    name: "Thủ kho",
    permissionIds: [
      "products.view",
      "inventory.view", "inventory.adjust",
    ],
  },
];

export const MOCK_USERS: User[] = [
  {
    id: "user-1",
    name: "Nguyễn Văn An",
    email: "an.nguyen@comforty.vn",
    role: "Quản lý",
    roleId: "role-manager",
    branchId: "branch-q1",
    extraPermissionIds: [],
    revokedPermissionIds: [],
  },
  {
    id: "user-2",
    name: "Trần Thị Bích",
    email: "bich.tran@comforty.vn",
    role: "Thu ngân",
    roleId: "role-cashier",
    branchId: "branch-q1",
    extraPermissionIds: ["reports.view"],
    revokedPermissionIds: [],
  },
  {
    id: "user-3",
    name: "Lê Minh Cường",
    email: "cuong.le@comforty.vn",
    role: "Thủ kho",
    roleId: "role-warehouse",
    branchId: "branch-q1",
    extraPermissionIds: [],
    revokedPermissionIds: [],
  },
  {
    id: "user-4",
    name: "Phạm Thị Dung",
    email: "dung.pham@comforty.vn",
    role: "Quản lý",
    roleId: "role-manager",
    branchId: "branch-q3",
    extraPermissionIds: [],
    revokedPermissionIds: ["settings.view"],
  },
  {
    id: "user-5",
    name: "Hoàng Văn Em",
    email: "em.hoang@comforty.vn",
    role: "Thu ngân",
    roleId: "role-cashier",
    branchId: "branch-q3",
    extraPermissionIds: [],
    revokedPermissionIds: [],
  },
  {
    id: "user-6",
    name: "Vũ Thị Fương",
    email: "fuong.vu@comforty.vn",
    role: "Quản lý",
    roleId: "role-manager",
    branchId: "branch-hk",
    extraPermissionIds: ["staff.manage"],
    revokedPermissionIds: [],
  },
  {
    id: "user-7",
    name: "Đặng Văn Giang",
    email: "giang.dang@comforty.vn",
    role: "Thu ngân",
    roleId: "role-cashier",
    branchId: "branch-hk",
    extraPermissionIds: [],
    revokedPermissionIds: [],
  },
];
