import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import EditSiteModal from "./EditSiteModal";

interface SiteHeaderProps {
  isSiteOwner: boolean;
  site: any;
  siteId: string;
  route: string;
}

const SiteHeader = ({ isSiteOwner, site, siteId, route }: SiteHeaderProps) => {
  const siteName = site?.name;

  return (
    <Box maxW="700px">
      <Breadcrumb>
        <BreadcrumbItem>
          <NextLink href="/sites" passHref>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NextLink href={`/site/${siteId}`} passHref>
            <BreadcrumbLink>{siteName || "-"}</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
        {siteName && route && (
          <BreadcrumbItem>
            <NextLink href={`/site/${siteId}/${route}`} passHref>
              <BreadcrumbLink>{route}</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        )}
      </Breadcrumb>
      <Flex justifyContent="space-between">
        <Heading mb={8}>{siteName || "-"}</Heading>
        {isSiteOwner && (
          <EditSiteModal settings={site?.settings} siteId={siteId}>
            Edit Site
          </EditSiteModal>
        )}
      </Flex>
    </Box>
  );
};

export default SiteHeader;
