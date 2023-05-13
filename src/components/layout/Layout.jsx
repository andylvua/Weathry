import Navigation from "./navigation/Navigation";
import { Box, Flex, useColorMode } from "@chakra-ui/react";

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  if (colorMode === "light") {
    toggleColorMode();
  }

  return (
    <Flex w={"full"} bg={"black"} minH={"100vh"} gap={{ sm: 6, usm: 2 }}>
      <Navigation />
      <Box w={"full"} my={3} mr={3}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
