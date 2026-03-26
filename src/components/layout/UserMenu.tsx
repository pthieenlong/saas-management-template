import { Avatar, Badge, Flex, Menu, Portal, Separator, Text } from "@chakra-ui/react";
import { Building2, Check, ChevronRight, LogOut, Settings, User } from "lucide-react";
import { useCompanyStore } from "@store/useCompanyStore";
import { MOCK_STORES } from "@lib/mock/stores";

export function UserMenu() {
  const { selectedCompany, selectCompany, clearCompany } = useCompanyStore();

  return (
    <Menu.Root positioning={{ placement: "bottom-end" }}>
      <Menu.Trigger
        aria-label="User menu"
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
      >
        <Flex align="center" gap={2}>
          <Avatar.Root size="sm">
            <Avatar.Fallback name="Admin User" />
          </Avatar.Root>
        </Flex>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="220px">
            {/* User info */}
            <Flex direction="column" px={3} py={2}>
              <Text fontWeight="semibold" fontSize="sm">Admin User</Text>
              <Text fontSize="xs" color="fg.muted">admin@example.com</Text>
            </Flex>

            <Separator />

            {/* Store switcher */}
            <Flex direction="column" px={3} pt={2} pb={1} gap={1}>
              <Flex align="center" gap={1.5} color="fg.muted" mb={0.5}>
                <Building2 size={12} />
                <Text fontSize="xs" fontWeight="medium" textTransform="uppercase" letterSpacing="wide">
                  Chi nhánh
                </Text>
              </Flex>

              {/* Toàn hệ thống */}
              <Menu.Item
                value="all"
                onClick={clearCompany}
                borderRadius="md"
                px={2}
              >
                <Flex align="center" justify="space-between" w="full">
                  <Text fontSize="sm">Toàn hệ thống</Text>
                  {!selectedCompany && <Check size={14} />}
                </Flex>
              </Menu.Item>

              {/* Danh sách chi nhánh */}
              {MOCK_STORES.map((store) => (
                <Menu.Item
                  key={store.id}
                  value={store.id}
                  onClick={() => selectCompany(store)}
                  borderRadius="md"
                  px={2}
                  disabled={store.status === "inactive"}
                >
                  <Flex align="center" justify="space-between" w="full" gap={2}>
                    <Flex direction="column" gap={0}>
                      <Text fontSize="sm">{store.name}</Text>
                      <Text fontSize="xs" color="fg.muted">{store.city}</Text>
                    </Flex>
                    <Flex align="center" gap={1} flexShrink={0}>
                      {store.status === "inactive" && (
                        <Badge size="xs" colorPalette="gray">Đóng</Badge>
                      )}
                      {selectedCompany?.id === store.id && <Check size={14} />}
                    </Flex>
                  </Flex>
                </Menu.Item>
              ))}
            </Flex>

            <Separator />

            <Menu.Item value="profile">
              <User size={14} />
              <Text fontSize="sm">Profile</Text>
              <ChevronRight size={12} style={{ marginLeft: "auto" }} />
            </Menu.Item>

            <Menu.Item value="settings">
              <Settings size={14} />
              <Text fontSize="sm">Settings</Text>
            </Menu.Item>

            <Separator />

            <Menu.Item value="logout" color="red.fg">
              <LogOut size={14} />
              <Text fontSize="sm">Đăng xuất</Text>
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
