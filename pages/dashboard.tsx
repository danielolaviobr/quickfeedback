import React from "react";
import EmptyState from "@components/EmptyState";
import useAuth from "@lib/auth";
import { Button } from "@chakra-ui/react";
import SiteTableSkeleton from "@components/SiteTableSkelleton";
import DashboardShell from "@components/DashboardShell";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import SitesTable from "@components/SitesTable";
import { Site } from "@lib/@types/firestore";

const Dashboard = () => {
  const { user, signInWithGithub } = useAuth();
  const { data, error } = useSWR<{ sites: Site[] }>("/api/sites", fetcher);
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites ? <SitesTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
