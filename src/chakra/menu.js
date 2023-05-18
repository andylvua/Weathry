import { defineStyleConfig } from "@chakra-ui/react";
import {bg_transparent} from "../components/ui/Global/globals"

export const Menu = defineStyleConfig({
  baseStyle: {
    menu: {
      borderColor: "black"
    },
    item: {
      bg: "transparent",
      _focus: {
        bg: bg_transparent
      }
    },
    list: {
      bg: bg_transparent,
      backdropFilter: "blur(20px)"
    }
  }
});
