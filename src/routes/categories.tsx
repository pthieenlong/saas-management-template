import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@pages/coming-soon/index";

export const Route = createFileRoute("/categories")({
  component: () => <ComingSoonPage title="Danh mục" />,
});
