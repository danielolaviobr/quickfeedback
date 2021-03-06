import { extendTheme } from "@chakra-ui/react";
import { createIcon } from "@chakra-ui/icons";

const theme = extendTheme({
  fonts: {
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  colors: {
    brand: {
      100: "#f7fafc",
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
      "html, body": {
        minWidth: "360px",
        scrollBehavior: "smooth",
        backgroundColor: "#EDF2F7"
      },
      "#__next": {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }
    }
  },
  components: {
    Button: {
      variants: {
        black: {
          backgroundColor: "gray.900",
          color: "white",
          fontWeight: "medium",
          _hover: {
            bg: "gray.700",
            _disabled: {
              bg: "gray.500"
            }
          },
          _active: {
            bg: "gray.800",
            transform: "scale(0.95)"
          }
        },
        white: {
          backgroundColor: "white",
          color: "black",
          fontWeight: "medium",
          _hover: {
            bg: "gray.50"
          },
          _active: {
            bg: "gray.200",
            transform: "scale(0.95)"
          }
        }
      }
    },

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

export const GitHub = createIcon({
  displayName: "GitHub",
  path: (
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
    />
  )
});

export const Google = createIcon({
  displayName: "Google",
  path: (
    <g>
      <path
        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
        fill="#4285f4"
      />
      <path
        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
        fill="#34a853"
      />
      <path
        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
        fill="#fbbc04"
      />
      <path
        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
        fill="#ea4335"
      />
    </g>
  ),
  viewBox: "0 0 533.5 544.3"
});
