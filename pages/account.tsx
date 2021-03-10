import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text
} from "@chakra-ui/react";
import DashboardShell from "@components/DashboardShell";
import Page from "@components/Page";
import { Product } from "@lib/@types/firestore";
import useAuth from "@lib/auth";
import {
  getAllProducts,
  getCheckoutSession,
  goToBillingPortal
} from "@lib/firestore";
import React, { useCallback, useEffect, useState } from "react";

const Account = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);
  const { user, signOut } = useAuth();

  const getProducts = useCallback(async () => {
    const allProducts = await getAllProducts();
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <DashboardShell>
      <Flex
        direction="column"
        maxW="600px"
        align={["left", "center"]}
        margin="0 auto"
      >
        <Flex direction="column" align={["left", "center"]} ml={4}>
          <Avatar
            w={["3rem", "6rem"]}
            h={["3rem", "6rem"]}
            mb={4}
            src={user?.photoUrl}
          />
          <Heading letterSpacing="-1px">{user?.name}</Heading>
          <Text>{user?.email}</Text>
        </Flex>
        <SettingsTable>
          <FeedbackUsage />
          <Text my={4}>
            Fast Feedback uses Stripe to update, change, or cancel your
            subscription. You can also update card information and billing
            addresses through the secure portal.
          </Text>
          <Flex justify="flex-end">
            {products.map((product) => {
              if (user?.stripeRole === "premium") {
                return null;
              }

              if (
                user?.stripeRole === "starter" &&
                product.name === "Starter"
              ) {
                return null;
              }

              return (
                <Button
                  isLoading={isLoadingCheckout}
                  key={product.id}
                  px={4}
                  py={5}
                  size="sm"
                  variant="black"
                  onClick={async () => {
                    await getCheckoutSession(user.uid, product.id);
                    setIsLoadingCheckout(true);
                  }}
                  m={4}
                >
                  Upgrade to {product.name}
                </Button>
              );
            })}

            <Button
              onClick={() => {
                setIsLoadingPortal(true);
                goToBillingPortal();
              }}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              m={4}
              isLoading={isLoadingPortal}
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)"
              }}
            >
              Manage Billing
            </Button>
            <Button variant="ghost" m={4} onClick={signOut}>
              Log Out
            </Button>
          </Flex>
        </SettingsTable>
      </Flex>
    </DashboardShell>
  );
};

const FeedbackUsage = () => {
  const { user } = useAuth();
  return (
    <StatGroup>
      <Stat>
        <StatLabel color="gray.700">Feedback</StatLabel>
        <StatNumber fontWeight="medium">∞</StatNumber>
        <StatHelpText>10,000 limit</StatHelpText>
      </Stat>

      <Stat>
        <StatLabel color="gray.700">Sites</StatLabel>
        <StatNumber fontWeight="medium">5</StatNumber>
        <StatHelpText>{user?.stripeRole || "free"}</StatHelpText>
      </Stat>
    </StatGroup>
  );
};

const SettingsTable = ({ children }) => {
  const { user } = useAuth();

  return (
    <Box
      backgroundColor="white"
      mt={8}
      borderRadius={[0, 8, 8]}
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.05)"
    >
      <Flex
        backgroundColor="gray.50"
        borderTopLeftRadius={[0, 8, 8]}
        borderTopRightRadius={[0, 8, 8]}
        borderBottom="1px solid"
        borderBottomColor="gray.200"
        px={6}
        py={4}
      >
        <Flex justify="space-between" align="center" w="full">
          <Text
            textTransform="uppercase"
            fontSize="xs"
            color="gray.500"
            fontWeight="medium"
            mt={1}
          >
            Settings
          </Text>
          <Badge
            h="1rem"
            colorScheme={
              user?.stripeRole === "premium"
                ? "purple.500"
                : user?.stripeRole === "starter"
                ? "green"
                : "blue"
            }
          >
            {user?.stripeRole || "free"}
          </Badge>
        </Flex>
      </Flex>
      <Flex direction="column" p={6}>
        {children}
      </Flex>
    </Box>
  );
};

const AccountPage = () => (
  <Page name="Account" path="/account">
    <Account />
  </Page>
);

export default AccountPage;
