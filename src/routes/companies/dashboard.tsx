import { createFileRoute } from "@tanstack/react-router";
import { CompanyDashboardPage } from "@pages/companies/dashboard/index";

export const Route = createFileRoute("/companies/dashboard")({
  component: CompanyDashboardPage,
});
