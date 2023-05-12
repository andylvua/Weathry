import Navigation from "./navigation/Navigation";
import { Box, Flex, useColorMode } from "@chakra-ui/react";

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  if (colorMode === "light") {
    toggleColorMode();
  }

  return (
    <Flex bg={"black"} minH={"100vh"} gap={6}>
      <Navigation />
      <Box my={3} mr={3}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
