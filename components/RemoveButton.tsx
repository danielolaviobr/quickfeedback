import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from "@chakra-ui/react";
import { Feedback } from "@lib/@types/firestore";
import useAuth from "@lib/auth";
import { deleteFeedback } from "@lib/firestore";
import React, { useState, useRef } from "react";
import { mutate } from "swr";

interface RemoveButtonProps {
  id: string;
}

const RemoveButton = ({ id }: RemoveButtonProps) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const handleDelete = async () => {
    await deleteFeedback(id);
    mutate(
      ["/api/feedback", user.token],
      async ({ feedback }: { feedback: Feedback[] }) => ({
        feedback: feedback.filter((fb) => fb.id !== id)
      }),
      false
    );
    onClose();
  };

  return (
    <>
      <Button
        variant="ghost"
        colorScheme="purple"
        onClick={() => setIsOpen(true)}
      >
        Remove
      </Button>

      <AlertDialog
        isCentered
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete feedback
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default RemoveButton;
