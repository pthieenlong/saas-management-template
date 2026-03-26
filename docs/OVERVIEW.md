# Comforty Admin — Project Overview

## Mô tả

Hệ thống quản trị cho chuỗi cửa hàng nội thất **Comforty**. Xây dựng theo mô hình **multi-company** với cấu trúc phân cấp 3 tầng: Tập đoàn → Công ty → Chi nhánh.

---

## Cấu trúc tổ chức

```text
Tập đoàn (Group)
└── Công ty (Company)
    └── Chi nhánh (Branch)
```

- **Tập đoàn** — đơn vị gốc, quản lý toàn bộ hệ thống
- **Công ty** — đơn vị trực thuộc tập đoàn (vd: Comforty HCM, Comforty HN)
- **Chi nhánh** — đơn vị trực thuộc công ty, nơi nhân viên được gán vào

Nhân viên chỉ thuộc về một **Chi nhánh** cụ thể, không thuộc Company hay Group trực tiếp.

---

## Roles & RBAC

### Các role hệ thống

| Role | Phạm vi | Mô tả |
| --- | --- | --- |
| **Super Admin** | Toàn hệ thống | Quản lý toàn bộ tập đoàn, công ty, chi nhánh. Xem tất cả dữ liệu. Chỉ Super Admin mới truy cập được trang Quản lý Công ty. |
| **Quản trị viên** (Admin) | Toàn chi nhánh | Toàn bộ nghiệp vụ của chi nhánh, quản lý nhân viên, phân quyền trong chi nhánh |
| **Quản lý** (Manager) | Chi nhánh | Đơn hàng, sản phẩm, tồn kho, nhân viên trong chi nhánh |
| **Thu ngân** (Cashier) | Chi nhánh | Xem & tạo đơn hàng, xem sản phẩm |
| **Thủ kho** (Warehouse) | Chi nhánh | Xem & điều chỉnh tồn kho, xem sản phẩm |

### Nguyên tắc RBAC

- Mỗi Role có một tập **quyền mặc định** (default permissions).
- Mỗi User có thể được **cấp thêm** (extra) hoặc **thu hồi** (revoked) quyền so với role mặc định.
- `effective_permissions = (role.permissions - revoked) + extra`
- **Phân cấp dữ liệu theo scope:**
  - Super Admin thấy toàn bộ dữ liệu (tất cả công ty, chi nhánh, nhân viên, đơn hàng...).
  - Nhân viên chi nhánh chỉ thấy dữ liệu thuộc chi nhánh của mình.
  - Công ty con **không** có quyền xem cấu trúc công ty (trang Quản lý Công ty bị ẩn).

---

## Các module chức năng

| Module | Super Admin | Company/Branch Staff |
| --- | --- | --- |
| Dashboard | Tổng quan toàn hệ thống | Tổng quan chi nhánh |
| Quản lý đơn hàng | Tất cả đơn hàng | Đơn hàng của chi nhánh |
| Quản lý sản phẩm | Tất cả sản phẩm | Sản phẩm của chi nhánh |
| Quản lý danh mục | Toàn bộ danh mục | Danh mục của chi nhánh |
| Quản lý tồn kho | Tồn kho toàn hệ thống | Tồn kho của chi nhánh |
| Quản lý nhân viên | Tất cả nhân viên | Nhân viên của chi nhánh |
| Báo cáo | Báo cáo tổng hợp | Báo cáo chi nhánh |
| Quản lý Công ty | Cây tập đoàn/công ty/chi nhánh | Ẩn — không có quyền truy cập |
| Phân quyền | Toàn hệ thống | Trong phạm vi chi nhánh |
| Cài đặt | Toàn hệ thống | Chi nhánh |

---

## Luồng phân quyền

```text
Super Admin
  → vào trang Phân quyền
  → chọn Chi nhánh từ cây tổ chức
  → chọn Nhân viên trong chi nhánh
  → gán Role cho nhân viên
  → tuỳ chỉnh Extra / Revoked permissions
  → lưu
```

---

## Luồng điều hướng theo context

### Super Admin Dashboard

- Thấy toàn bộ sidebar (bao gồm "Quản lý Công ty" và "Phân quyền").
- Trang Companies hiển thị cây tổ chức (Group → Company → Branch).
- Click vào một Company/Branch → navigate vào dashboard của đơn vị đó để xem dữ liệu scoped.

### Company/Branch Dashboard

- Sidebar ẩn mục "Quản lý Công ty".
- Tất cả dữ liệu hiển thị đều scoped theo `companyId` của context hiện tại.

---

## Database Design (ERD)

ERD đầy đủ bằng DBML tại [docs/ERD.md](ERD.md).

### Các nhóm bảng chính

| Nhóm | Bảng |
| --- | --- |
| Cấu trúc tổ chức | `companies` (self-ref: group / company / branch) |
| RBAC | `users`, `roles`, `permissions`, `role_permissions`, `user_branch_roles`, `user_extra_permissions`, `user_revoked_permissions` |
| Catalog | `categories`, `tags`, `attribute_types`, `attribute_values` |
| Products | `products`, `product_variants`, `variant_attributes`, `product_images`, `product_tags` |
| Inventory | `inventory`, `inventory_transactions` |
| Orders | `customers`, `orders`, `order_items`, `order_status_logs` |
| CMS | `posts`, `post_tags`, `content_blocks` |

### Quyết định thiết kế quan trọng

- **Cấu trúc công ty self-referencing** — bảng `companies` tự tham chiếu qua `parent_id` thay vì tách thành nhiều bảng `tenants`/`stores`.
- **`user_branch_roles`** — user được gán role tại một **branch** cụ thể (không phải store hay tenant như thiết kế cũ).
- **`user_extra_permissions` + `user_revoked_permissions`** — tách riêng hai bảng để quản lý quyền bổ sung và thu hồi độc lập với role.
- **Tồn kho theo `variant × branch`** — mỗi SKU có số lượng riêng tại từng chi nhánh.
- **`inventory_transactions`** — log toàn bộ biến động kho để audit trail và báo cáo.
- **Variant & Attributes linh hoạt** — `attribute_types` / `attribute_values` / `variant_attributes` cho phép thêm loại thuộc tính mới mà không cần thay đổi schema.
- **`order_items.unit_price`** — lưu giá tại thời điểm đặt hàng.
- **`orders.code`** — mã đơn hàng đọc được (CFT-2025-00001), tách khỏi UUID nội bộ.
- **`tags` dùng chung** cho cả `products` và `posts`.
- **`content_blocks`** quản lý nội dung website theo key, có thể scope theo branch hoặc toàn hệ thống.
