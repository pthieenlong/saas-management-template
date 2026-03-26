import { createFileRoute } from "@tanstack/react-router";
import { CompaniesPage } from "@pages/companies/index";

export const Route = createFileRoute("/companies/")({
  component: CompaniesPage,
});
