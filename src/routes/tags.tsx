import { createFileRoute } from "@tanstack/react-router";
import { TagsPage } from "@pages/tags/index";

export const Route = createFileRoute("/tags")({
  component: TagsPage,
});
