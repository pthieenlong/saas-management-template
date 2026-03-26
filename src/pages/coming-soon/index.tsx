import { Flex, Heading, Text } from "@chakra-ui/react";
import { Construction } from "lucide-react";

interface ComingSoonPageProps {
  title: string;
}

export function ComingSoonPage({ title }: ComingSoonPageProps) {
  return (
    <Flex direction="column" align="center" justify="center" h="full" gap={3} color="fg.muted">
      <Construction size={40} />
      <Heading size="md">{title}</Heading>
      <Text fontSize="sm">Module này đang được phát triển</Text>
    </Flex>
  );
}
