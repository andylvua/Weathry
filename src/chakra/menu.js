import { defineStyleConfig } from "@chakra-ui/react";

export const Menu = defineStyleConfig({
  baseStyle: {
    menu: {
      borderColor: "black"
    },
    item: {
      bg: "transparent",
      _focus: {
        bg: "rgba(255,255,255,0.07)"
      }
    },
    list: {
      bg: "rgba(255,255,255,0.07)",
      backdropFilter: "blur(20px)"
    }
  }
});
