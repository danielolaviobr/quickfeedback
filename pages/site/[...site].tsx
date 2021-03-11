import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

import Feedback from "@components/Feedback";
import useAuth from "@lib/auth";
import { getAllFeedback, getAllSites, getSite } from "@lib/firestore-admin";
import { Feedback as FeedbackType, Site } from "@lib/@types/firestore";
import { createFeedback } from "@lib/firestore";
import { compareDesc, parseISO } from "date-fns";
import DashboardShell from "@components/DashboardShell";
import SiteHeader from "@components/SiteHeader";

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context.params, "HEEERE");
  const [siteId, route] = (context.params.site as string[]) || [];
  const feedback = await getAllFeedback(siteId);
  const site = await getSite(siteId);

  return {
    props: {
      initialFeedback: feedback,
      route: route || "/",
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
      site: [site.id]
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
      status: "pending"
    };

    setAllFeedback([...allFeedback, newFeedback]);

    inputRef.current.value = "";

    await createFeedback(newFeedback);
  };

  return (
    <DashboardShell>
      <SiteHeader
        siteId={siteId}
        isSiteOwner={false}
        route={route}
        site={site}
      />
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
    </DashboardShell>
  );
};

export default SiteFeedback;
