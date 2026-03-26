import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@pages/coming-soon/index";

export const Route = createFileRoute("/inventory")({
  component: () => <ComingSoonPage title="Tồn kho" />,
});
