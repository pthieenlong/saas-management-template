import {
  Box,
  Button,
  Dialog,
  Flex,
  Portal,
  Text,
} from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface StaffDangerZoneProps {
  staffName: string;
  onDelete: () => void;
}

export function StaffDangerZone({ staffName, onDelete }: StaffDangerZoneProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        bg="bg.surface"
        borderWidth="1px"
        borderColor="red.200"
        borderRadius="lg"
        p={4}
      >
        <Text fontWeight="semibold" fontSize="sm" color="red.600" mb={3}>
          Vùng nguy hiểm
        </Text>
        <Flex align="center" justify="space-between">
          <Text fontSize="sm" color="fg.muted">
            Xóa vĩnh viễn tài khoản nhân viên này khỏi hệ thống.
          </Text>
          <Button
            size="sm"
            colorPalette="red"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Trash2 size={14} />
            Xóa nhân viên
          </Button>
        </Flex>
      </Box>

      <Dialog.Root
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
        role="alertdialog"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Xác nhận xóa nhân viên</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text fontSize="sm">
                  Bạn có chắc muốn xóa{" "}
                  <Text as="span" fontWeight="semibold">
                    {staffName}
                  </Text>
                  ? Hành động này không thể hoàn tác.
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Flex gap={3} justify="flex-end">
                  <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                    Hủy
                  </Button>
                  <Button
                    colorPalette="red"
                    size="sm"
                    onClick={() => {
                      setOpen(false);
                      onDelete();
                    }}
                  >
                    Xác nhận xóa
                  </Button>
                </Flex>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}
