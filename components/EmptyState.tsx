import React from "react";
import { Heading, Box, Text, Button } from "@chakra-ui/react";
import AddSitesModal from "./AddSitesModal";

const EmptyState = () => (
  <Box
    backgroundColor="white"
    borderRadius="8px"
    p={16}
    height="100%"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
  >
    <Heading size="lg" mb={2}>
      You haven't added any sites.
    </Heading>
    <Text mb={4}>Welcome 👋🏼 Let's get started</Text>
    <AddSitesModal>Add your first site</AddSitesModal>
  </Box>
);

export default EmptyState;
