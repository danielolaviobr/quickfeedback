import React from "react";
import Head from "next/head";
import { Box, Button, Flex, Link, Stack, Text } from "@chakra-ui/react";
import { GetStaticProps } from "next";

import useAuth from "@lib/auth";
import { GitHub, Google, Logo } from "@styles/theme";
import { getAllFeedback } from "@lib/firestore-admin";
import { Feedback as FeedbackType } from "@lib/@types/firestore";
import Feedback from "@components/Feedback";
import FeedbackLink from "@components/FeedbackLink";

const SITE_ID = "6YCwlNGDFLxrwT7VXGwq";

export const getStaticProps: GetStaticProps = async (context) => {
  const feedback = await getAllFeedback(SITE_ID);

  return {
    props: {
      feedback
    },
    revalidate: 1
  };
};

interface HomeProps {
  feedback: FeedbackType[];
}

const Home: React.FC<HomeProps> = ({ feedback: allFeedback }) => {
  const { signInWithGitHub, signInWithGoogle, user } = useAuth();
  return (
    <>
      <Box px={8}>
        <Flex
          py={16}
          as="main"
          direction="column"
          maxW="700px"
          margin="0 auto"
          flex="1"
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
          <Logo color="black" w="42px" h="42px" mb={4} />
          <Text mb={8}>
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
              <Stack isInline mt={4} spacing={4}>
                <Button
                  px={4}
                  py={5}
                  size="sm"
                  variant="black"
                  onClick={signInWithGitHub}
                  leftIcon={<GitHub w="18px" h="18px" />}
                >
                  Sign In with GitHub
                </Button>
                <Button
                  px={4}
                  py={5}
                  size="sm"
                  variant="white"
                  leftIcon={<Google w="18px" h="18px" />}
                  onClick={signInWithGoogle}
                >
                  Sign In with Google
                </Button>
              </Stack>
            </>
          )}
        </Flex>
      </Box>
      <Flex
        as="footer"
        bg="white"
        direction="column"
        align="center"
        justify="top"
        px={8}
        flex="1"
      >
        <Box as="div" maxW="700px" mt={8} my={16} w="100%">
          <FeedbackLink siteId={SITE_ID} />
          {allFeedback.map((feedback) => (
            <Feedback key={feedback.id} {...feedback} />
          ))}
        </Box>
      </Flex>
    </>
  );
};

export default Home;
