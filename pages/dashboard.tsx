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
import { useToast } from "@chakra-ui/toast";

const Dashboard = () => {
  const { user } = useAuth();
  const toast = useToast();
  const { data, error } = useSWR<{ sites: Site[] }>(
    user ? ["/api/sites", user.token] : null,
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
