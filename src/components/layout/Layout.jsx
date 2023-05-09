import Navigation from "./navigation/Navigation";
import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
  return (
    <Flex bg={"black"} w={"full"} h={"full"} gap={6}>
      <Navigation />
      <Box w={"full"} my={3} mr={3}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
