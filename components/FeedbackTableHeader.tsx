import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading
} from "@chakra-ui/react";
import NextLink from "next/link";

interface FeedbackTableHeaderProps {
  name?: string;
}

const FeedbackTableHeader = ({ name = "" }) => {
  return (
    <Flex align="center" justify="space-between">
      <Flex direction="column">
        <Breadcrumb spacing={4} color="gray.700" fontSize="lg">
          <BreadcrumbItem isCurrentPage={!name}>
            <NextLink href="/feedback" as={`/feedback`} passHref>
              <BreadcrumbLink>Feedback</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
          {!!name && (
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>{name}</BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </Breadcrumb>
        <Heading mb={4}>{name || "My Feedback"}</Heading>
      </Flex>
    </Flex>
  );
};

export default FeedbackTableHeader;
