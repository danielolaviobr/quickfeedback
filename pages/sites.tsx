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
import UpgradeEmptyState from "@components/UpgradeEmptyState";
import Page from "@components/Page";

const Sites = () => {
  const { user } = useAuth();
  const toast = useToast();
  const { data, error } = useSWR<{ sites: Site[] }>(
    user ? ["/api/sites", user.token] : null,
    fetcher
  );
  const isPaidAccount = !!user?.stripeRole;

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

  // console.log(isPaidAccount);
  if (!data) {
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={isPaidAccount} />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  if (data.sites.length !== 0) {
    return (
      <DashboardShell>
        <SiteTableHeader isPaidAccount={isPaidAccount} />
        <SitesTable sites={data.sites} />
      </DashboardShell>
    );
  }

  console.log(isPaidAccount);
  return (
    <DashboardShell>
      <SiteTableHeader isPaidAccount={isPaidAccount} />
      {isPaidAccount ? <EmptyState /> : <UpgradeEmptyState />}
    </DashboardShell>
  );
};

const SitesPage = () => (
  <Page name="Sites" path="/sites">
    <Sites />
  </Page>
);

export default SitesPage;
