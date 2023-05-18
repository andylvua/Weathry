import { defineStyleConfig } from "@chakra-ui/react";
import { bg_transparent } from "../components/ui/Global/globals"

export const Modal = defineStyleConfig({
  baseStyle: {
    dialog: {
      bg: bg_transparent,
      backdropFilter: "blur(50px)",
      color: "#ffffff",
      borderRadius: 13,
      boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.5)"
    }
  }
});
