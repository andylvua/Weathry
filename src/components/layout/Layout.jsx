import Navigation from "./navigation/Navigation";
import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex w={"full"} bg={"black"} minH={"100vh"} gap={{ sm: 4, usm: 2 }}>
      <Navigation />
      <Box w={"full"} my={3} mr={3}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
