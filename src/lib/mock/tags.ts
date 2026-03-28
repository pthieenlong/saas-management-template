export type Tag = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
};

export const MOCK_TAGS: Tag[] = [
  { id: "tag-1", name: "Mới ra mắt", slug: "moi-ra-mat", isActive: true },
  { id: "tag-2", name: "Bán chạy", slug: "ban-chay", isActive: true },
  { id: "tag-3", name: "Giảm giá", slug: "giam-gia", isActive: true },
  { id: "tag-4", name: "Hàng cao cấp", slug: "hang-cao-cap", isActive: true },
  { id: "tag-5", name: "Gỗ tự nhiên", slug: "go-tu-nhien", isActive: true },
  { id: "tag-6", name: "Gỗ công nghiệp", slug: "go-cong-nghiep", isActive: true },
  { id: "tag-7", name: "Nhập khẩu", slug: "nhap-khau", isActive: true },
  { id: "tag-8", name: "Sản xuất trong nước", slug: "san-xuat-trong-nuoc", isActive: true },
  { id: "tag-9", name: "Phù hợp trẻ em", slug: "phu-hop-tre-em", isActive: false },
  { id: "tag-10", name: "Tiết kiệm không gian", slug: "tiet-kiem-khong-gian", isActive: true },
  { id: "tag-11", name: "Đa năng", slug: "da-nang", isActive: true },
  { id: "tag-12", name: "Phong cách Bắc Âu", slug: "phong-cach-bac-au", isActive: true },
  { id: "tag-13", name: "Phong cách hiện đại", slug: "phong-cach-hien-dai", isActive: true },
  { id: "tag-14", name: "Phong cách cổ điển", slug: "phong-cach-co-dien", isActive: false },
  { id: "tag-15", name: "Flash sale", slug: "flash-sale", isActive: true },
];
