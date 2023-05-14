import { defineStyleConfig } from "@chakra-ui/react";

export const Switch = defineStyleConfig({
  baseStyle: {
    thumb: {
      bg: "gray.100"
    },
    track: {
      bg: "gray.500",
      _checked: {
        bg: "green.500"
      }
    }
  }
});
