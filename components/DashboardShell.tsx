import React from "react";
import { Flex, Stack, Link, Avatar, Button, Box } from "@chakra-ui/react";
import NextLink from "next/link";

import { Logo } from "@styles/theme";
import useAuth from "@lib/auth";
import { useRouter } from "next/router";

const DashboardShell: React.FC = ({ children }) => {
  const { user } = useAuth();
  const { push } = useRouter();
  return (
    <>
      <Box
        w="100%"
        h={2}
        bg="purple.500"
        boxShadow="0 0 0.5rem #805AD5"
        zIndex="10"
        top="0"
        position="fixed"
      />
      <Flex justifyContent="center" flexDirection="column">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          backgroundColor="white"
          py={4}
          px={8}
          w="100%"
          top="0"
          position="fixed"
          boxShadow="sm"
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
              <Link fontWeight="medium">Feedback</Link>
            </NextLink>
            <NextLink href="/sites" passHref>
              <Link fontWeight="medium">Sites</Link>
            </NextLink>
          </Stack>
          <Stack spacing={4} isInline alignItems="center">
            {user && (
              <Button variant="ghost" mr={2} onClick={() => push("/account")}>
                Account
              </Button>
            )}
            <Avatar size="md" src={user?.photoUrl} />
          </Stack>
        </Flex>
        <Flex
          backgroundColor="gray.100"
          alignItems="start"
          justifyContent="center"
          minH="100vh"
        >
          <Flex
            m={24}
            flexDirection="column"
            maxWidth="1000px"
            w="100%"
            mx="auto"
            py={8}
          >
            {children}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default DashboardShell;
