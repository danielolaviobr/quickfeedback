import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from "@chakra-ui/react";

import AddSitesModal from "./AddSitesModal";

const SiteTableHeader = () => {
  return (
    <Flex align="center" justify="space-between">
      <Flex direction="column">
        <Breadcrumb spacing={4}>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray.700" fontSize="lg">
              Sites
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading mb={4}>My Sites</Heading>
      </Flex>
      <AddSitesModal>+ Add site</AddSitesModal>
    </Flex>
  );
};

export default SiteTableHeader;
