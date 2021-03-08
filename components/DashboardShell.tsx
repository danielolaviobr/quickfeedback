import React from "react";
import { Flex, Stack, Link, Avatar, Button } from "@chakra-ui/react";
import NextLink from "next/link";

import { Logo } from "@styles/theme";
import useAuth from "@lib/auth";

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
          <NextLink href="/" passHref>
            <Logo as="a" w="24px" h="24px" className="cursor-pointer" />
          </NextLink>
          <NextLink href="/feedback" passHref>
            <Link>Feedback</Link>
          </NextLink>
          <NextLink href="/dashboard" passHref>
            <Link>Sites</Link>
          </NextLink>
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
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
