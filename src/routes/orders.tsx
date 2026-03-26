import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@pages/coming-soon/index";

export const Route = createFileRoute("/orders")({
  component: () => <ComingSoonPage title="Đơn hàng" />,
});
