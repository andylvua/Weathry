import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    text: {
      100: "#989a9b"
    }
  },
  breakpoints: {
    "usm": "20em", // 320px
    "sm": "30em", // 480px
    "md": "48em", // 768px
    "lg": "62em", // 992px
    "xl": "80em", // 1280px
    "2xl": "96em" // 1536px
  },
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    body: `'SF Pro Display', sans-serif`
  },
  components: {}
});
