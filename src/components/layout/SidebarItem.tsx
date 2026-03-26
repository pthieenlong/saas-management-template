import { Box, Flex, Text } from "@chakra-ui/react"
import type { LucideIcon } from "lucide-react"

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  isActive?: boolean
  collapsed?: boolean
  onClick?: () => void
}

export function SidebarItem({ icon: Icon, label, isActive, collapsed, onClick }: SidebarItemProps) {
  return (
    <Flex
      align="center"
      justify={collapsed ? "center" : "flex-start"}
      gap={3}
      px={collapsed ? 0 : 3}
      py={2}
      borderRadius="md"
      cursor="pointer"
      colorPalette="primary"
      bg={isActive ? "colorPalette.subtle" : "transparent"}
      color={isActive ? "colorPalette.fg" : "fg.muted"}
      _hover={{ bg: "bg.subtle", color: "fg" }}
      transition="all 0.15s"
      onClick={onClick}
      title={collapsed ? label : undefined}
    >
      <Box as={Icon} boxSize={4} flexShrink={0} />
      {!collapsed && (
        <Text fontSize="sm" fontWeight={isActive ? "semibold" : "medium"}>
          {label}
        </Text>
      )}
    </Flex>
  )
}
