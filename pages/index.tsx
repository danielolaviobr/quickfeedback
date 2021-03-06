import React from "react";
import Head from "next/head";
import { Avatar, Button, Heading, Icon, Stack, Text } from "@chakra-ui/react";

import useAuth from "@lib/auth";
import { Logo } from "@styles/theme";
import FreePlanEmptyState from "@components/FreePlanEmptyState";
import EmptyState from "@components/EmptyState";

export default function Home() {
  const { signInWithGithub, user, signOut } = useAuth();

  return <EmptyState />;
  return (
    <Stack as="main" align="center" justify="center" h="100vh">
      <Head>
        <title>Create Next App</title>
      </Head>
      <Heading>Quick Feedback</Heading>
      <Logo w={50} h={50} />
      {user ? (
        <Button onClick={async () => await signOut()}>Sign out</Button>
      ) : (
        <Button size="sm" mt={4} onClick={async () => await signInWithGithub()}>
          Sign In with GitHub
        </Button>
      )}
    </Stack>
  );
}
