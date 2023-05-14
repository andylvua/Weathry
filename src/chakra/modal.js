import { defineStyleConfig } from "@chakra-ui/react";

export const Modal = defineStyleConfig({
  baseStyle: {
    dialog: {
      bg: "rgba(255,255,255,0.07)",
      backdropFilter: "blur(50px)",
      color: "#ffffff",
      borderRadius: 13,
      boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.5)"
    }
  }
});
