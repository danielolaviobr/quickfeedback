import React from "react";
import { Box, Button, Code, Link, Switch } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "./Table";
import { Feedback } from "@lib/@types/firestore";
import { compareAsc, parseISO } from "date-fns";
import AlertDialogExample from "./RemoveButton";

interface FeedbackTableProps {
  feedback: Feedback[];
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({
  feedback: allFeedback
}) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th>{""}</Th>
        </Tr>
      </thead>
      <tbody>
        {allFeedback
          .sort((a, b) =>
            compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
          )
          .map((feedback: Feedback) => (
            <Box as="tr" key={feedback.id}>
              <Td fontWeight="medium">{feedback.id}</Td>
              <Td>{feedback.text}</Td>
              <Td>
                <Code>{"/"}</Code>
              </Td>
              <Td>
                <Switch
                  colorScheme="purple"
                  size="md"
                  defaultChecked={feedback.status === "active"}
                />
              </Td>
              <Td>
                <AlertDialogExample id={feedback.id} />
              </Td>
            </Box>
          ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
