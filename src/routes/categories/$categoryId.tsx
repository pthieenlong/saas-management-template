import { createFileRoute } from "@tanstack/react-router";
import { CategoryDetailPage } from "@pages/categories/detail/index";

export const Route = createFileRoute("/categories/$categoryId")({
  component: CategoryDetailPage,
});
