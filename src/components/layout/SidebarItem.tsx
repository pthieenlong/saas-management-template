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
      justify="flex-start"
      gap={3}
      px={3}
      py={2}
      borderRadius="md"
      cursor="pointer"
      colorPalette="primary"
      bg={isActive ? "colorPalette.subtle" : "transparent"}
      color={isActive ? "colorPalette.fg" : "fg.muted"}
      _hover={{ bg: "bg.subtle", color: "fg" }}
      transition="background 0.15s, color 0.15s"
      onClick={onClick}
      title={collapsed ? label : undefined}
    >
      <Box as={Icon} boxSize={4} flexShrink={0} />
      <Text
        fontSize="sm"
        fontWeight={isActive ? "semibold" : "medium"}
        opacity={collapsed ? 0 : 1}
        w={collapsed ? 0 : "auto"}
        overflow="hidden"
        whiteSpace="nowrap"
        transition="opacity 0.15s ease, width 0.2s ease"
      >
        {label}
      </Text>
    </Flex>
  )
}
