import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {},
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    body: `'Open Sans', sans-serif`
  },
  styles: {
    global: () => ({})
  },
  components: {}
});
