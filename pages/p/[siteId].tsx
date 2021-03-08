import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import Feedback from "@components/Feedback";
import useAuth from "@lib/auth";
import { getAllFeedback, getAllSites } from "@lib/firestore-admin";
import { Feedback as FeedbackType } from "@lib/@types/firestore";
import { createFeedback } from "@lib/firestore";
import { compareDesc, parseISO } from "date-fns";

interface SiteFeedback {
  initialFeedback: FeedbackType[];
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { siteId } = context.params as { [key: string]: string };
  const feedback = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id
    }
  }));
  return {
    paths,
    fallback: false
  };
};

const SiteFeedback: React.FC<SiteFeedback> = ({ initialFeedback }) => {
  const { user } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [allFeedback, setAllFeedback] = useState<FeedbackType[]>(
    initialFeedback
  );

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newFeedback: FeedbackType = {
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId as string,
      text: inputRef.current.value,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: "pending"
    };

    setAllFeedback([...allFeedback, newFeedback]);

    inputRef.current.value = "";

    await createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      <FormControl my={8} onSubmit={handleFormSubmit} as="form">
        <FormLabel>Comment</FormLabel>
        <Input colorScheme="purple" type="text" bg="white" ref={inputRef} />
        <Button my={4} type="submit" colorScheme="purple">
          Add comment
        </Button>
      </FormControl>
      {allFeedback
        .sort((a, b) =>
          compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
        )
        .map((feedback) => (
          <Feedback key={feedback.id || feedback.createdAt} {...feedback} />
        ))}
    </Box>
  );
};

export default SiteFeedback;
