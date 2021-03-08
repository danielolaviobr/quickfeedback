import React from "react";
import { Heading, Box, Text, Button } from "@chakra-ui/react";
import DashboardShell from "./DashboardShell";

const FreePlanEmptyState = () => {
  return (
    <DashboardShell>
      <Box
        backgroundColor="white"
        borderRadius="8px"
        p={8}
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Heading size="lg">Get your feedback instantly</Heading>
        <Text>Start today, and grow with us 🌱</Text>
        <Button variant="solid" size="md" backgroundColor="blackAlpha.300">
          Upgrade to Starter
        </Button>
      </Box>
    </DashboardShell>
  );
};

export default FreePlanEmptyState;
