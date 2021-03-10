import React from "react";
import { AuthProvider } from "@lib/auth";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { DefaultSeo } from "next-seo";

import theme from "@styles/theme";
import SEO from "next-seo.config";

import "@styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
