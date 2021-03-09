import { Box, Button } from "@chakra-ui/react";
import DashboardShell from "@components/DashboardShell";
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
  const { user } = useAuth();

  const getProducts = useCallback(async () => {
    const allProducts = await getAllProducts();
    setProducts(allProducts);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);
  return (
    <DashboardShell>
      <Box>
        {products.map((product) => (
          <Button
            key={product.id}
            px={4}
            py={5}
            size="sm"
            variant="black"
            onClick={async () => await getCheckoutSession(user.uid, product.id)}
            m={4}
          >
            Upgrade to {product.name}
          </Button>
        ))}
        <Button
          px={4}
          py={5}
          size="sm"
          variant="black"
          onClick={async () => await goToBillingPortal()}
          m={4}
        >
          Go to Portal
        </Button>
      </Box>
    </DashboardShell>
  );
};

export default Account;
