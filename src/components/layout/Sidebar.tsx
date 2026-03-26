import type { ReactNode } from "react";
import { Box, Flex, Text, Separator, IconButton } from "@chakra-ui/react";
import { PanelLeftClose, PanelLeftOpen, type LucideIcon } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

export type NavItem = {
  icon: LucideIcon;
  label: string;
  id: string;
};

interface SidebarProps {
  navItems: NavItem[];
  brandLabel?: string;
  activeItem?: string;
  onNavigate?: (id: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  footer?: ReactNode;
}

export function Sidebar({
  navItems,
  brandLabel = "Comforty",
  activeItem,
  onNavigate,
  collapsed,
  onToggleCollapse,
  footer,
}: SidebarProps) {
  return (
    <Flex
      direction="column"
      w={collapsed ? "60px" : "240px"}
      h="100vh"
      bg="bg.panel"
      borderRightWidth="1px"
      borderColor="border.subtle"
      flexShrink={0}
      overflow="hidden"
      transition="width 0.2s ease"
    >
      {/* Brand */}
      <Flex
        align="center"
        justify="flex-start"
        gap={2}
        px={4}
        h="72px"
        borderBottomWidth="1px"
        borderColor="border.subtle"
      >
        <Box
          w={7}
          h={7}
          colorPalette="primary"
          bg="colorPalette.solid"
          borderRadius="md"
          flexShrink={0}
        />
        <Text
          fontWeight="bold"
          fontSize="md"
          opacity={collapsed ? 0 : 1}
          w={collapsed ? 0 : "auto"}
          overflow="hidden"
          whiteSpace="nowrap"
          transition="opacity 0.15s ease, width 0.2s ease"
        >
          {brandLabel}
        </Text>
      </Flex>

      {/* Main nav */}
      <Flex
        direction="column"
        flex={1}
        px={3}
        py={4}
        gap={1}
        overflowY="auto"
      >
        {navItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            collapsed={collapsed}
            onClick={() => onNavigate?.(item.id)}
          />
        ))}
      </Flex>

      {/* Footer slot + collapse toggle */}
      <Box px={3} pb={4}>
        {footer && <Box mb={2}>{footer}</Box>}
        <Separator mb={3} />
        <Flex
          flexDirection="row"
          justify="space-between"
          alignItems="center"
          mt={2}
        >
          <Text
            fontWeight="light"
            fontSize={12}
            opacity={collapsed ? 0 : 1}
            w={collapsed ? 0 : "auto"}
            overflow="hidden"
            whiteSpace="nowrap"
            transition="opacity 0.15s ease, width 0.2s ease"
          >
            Made by pthieenlong
          </Text>
          <IconButton
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            variant="ghost"
            size="md"
            onClick={onToggleCollapse}
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </IconButton>
        </Flex>
      </Box>
    </Flex>
  );
}
