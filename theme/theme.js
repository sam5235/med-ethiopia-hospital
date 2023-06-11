// theme.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#dff3ff",
      100: "#b5d7fc",
      200: "#89bcf5",
      300: "#5ca1ee",
      400: "#3086e8",
      500: "#176dcf",
      600: "#0d55a2",
      700: "#053c75",
      800: "#002449",
      900: "#000d1e",
    },
  },
  initialColorMode: "light",
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "#f5f5f5",
      },
    }),
  },
});
export default theme;
