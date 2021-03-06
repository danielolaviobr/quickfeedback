import { extendTheme } from "@chakra-ui/react";
import { createIcon } from "@chakra-ui/icons";

const theme = extendTheme({
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  colors: {
    brand: {
      100: "#f7fafc",
      // ...
      900: "#1a202c"
    }
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  styles: {
    global: {
      html: { minWidth: "360px", scrollBehavior: "smooth" },
      "#__next": {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }
    }
  },
  components: {
    Input: {
      variants: {
        outline: ({ colorScheme: c }) => ({
          field: {
            _focus: {
              borderColor: `${c}.500`
            }
          }
        })
      }
    }
  }
});

export default theme;

export const Logo = createIcon({
  displayName: "Logo",
  viewBox: "0 0 512 512",
  d:
    "M496 0H376.384L198.688 311.264 313.184 512H432.8L318.304 311.264zM149.216 96H36.448l65.248 114.912L16 352h112.768l85.696-141.088z"
});
