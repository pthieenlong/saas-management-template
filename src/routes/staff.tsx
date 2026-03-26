import { createFileRoute } from "@tanstack/react-router";
import { StaffPage } from "@pages/staff/index";

export const Route = createFileRoute("/staff")({
  component: StaffPage,
});
