import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from "@chakra-ui/react";

import AddSitesModal from "./AddSitesModal";

const SiteTableHeader = ({ isPaidAccount }: { isPaidAccount: boolean }) => {
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
      {isPaidAccount && <AddSitesModal>+ Add site</AddSitesModal>}
    </Flex>
  );
};

export default SiteTableHeader;
