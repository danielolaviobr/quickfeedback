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

interface SiteFeedbackProps {
  initialFeedback: FeedbackType[];
  siteId: string;
  route: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const [siteId, route] = (context.params.site as string[]) || [];
  const feedback = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
      siteId,
      route
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id]
    }
  }));
  return {
    paths,
    fallback: true
  };
};

const SiteFeedback: React.FC<SiteFeedbackProps> = ({ initialFeedback }) => {
  const { user } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [allFeedback, setAllFeedback] = useState<FeedbackType[]>(
    initialFeedback || []
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
      status: "pending",
      route: "/"
    };

    setAllFeedback([...allFeedback, newFeedback]);

    inputRef.current.value = "";

    await createFeedback(newFeedback);
  };

  return (
    <Box display="flex" flexDirection="column" width="full">
      <FormControl my={8} onSubmit={handleFormSubmit} as="form">
        <FormLabel>Comment</FormLabel>
        <Input colorScheme="purple" type="text" bg="white" ref={inputRef} />
        <Button
          my={4}
          type="submit"
          colorScheme="purple"
          isDisabled={router.isFallback}
        >
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
