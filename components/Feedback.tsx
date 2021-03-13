import React from "react";
import { Box, Heading, Text, Divider, Icon } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import useAuth from "@lib/auth";
import { GitHub, Google } from "@styles/theme";
import { settings } from "node:cluster";
import { Settings } from "@lib/@types/firestore";

interface FeedbackProps {
  author?: string;
  text?: string;
  createdAt: string;
  settings?: Settings;
}

const defaultSettings = {
  icons: true,
  timestamp: true,
  ratings: true
};

const Feedback = ({
  author,
  text,
  createdAt,
  settings = defaultSettings
}: FeedbackProps) => {
  const { user } = useAuth();
  console.log(settings);
  return (
    <Box borderRadius={4} maxWidth="700px" w="full">
      <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
        {author}
        {settings?.icons &&
          (user?.provider === "google.com" ? (
            <Google mx={2} />
          ) : user?.provider === "github.com" ? (
            <GitHub mx={2} />
          ) : null)}
      </Heading>
      {settings?.timestamp && (
        <Text color="gray.500" mb={4} fontSize="xs">
          {format(parseISO(createdAt), "PPpp")}
        </Text>
      )}
      <Text color="gray.800">{text}</Text>
      <Divider
        borderColor="gray.200"
        backgroundColor="gray.200"
        mt={8}
        mb={8}
      />
    </Box>
  );
};

export default Feedback;
