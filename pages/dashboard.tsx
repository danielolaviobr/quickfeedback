import React from "react";
import EmptyState from "@components/EmptyState";
import useAuth from "@lib/auth";
import SiteTableSkeleton from "@components/SiteTableSkelleton";
import DashboardShell from "@components/DashboardShell";
import useSWR from "swr";
import fetcher from "utils/fetcher";
import SitesTable from "@components/SitesTable";
import { Site } from "@lib/@types/firestore";
import SiteTableHeader from "@components/SiteTableHeader";

const Dashboard = () => {
  const { user } = useAuth();
  const { data, error } = useSWR<{ sites: Site[] }>(
    user ? ["/api/sites", user.token] : null,
    fetcher
  );
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites ? <SitesTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
