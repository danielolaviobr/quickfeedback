import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { mutate } from "swr";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";

import { SiteInputData } from "@lib/@types/firestore";
import { createSite } from "@lib/firestore";
import useAuth from "@lib/auth";

const AddSitesModal: React.FC = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit } = useForm<SiteInputData>();
  const toast = useToast();

  const handleCreateSite = async ({ name, url }: SiteInputData) => {
    const newSite = {
      name,
      url,
      authorId: user.uid,
      createdAt: new Date().toISOString()
    };
    const { id } = await createSite(newSite);
    onClose();
    toast({
      title: "Your site has been added 🎊",
      status: "success",
      duration: 3000,
      position: "top"
    });
    mutate(
      ["/api/sites", user.token],
      async ({ sites }) => ({
        sites: [...sites, { ...newSite, id }]
      }),
      false
    );
  };

  return (
    <>
      <Button onClick={onOpen} variant="black">
        {children}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(handleCreateSite)}>
          <ModalHeader fontWeight="bold" size="md">
            Add site
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                colorScheme="purple"
                ref={(e) => {
                  register(e, { required: true });
                  initialRef.current = e;
                }}
                placeholder="My site"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                name="url"
                ref={register({ required: true })}
                colorScheme="purple"
                placeholder="https://website.com"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Stack isInline>
              <Button onClick={onClose} fontWeight="medium">
                Cancel
              </Button>
              <Button
                type="submit"
                colorScheme="purple"
                mr={3}
                fontWeight="medium"
              >
                Create
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSitesModal;
