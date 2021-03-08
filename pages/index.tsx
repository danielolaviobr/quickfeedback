import React from "react";
import Head from "next/head";
import { Button, Flex, Link, Text } from "@chakra-ui/react";

import useAuth from "@lib/auth";
import { GitHub, Google, Logo } from "@styles/theme";

export default function Home() {
  const { signInWithGitHub, signInWithGoogle, user } = useAuth();
  return (
    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      maxW="400px"
      margin="0 auto"
    >
      <Head>
        <title>Quick Feedback</title>

        <script
          dangerouslySetInnerHTML={{
            __html: `
                if (document.cookie && document.cookie.includes('QuickFeedback-auth')) {
                  window.location.href = "/dashboard"
                }
              `
          }}
        />
      </Head>
      <Logo color="black" w="42px" h="42px" mb={2} />
      <Text mb={4} px={8}>
        <Text as="span" fontWeight="bold" display="inline">
          Fast Feedback
        </Text>
        {" is being built as part of "}
        <Link
          href="https://react2025.com"
          isExternal
          textDecoration="underline"
        >
          React 2025
        </Link>
        {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
      </Text>
      {user ? (
        <Button as="a" mt={4} size="sm" variant="white" href="/dashboard">
          View Dashboard
        </Button>
      ) : (
        <>
          <Button
            mt={4}
            size="sm"
            variant="black"
            onClick={signInWithGitHub}
            leftIcon={<GitHub w="18px" h="18px" />}
          >
            Sign In with GitHub
          </Button>
          <Button
            mt={4}
            size="sm"
            variant="white"
            leftIcon={<Google w="18px" h="18px" />}
            onClick={signInWithGoogle}
          >
            Sign In with Google
          </Button>
        </>
      )}
    </Flex>
  );
}
