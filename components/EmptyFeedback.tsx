import React from "react";
import { Heading, Box, Text } from "@chakra-ui/react";
import AddSitesModal from "./AddSitesModal";

const EmptyFeedback = () => (
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
     There isn't any feedback 😭
    </Heading>
    <Text mb={4}>Spread the love!</Text>
  </Box>
);

export default EmptyFeedback;
