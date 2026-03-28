import React from "react";
import { Badge, Flex, IconButton, Text, Breadcrumb } from "@chakra-ui/react";
import { ChevronLeft } from "lucide-react";
import { ColorModeButton } from "@components/ui/color-mode";
import { UserMenu } from "./UserMenu";
import { useCompanyStore } from "@store/useCompanyStore";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface HeaderProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  onBack?: () => void;
}

export function Header({ title, breadcrumbs, onBack }: HeaderProps) {
  const selectedCompany = useCompanyStore((s) => s.selectedCompany);

  return (
    <Flex
      align="center"
      justify="space-between"
      px={6}
      h="72px"
      bg="bg.surface"
      borderBottomWidth="1px"
      borderColor="border.muted"
      flexShrink={0}
    >
      <Flex align="center" gap={3}>
        {onBack && (
          <IconButton
            aria-label="Go back"
            variant="outline"
            size="md"
            borderRadius="xl"
            onClick={onBack}
          >
            <ChevronLeft />
          </IconButton>
        )}

        <Flex direction="column" gap={0.5}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <Breadcrumb.Root size="sm">
              <Breadcrumb.List>
                {breadcrumbs.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <Breadcrumb.Item>
                      {index < breadcrumbs.length - 1 ? (
                        <Breadcrumb.Link
                          cursor={crumb.onClick ? "pointer" : "default"}
                          onClick={crumb.onClick}
                        >
                          {crumb.label}
                        </Breadcrumb.Link>
                      ) : (
                        <Breadcrumb.CurrentLink>{crumb.label}</Breadcrumb.CurrentLink>
                      )}
                    </Breadcrumb.Item>
                    {index < breadcrumbs.length - 1 && <Breadcrumb.Separator />}
                  </React.Fragment>
                ))}
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )}

          <Flex align="center" gap={2}>
            <Text fontWeight="bold" fontSize="lg" lineHeight="short">
              {title}
            </Text>
            {selectedCompany && (
              <Badge colorPalette="primary" size="sm" variant="subtle">
                {selectedCompany.name}
              </Badge>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex align="center" gap={2}>
        <ColorModeButton />
        <UserMenu />
      </Flex>
    </Flex>
  );
}
