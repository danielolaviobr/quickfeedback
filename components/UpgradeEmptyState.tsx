import React, { useCallback, useEffect, useState } from "react";
import { Heading, Box, Text, Button } from "@chakra-ui/react";
import { getAllProducts, getCheckoutSession } from "@lib/firestore";
import useAuth from "@lib/auth";

const UpgradeEmptyState = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [staterId, setStarterId] = useState("");
  const { user } = useAuth();

  const getStaterId = useCallback(async () => {
    const products = await getAllProducts();
    setStarterId(products.find((product) => product.name === "Starter").id);
  }, []);

  useEffect(() => {
    getStaterId();
  }, [getStaterId]);

  return (
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
        Get feedback on your site instantly.
      </Heading>
      <Text mb={4}>Start today, then grow with us 🌱</Text>
      <Button
        variant="black"
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          getCheckoutSession(user.uid, staterId);
        }}
      >
        Upgrade to Starter
      </Button>
    </Box>
  );
};

export default UpgradeEmptyState;
