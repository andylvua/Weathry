import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    text: {
      100: "#989a9b"
    }
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    body: `'SF Pro Display', sans-serif`
  },
  components: {}
});
