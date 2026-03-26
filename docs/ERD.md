# Comforty — ERD (DBML)

> Database Markup Language — dùng để visualize tại [dbdiagram.io](https://dbdiagram.io)

```dbml
// ============================================================
// COMPANY STRUCTURE (Group → Company → Branch)
// ============================================================

Table companies {
  id          uuid      [pk, default: `gen_random_uuid()`]
  parent_id   uuid      [ref: > companies.id, note: "null = root (Tập đoàn)"]
  name        varchar   [not null]
  code        varchar   [unique, not null, note: "CFT-HCM, CFT-HN-Q1..."]
  type        varchar   [not null, note: "group | company | branch"]
  address     text
  phone       varchar
  is_active   boolean   [default: true]
  created_at  timestamp [default: `now()`]
  updated_at  timestamp [default: `now()`]
}

// ============================================================
// USERS & RBAC
// ============================================================

Table users {
  id            uuid      [pk, default: `gen_random_uuid()`]
  branch_id     uuid      [not null, ref: > companies.id, note: "Chỉ thuộc branch (type = branch)"]
  email         varchar   [unique, not null]
  password_hash varchar   [not null]
  full_name     varchar   [not null]
  avatar_url    varchar
  is_super_admin boolean  [default: false, note: "Super Admin không thuộc branch cụ thể"]
  is_active     boolean   [default: true]
  created_at    timestamp [default: `now()`]
  updated_at    timestamp [default: `now()`]
}

Table roles {
  id          uuid      [pk, default: `gen_random_uuid()`]
  name        varchar   [unique, not null, note: "admin | manager | cashier | warehouse"]
  created_at  timestamp [default: `now()`]
}

Table permissions {
  id          uuid      [pk, default: `gen_random_uuid()`]
  action      varchar   [unique, not null, note: "orders.view | products.create | companies.view..."]
  label       varchar   [not null, note: "Tên hiển thị"]
  group       varchar   [not null, note: "Nhóm: Đơn hàng | Sản phẩm | Công ty..."]
}

// Quyền mặc định của từng role
Table role_permissions {
  role_id       uuid  [not null, ref: > roles.id]
  permission_id uuid  [not null, ref: > permissions.id]

  indexes {
    (role_id, permission_id) [pk]
  }
}

// User được gán role tại một branch cụ thể
Table user_branch_roles {
  id        uuid  [pk, default: `gen_random_uuid()`]
  user_id   uuid  [not null, ref: > users.id]
  branch_id uuid  [not null, ref: > companies.id]
  role_id   uuid  [not null, ref: > roles.id]

  indexes {
    (user_id, branch_id) [unique]
  }
}

// Quyền bổ sung ngoài role mặc định
Table user_extra_permissions {
  user_id       uuid  [not null, ref: > users.id]
  permission_id uuid  [not null, ref: > permissions.id]

  indexes {
    (user_id, permission_id) [pk]
  }
}

// Quyền bị thu hồi so với role mặc định
Table user_revoked_permissions {
  user_id       uuid  [not null, ref: > users.id]
  permission_id uuid  [not null, ref: > permissions.id]

  indexes {
    (user_id, permission_id) [pk]
  }
}

// ============================================================
// CATALOG
// ============================================================

Table categories {
  id          uuid      [pk, default: `gen_random_uuid()`]
  parent_id   uuid      [ref: > categories.id, note: "Self-ref — cây danh mục"]
  name        varchar   [not null]
  slug        varchar   [unique, not null]
  image_url   varchar
  sort_order  int       [default: 0]
  is_active   boolean   [default: true]
  created_at  timestamp [default: `now()`]
  updated_at  timestamp [default: `now()`]
}

Table tags {
  id    uuid    [pk, default: `gen_random_uuid()`]
  name  varchar [unique, not null]
  slug  varchar [unique, not null]
}

// ============================================================
// PRODUCTS
// ============================================================

Table products {
  id            uuid      [pk, default: `gen_random_uuid()`]
  category_id   uuid      [ref: > categories.id]
  name          varchar   [not null]
  slug          varchar   [unique, not null]
  description   text
  base_price    numeric(12,2) [not null]
  is_active     boolean   [default: true]
  created_at    timestamp [default: `now()`]
  updated_at    timestamp [default: `now()`]
}

Table product_tags {
  product_id  uuid  [not null, ref: > products.id]
  tag_id      uuid  [not null, ref: > tags.id]

  indexes {
    (product_id, tag_id) [pk]
  }
}

Table attribute_types {
  id    uuid    [pk, default: `gen_random_uuid()`]
  name  varchar [unique, not null, note: "Color | Material | Size"]
}

Table attribute_values {
  id                  uuid    [pk, default: `gen_random_uuid()`]
  attribute_type_id   uuid    [not null, ref: > attribute_types.id]
  value               varchar [not null, note: "Oak | White | L"]
}

// SKU = tổ hợp attribute_values của một product
Table product_variants {
  id          uuid          [pk, default: `gen_random_uuid()`]
  product_id  uuid          [not null, ref: > products.id]
  sku         varchar       [unique, not null]
  price       numeric(12,2) [not null]
  image_url   varchar
  is_active   boolean       [default: true]
  created_at  timestamp     [default: `now()`]
}

Table variant_attributes {
  variant_id          uuid  [not null, ref: > product_variants.id]
  attribute_value_id  uuid  [not null, ref: > attribute_values.id]

  indexes {
    (variant_id, attribute_value_id) [pk]
  }
}

Table product_images {
  id          uuid    [pk, default: `gen_random_uuid()`]
  product_id  uuid    [not null, ref: > products.id]
  url         varchar [not null]
  alt_text    varchar
  sort_order  int     [default: 0]
  is_primary  boolean [default: false]
}

// ============================================================
// INVENTORY
// ============================================================

// Tồn kho theo dõi ở cấp variant + branch
Table inventory {
  id                  uuid      [pk, default: `gen_random_uuid()`]
  variant_id          uuid      [not null, ref: > product_variants.id]
  branch_id           uuid      [not null, ref: > companies.id]
  quantity_on_hand    int       [not null, default: 0]
  quantity_reserved   int       [not null, default: 0, note: "Đã đặt nhưng chưa xuất"]
  low_stock_threshold int       [default: 5]
  updated_at          timestamp [default: `now()`]

  indexes {
    (variant_id, branch_id) [unique]
  }
}

Table inventory_transactions {
  id            uuid      [pk, default: `gen_random_uuid()`]
  inventory_id  uuid      [not null, ref: > inventory.id]
  type          varchar   [not null, note: "in | out | adjustment | reserved | release"]
  quantity      int       [not null, note: "Âm = xuất kho, dương = nhập kho"]
  reference_id  uuid      [note: "order_id hoặc purchase_order_id tùy type"]
  note          text
  created_by    uuid      [ref: > users.id]
  created_at    timestamp [default: `now()`]
}

// ============================================================
// ORDERS
// ============================================================

Table customers {
  id          uuid      [pk, default: `gen_random_uuid()`]
  full_name   varchar   [not null]
  email       varchar
  phone       varchar   [not null]
  address     text
  created_at  timestamp [default: `now()`]
  updated_at  timestamp [default: `now()`]
}

Table orders {
  id              uuid          [pk, default: `gen_random_uuid()`]
  branch_id       uuid          [not null, ref: > companies.id]
  customer_id     uuid          [ref: > customers.id]
  code            varchar       [unique, not null, note: "CFT-2025-00001"]
  status          varchar       [not null, note: "pending | confirmed | processing | shipped | delivered | cancelled"]
  payment_status  varchar       [not null, note: "unpaid | paid | refunded"]
  payment_method  varchar       [note: "cash | bank_transfer | cod | momo"]
  subtotal        numeric(12,2) [not null]
  discount        numeric(12,2) [default: 0]
  shipping_fee    numeric(12,2) [default: 0]
  total           numeric(12,2) [not null]
  note            text
  assigned_to     uuid          [ref: > users.id]
  created_by      uuid          [ref: > users.id]
  created_at      timestamp     [default: `now()`]
  updated_at      timestamp     [default: `now()`]
}

Table order_items {
  id          uuid          [pk, default: `gen_random_uuid()`]
  order_id    uuid          [not null, ref: > orders.id]
  variant_id  uuid          [not null, ref: > product_variants.id]
  quantity    int           [not null]
  unit_price  numeric(12,2) [not null, note: "Giá tại thời điểm đặt"]
  discount    numeric(12,2) [default: 0]
  total       numeric(12,2) [not null]
}

Table order_status_logs {
  id          uuid      [pk, default: `gen_random_uuid()`]
  order_id    uuid      [not null, ref: > orders.id]
  from_status varchar
  to_status   varchar   [not null]
  note        text
  created_by  uuid      [ref: > users.id]
  created_at  timestamp [default: `now()`]
}

// ============================================================
// CMS — POSTS & CONTENT
// ============================================================

Table posts {
  id            uuid      [pk, default: `gen_random_uuid()`]
  author_id     uuid      [ref: > users.id]
  title         varchar   [not null]
  slug          varchar   [unique, not null]
  excerpt       text
  content       text
  cover_url     varchar
  status        varchar   [not null, note: "draft | published | archived"]
  published_at  timestamp
  created_at    timestamp [default: `now()`]
  updated_at    timestamp [default: `now()`]
}

Table post_tags {
  post_id  uuid  [not null, ref: > posts.id]
  tag_id   uuid  [not null, ref: > tags.id]

  indexes {
    (post_id, tag_id) [pk]
  }
}

// Nội dung website linh hoạt (banner, FAQ, landing page blocks...)
Table content_blocks {
  id          uuid      [pk, default: `gen_random_uuid()`]
  branch_id   uuid      [ref: > companies.id, note: "null = toàn hệ thống"]
  key         varchar   [not null, note: "homepage_banner | about_us"]
  type        varchar   [not null, note: "html | json | markdown"]
  value       text      [not null]
  updated_by  uuid      [ref: > users.id]
  updated_at  timestamp [default: `now()`]

  indexes {
    (branch_id, key) [unique]
  }
}
```

---

## Ghi chú thiết kế

### Cấu trúc tổ chức

- Bảng `companies` tự tham chiếu qua `parent_id` để mô hình hoá 3 cấp: **group → company → branch**.
- `type` xác định cấp của node: `group` (root), `company`, `branch`.
- Nhân viên (`users.branch_id`) chỉ được gán vào node có `type = branch`.

### RBAC

- `roles` + `permissions` là global, không scope theo công ty.
- `user_branch_roles` gán user vào một branch với một role — một user có thể có role khác nhau ở các branch khác nhau.
- `user_extra_permissions` — quyền cấp thêm ngoài role mặc định.
- `user_revoked_permissions` — quyền bị thu hồi so với role mặc định.
- `effective_permissions = (role.permissions - revoked) + extra`
- Super Admin (`users.is_super_admin = true`) không cần `user_branch_roles` — có toàn quyền.

### Inventory

- Tồn kho theo dõi ở cấp **variant × branch**.
- `quantity_reserved` tách riêng để tránh oversell.
- `inventory_transactions` ghi log toàn bộ biến động — audit trail và báo cáo.

### Orders

- `orders.branch_id` thay vì `store_id` — phù hợp với model mới.
- `orders.code` là mã đơn hàng đọc được (CFT-2025-00001), tách khỏi UUID.
- `order_items.unit_price` lưu giá tại thời điểm đặt hàng.

### CMS

- `tags` dùng chung cho `products` và `posts`.
- `content_blocks.branch_id = null` nghĩa là áp dụng toàn hệ thống.
- `tenant_id` được loại bỏ vì hệ thống không còn multi-tenant — chỉ có một tập đoàn duy nhất.
