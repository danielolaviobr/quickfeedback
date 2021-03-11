import React from "react";
import useAuth from "@lib/auth";
import SiteTableSkeleton from "@components/SiteTableSkelleton";
import DashboardShell from "@components/DashboardShell";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import FeedbackTable from "@components/FeedbackTable";
import { Feedback as FeedbackType, Site } from "@lib/@types/firestore";
import FeedbackTableHeader from "@components/FeedbackTableHeader";
import { useToast } from "@chakra-ui/toast";
import Page from "@components/Page";
import { useRouter } from "next/router";
import EmptyFeedback from "@components/EmptyFeedback";

const SiteFeedback = () => {
  const router = useRouter();
  const [siteId] = (router.query?.site as string[]) || [];
  const { user } = useAuth();
  const toast = useToast();
  const { data, error } = useSWR<{ feedback: FeedbackType[]; site: Site }>(
    user ? [`/api/feedback/${siteId}`, user.token] : null,
    fetcher
  );

  if (error) {
    toast({
      status: "error",
      duration: 5000,
      title: "Unexpected error",
      description:
        "An unexpected error ocurred, please try relaoding the page.",
      position: "top",
      isClosable: true
    });
  }

  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.feedback.length === 0) {
    return (
      <>
        <DashboardShell>
          <EmptyFeedback />
        </DashboardShell>
      </>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader name={data.site.name} />
      <FeedbackTable feedback={data.feedback} />
    </DashboardShell>
  );
};

const SiteFeedbackPage = () => (
  <Page name="Name of the site" path="/feedback">
    <SiteFeedback />
  </Page>
);

export default SiteFeedbackPage;
