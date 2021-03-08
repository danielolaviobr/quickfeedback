import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from "@chakra-ui/react";

import AddSitesModal from "./AddSitesModal";

const FeedbackTableHeader = () => {
  return (
    <Flex align="center" justify="space-between">
      <Flex direction="column">
        <Breadcrumb spacing={4}>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray.700" fontSize="lg">
              Feedback
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Heading mb={4}>My Feedback</Heading>
      </Flex>
    </Flex>
  );
};

export default FeedbackTableHeader;
