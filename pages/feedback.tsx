import React from "react";
import EmptyState from "@components/EmptyState";
import useAuth from "@lib/auth";
import SiteTableSkeleton from "@components/SiteTableSkelleton";
import DashboardShell from "@components/DashboardShell";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import FeedbackTable from "@components/FeedbackTable";
import { Feedback as FeedbackType } from "@lib/@types/firestore";
import FeedbackTableHeader from "@components/FeedbackTableHeader";
import { useToast } from "@chakra-ui/toast";
import Page from "@components/Page";

const Feedback = () => {
  const { user } = useAuth();
  const toast = useToast();
  const { data, error } = useSWR<{ feedback: FeedbackType[] }>(
    user ? ["/api/feedback", user.token] : null,
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

  return (
    <DashboardShell>
      {data.feedback ? (
        <>
          <FeedbackTableHeader />
          <FeedbackTable feedback={data.feedback} />
        </>
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
};

const FeedbackPage = () => (
  <Page name="Feedback" path="/feedback">
    <Feedback />
  </Page>
);

export default FeedbackPage;
