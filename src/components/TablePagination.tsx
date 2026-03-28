import {
  ButtonGroup,
  Flex,
  IconButton,
  PaginationEllipsis,
  PaginationItem,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
  Text,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export function TablePagination({ page, totalCount, pageSize, onPageChange }: Props) {
  if (totalCount <= pageSize) return null;

  return (
    <Flex
      px={4}
      py={3}
      borderTopWidth="1px"
      borderColor="border.muted"
      align="center"
      justify="space-between"
    >
      <Text fontSize="sm" color="fg.muted">
        {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, totalCount)} / {totalCount}
      </Text>

      <PaginationRoot
        page={page}
        count={totalCount}
        pageSize={pageSize}
        onPageChange={(e) => onPageChange(e.page)}
        siblingCount={1}
      >
        <ButtonGroup variant="ghost" size="sm">
          <PaginationPrevTrigger asChild>
            <IconButton aria-label="Trang trước">
              <ChevronLeft size={16} />
            </IconButton>
          </PaginationPrevTrigger>

          <PaginationItems
            render={(page) => (
              <PaginationItem key={page.value} type="page" value={page.value} />
            )}
            ellipsis={<PaginationEllipsis />}
          />

          <PaginationNextTrigger asChild>
            <IconButton aria-label="Trang sau">
              <ChevronRight size={16} />
            </IconButton>
          </PaginationNextTrigger>
        </ButtonGroup>
      </PaginationRoot>
    </Flex>
  );
}
