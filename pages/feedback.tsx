import React from "react";
import EmptyState from "@components/EmptyState";
import useAuth from "@lib/auth";
import SiteTableSkeleton from "@components/SiteTableSkelleton";
import DashboardShell from "@components/DashboardShell";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import FeedbackTable from "@components/FeedbackTable";
import { Feedback } from "@lib/@types/firestore";
import FeedbackTableHeader from "@components/FeedbackTableHeader";

const Dashboard = () => {
  const { user } = useAuth();
  const { data, error } = useSWR<{ feedback: Feedback[] }>(
    user ? ["/api/feedback", user.token] : null,
    fetcher
  );
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
      <FeedbackTableHeader />
      {data.feedback ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
};

export default Dashboard;
