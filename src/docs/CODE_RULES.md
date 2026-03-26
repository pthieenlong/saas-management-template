# Code Rules

## Placeholder Images

Khi cần một ảnh giả/mặc định (avatar, product, cover...), luôn dùng `https://placehold.co/` với kích thước phù hợp.

```tsx
// Correct
<img src="https://placehold.co/400x300" alt="placeholder" />
<img src="https://placehold.co/80x80" alt="avatar" />

// Wrong — đừng dùng picsum, via.placeholder, lorempixel hay ảnh hardcode khác
<img src="https://picsum.photos/400/300" alt="placeholder" />
```

Format URL: `https://placehold.co/{width}x{height}`
Tùy chọn thêm màu nền và chữ: `https://placehold.co/400x300/e2e8f0/64748b`
