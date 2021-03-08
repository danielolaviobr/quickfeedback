import { AuthProvider } from "@lib/auth";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "@styles/theme";
import "@styles/globals.css";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
