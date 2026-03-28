import { createFileRoute } from "@tanstack/react-router";
import { CategoriesPage } from "@pages/categories/index";

export const Route = createFileRoute("/categories/")({
  component: CategoriesPage,
});
