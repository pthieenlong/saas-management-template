import type { Company } from "@features/company";

export type Store = Company & {
  city: string;
};

export const MOCK_STORES: Store[] = [
  {
    id: "branch-q1",
    name: "Comforty Quận 1",
    code: "CFT-HCM-Q1",
    type: "branch",
    status: "active",
    city: "TP. Hồ Chí Minh",
    address: "123 Lê Lợi, Phường Bến Nghé, Q.1",
    phone: "028 3822 1234",
    thumbnail: "https://placehold.co/400x200/e2e8f0/64748b",
  },
  {
    id: "branch-q3",
    name: "Comforty Quận 3",
    code: "CFT-HCM-Q3",
    type: "branch",
    status: "active",
    city: "TP. Hồ Chí Minh",
    address: "456 Võ Văn Tần, Phường 5, Q.3",
    phone: "028 3930 5678",
    thumbnail: "https://placehold.co/400x200/e2e8f0/64748b",
  },
  {
    id: "branch-hk",
    name: "Comforty Hoàn Kiếm",
    code: "CFT-HN-HK",
    type: "branch",
    status: "active",
    city: "Hà Nội",
    address: "78 Đinh Tiên Hoàng, Phường Lý Thái Tổ",
    phone: "024 3826 9900",
    thumbnail: "https://placehold.co/400x200/e2e8f0/64748b",
  },
  {
    id: "branch-dn-1",
    name: "Comforty Đà Nẵng",
    code: "CFT-DN-NVL",
    type: "branch",
    status: "inactive",
    city: "Đà Nẵng",
    address: "210 Nguyễn Văn Linh, Phường Thạc Gián",
    phone: "0236 3655 111",
    thumbnail: "https://placehold.co/400x200/e2e8f0/64748b",
  },
];
