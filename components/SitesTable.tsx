import React from "react";
import { Box, Link } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "./Table";
import { SiteData } from "@lib/@types/firestore";
import { format, parseISO } from "date-fns";

interface SitesTableProps {
  sites: SiteData[];
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
          .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
          .map((site: SiteData) => (
            <Box as="tr" key={site.id}>
              <Td fontWeight="medium">{site.name}</Td>
              <Td>{site.url}</Td>
              <Td>
                <Link color="purple.500" fontWeight="medium">
                  View Feedback
                </Link>
              </Td>
              <Td>{parseDate(site.createdAt)}</Td>
            </Box>
          ))}
      </tbody>
    </Table>
  );
};

export default SitesTable;
