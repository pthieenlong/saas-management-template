import { createFileRoute } from "@tanstack/react-router";
import { UserPermissionsPage } from "@pages/user-permissions/index";

export const Route = createFileRoute("/user-permissions")({
  component: UserPermissionsPage,
});
