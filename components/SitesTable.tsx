import React from "react";
import { Box, Link } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "./Table";
import { Site } from "@lib/@types/firestore";
import { compareAsc, format, parseISO } from "date-fns";
import NextLink from "next/link";

interface SitesTableProps {
  sites: Site[];
}

const SitesTable: React.FC<SitesTableProps> = ({ sites }) => {
  const parseDate = (date: string) => {
    return format(parseISO(date), "PPpp");
  };
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {sites
          .sort((a, b) =>
            compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
          )
          .map((site: Site) => (
            <Box as="tr" key={site.id}>
              <Td fontWeight="medium">{site.name}</Td>
              <Td>{site.url}</Td>
              <Td>
                <NextLink href="p/[siteId]" as={`p/${site.id}`} passHref>
                  <Link color="purple.500" fontWeight="medium" as="a">
                    View Feedback
                  </Link>
                </NextLink>
              </Td>
              <Td>{parseDate(site.createdAt)}</Td>
            </Box>
          ))}
      </tbody>
    </Table>
  );
};

export default SitesTable;
