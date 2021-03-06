import React from "react";
import {
  Flex,
  Stack,
  Link,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button
} from "@chakra-ui/react";
import { Logo } from "@styles/theme";
import useAuth from "@lib/auth";
import AddSitesModal from "./AddSitesModal";

const DashboardShell: React.FC = ({ children }) => {
  const { user, signOut } = useAuth();
  return (
    <Flex justifyContent="center" flexDirection="column">
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        py={4}
        px={8}
      >
        <Stack
          spacing={4}
          justifyContent="flex-start"
          alignItems="center"
          isInline
        >
          <Logo w="24px" h="24px" />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Stack spacing={4} isInline alignItems="center">
          {user && (
            <Button variant="ghost" mr={2} onClick={signOut}>
              Log Out
            </Button>
          )}
          <Avatar size="md" src={user?.photoUrl} />
        </Stack>
      </Flex>
      <Flex
        backgroundColor="gray.50"
        alignItems="start"
        justifyContent="center"
        h="100vh"
      >
        <Flex
          m={24}
          flexDirection="column"
          maxWidth="1000px"
          w="100%"
          ml="auto"
          mr="auto"
        >
          <Flex align="center" justify="space-between">
            <Flex direction="column">
              <Breadcrumb spacing={4}>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink color="gray.700" fontSize="lg">
                    Sites
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
              <Heading mb={4}>My Sites</Heading>
            </Flex>
            <AddSitesModal>+ Add site</AddSitesModal>
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
