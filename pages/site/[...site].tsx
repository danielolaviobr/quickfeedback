import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea
} from "@chakra-ui/react";

import Feedback from "@components/Feedback";
import useAuth from "@lib/auth";
import { getAllFeedback, getAllSites, getSite } from "@lib/firestore-admin";
import { Feedback as FeedbackType, Site } from "@lib/@types/firestore";
import { createFeedback } from "@lib/firestore";
import { compareDesc, parseISO } from "date-fns";
import DashboardShell from "@components/DashboardShell";
import SiteHeader from "@components/SiteHeader";

export const getStaticProps: GetStaticProps = async (context) => {
  const [siteId, route] = (context.params.site as string[]) || [];
  const feedback = await getAllFeedback(siteId);
  const site = await getSite(siteId);
  let newRoute = route;
  if (!route) {
    newRoute = null;
  }

  return {
    props: {
      initialFeedback: feedback,
      route: newRoute,
      siteId,
      site
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id],
      route: "/"
    }
  }));
  return {
    paths,
    fallback: true
  };
};

interface SiteFeedbackProps {
  initialFeedback: FeedbackType[];
  route?: string;
  siteId?: string;
  site: Site;
}

const SiteFeedback: React.FC<SiteFeedbackProps> = ({
  initialFeedback,
  route,
  siteId,
  site
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [allFeedback, setAllFeedback] = useState<FeedbackType[]>(
    initialFeedback || []
  );

  const defaultSettings = {
    icons: true,
    timestamp: true,
    ratings: true
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const newFeedback: FeedbackType = {
      author: user.name,
      authorId: user.uid,
      siteId,
      route: route || "/",
      text: inputValue,
      createdAt: new Date().toISOString(),
      provider: user.provider,
      status: "pending"
    };

    setAllFeedback([...allFeedback, newFeedback]);

    setInputValue("");
    console.log("before error");

    await createFeedback(newFeedback);
    console.log("after error");
  };

  return (
    <DashboardShell>
      <Box
        display="flex"
        flexDirection="column"
        width="full"
        maxWidth="700px"
        margin="0 auto"
      >
        <SiteHeader
          siteId={siteId}
          isSiteOwner={site?.authorId === user?.uid}
          route={route}
          site={site}
        />
        <FormControl my={8} onSubmit={handleFormSubmit} as="form">
          <FormLabel>Comment</FormLabel>
          <Textarea
            colorScheme="purple"
            type="text"
            bg="white"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
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
            <Feedback
              key={feedback.id || feedback.createdAt}
              settings={site.settings || defaultSettings}
              {...feedback}
            />
          ))}
      </Box>
    </DashboardShell>
  );
};

export default SiteFeedback;
