import React, { useState } from "react";
import { Box, Button, Code, Link, Switch } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "./Table";
import { Feedback } from "@lib/@types/firestore";
import { compareAsc, parseISO } from "date-fns";
import AlertDialogExample from "./RemoveButton";
import { updateFeedback } from "@lib/firestore";
import { mutate } from "swr";
import useAuth from "@lib/auth";

interface FeedbackTableProps {
  feedback: Feedback[];
}

interface Toggle {
  value: boolean;
  id: string;
}

const FeedbackTable: React.FC<FeedbackTableProps> = ({
  feedback: allFeedback
}) => {
  const { user } = useAuth();
  const [togglesState, setTogglesState] = useState<Toggle[]>([
    ...allFeedback.map((feedback: Feedback) => ({
      value: feedback.status === "active",
      id: feedback.id
    }))
  ]);

  const handleToggle = async (feedbackId: string) => {
    const toggleToChange = togglesState.find(
      (toggle) => toggle.id === feedbackId
    );

    toggleToChange.value = !toggleToChange.value;

    setTogglesState([
      ...togglesState.filter((toggle) => toggle.id !== feedbackId),
      toggleToChange
    ]);

    await updateFeedback(feedbackId, {
      status: toggleToChange.value ? "active" : "pending"
    });

    mutate(
      ["/api/feedback", user.token],
      async ({ feedback }: { feedback: Feedback[] }) => {
        const feedbackToUpdate = feedback.find((fb) => fb.id === feedbackId);
        feedbackToUpdate.status = toggleToChange.value ? "active" : "pending";

        return {
          feedback: [
            ...feedback.filter((fb) => fb.id !== feedbackId),
            feedbackToUpdate
          ]
        };
      },
      false
    );
  };

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
              <Td fontWeight="medium">{feedback.author}</Td>
              <Td>{feedback.text}</Td>
              <Td>
                <Code>{"/"}</Code>
              </Td>
              <Td>
                <Switch
                  onChange={() => handleToggle(feedback.id)}
                  isChecked={
                    togglesState.find((toggle) => toggle.id === feedback.id)
                      .value
                  }
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
