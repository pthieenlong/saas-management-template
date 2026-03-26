import { createFileRoute } from "@tanstack/react-router";
import { StaffDetailPage } from "@pages/staff/detail/index";

export const Route = createFileRoute("/staff/$staffId")({
  component: StaffDetailPage,
});
