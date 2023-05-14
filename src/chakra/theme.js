import { defineStyleConfig, extendTheme } from "@chakra-ui/react";

const Menu = defineStyleConfig({
  baseStyle: {
    menu: {
      borderColor: "black"
    },
    item: {
      bg: "#000000",
      _focus: {
        bg: "#101010",
      }
    },
    list: {
      bg: "#000000",
    }
  }
});

const Modal = defineStyleConfig({
  baseStyle: {
    dialog: {
      bg: "rgba(255,255,255,0.07)",
      backdropFilter: "blur(50px)",
      color: "#ffffff",
      borderRadius: 13,
      boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.5)",
    },
  }
});

const Switch = defineStyleConfig({
  baseStyle: {
    thumb: {
      bg: 'gray.100',
    },
    track: {
      bg: 'gray.500',
      _checked: {
        bg: 'green.500',
      },
    }
  }
});

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
