# Comforty Admin

Hệ thống quản trị cho chuỗi cửa hàng nội thất **Comforty**, xây dựng theo mô hình **multi-tenant** để quản lý nhiều chi nhánh với phân quyền RBAC.

---

## Tech Stack

| Công nghệ | Phiên bản | Mục đích |
| --- | --- | --- |
| React | 19 | UI framework |
| TypeScript | 5.9 | Ngôn ngữ |
| Vite | 8 | Bundler |
| Chakra UI | 3 | Component library |
| TanStack Router | 1 | Client-side routing |
| Lucide React | — | Icon library |
| React Hook Form | — | Form state management |
| Zod | — | Schema validation |
| SCSS | — | Global styles |

---

## Cài đặt & Chạy

```bash
# Cài dependencies
npm install

# Chạy môi trường dev
npm run dev

# Build production
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

---

## Cấu trúc thư mục

```text
src/
  assets/            # Hình ảnh, SVG, global styles
  components/        # Shared components (dùng ở 2+ trang)
    ui/              # Chakra UI wrappers / primitives
    layout/          # Header, Sidebar, ...
  pages/             # Page-level components theo route
    <feature>/
      components/    # Components chỉ dùng trong feature này
      hooks/         # Custom hooks scoped to feature
      schemas/       # Zod schemas scoped to feature
      index.tsx      # Page component
  app/               # Router setup, providers, theme
  docs/              # Tài liệu dự án
```

---

## Path Aliases

| Alias | Trỏ đến |
| --- | --- |
| `@/*` | `./*` |
| `@assets/*` | `./src/assets/*` |
| `@services/*` | `./src/modules/*` |
| `@components/*` | `./src/components/*` |

---

## Roles & Phân quyền

| Role | Phạm vi | Quyền hạn |
| --- | --- | --- |
| **Staff** (Nhân viên) | Cửa hàng cụ thể | Xem và xử lý đơn hàng, xem sản phẩm |
| **Store Manager** (Quản lý cửa hàng) | Cửa hàng cụ thể | Toàn bộ nghiệp vụ cửa hàng, quản lý nhân viên |
| **Admin** (Quản lý chuỗi) | Toàn bộ chuỗi | Quản lý tất cả chi nhánh, cấu hình, báo cáo tổng hợp |

---

## Modules chức năng

- **Dashboard** — Tổng quan theo role (doanh thu, đơn hàng, tồn kho)
- **Quản lý đơn hàng** — Tạo, xem, cập nhật trạng thái
- **Quản lý sản phẩm** — CRUD sản phẩm, thuộc tính, hình ảnh
- **Quản lý danh mục** — Cây danh mục sản phẩm
- **Quản lý tồn kho** — Theo dõi số lượng tồn kho theo chi nhánh
- **Tags & Nội dung** — Bài viết, tags, CMS website
- **Quản lý nhân viên** — Tài khoản, phân quyền
- **Quản lý cửa hàng** — Thông tin chi nhánh, địa chỉ, giờ mở cửa
- **Cài đặt** — Cấu hình hệ thống, tùy chỉnh theo tenant

---

## Tài liệu

- [OVERVIEW.md](src/docs/OVERVIEW.md) — Tổng quan kiến trúc và nghiệp vụ
- [CODE_RULES.md](src/docs/CODE_RULES.md) — Quy tắc code của dự án
- [CLAUDE.md](CLAUDE.md) — Rules cho AI assistant
