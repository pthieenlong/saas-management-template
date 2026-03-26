import { createFileRoute } from "@tanstack/react-router";
import { ProductsPage } from "@pages/products/index";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
});
