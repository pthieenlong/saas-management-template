import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Provider } from "@components/ui/provider";
import { AppShell } from "@app/layout/AppShell";

export const Route = createRootRoute({
  component: () => (
    <Provider>
      <AppShell>
        <Outlet />
      </AppShell>
    </Provider>
  ),
});
