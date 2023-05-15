import { extendTheme } from "@chakra-ui/react";
import { Menu } from "./menu";
import { Modal } from "./modal";
import { Switch } from "./switch";

export const theme = extendTheme({
  colors: {
    text: {
      100: "#989a9b"
    }
  },
  breakpoints: {
    usm: "20em", // 320px
    sm: "30em", // 480px
    "md": "48em", // 768px
    "lg": "62em", // 992px
    "xl": "80em", // 1280px
    "2xl": "96em" // 1536px
  },
  useSystemColorMode: false,
  fonts: {
    body: `'SF Pro Display', sans-serif`
  },
  components: {
    Menu,
    Modal,
    Switch
  }
});
