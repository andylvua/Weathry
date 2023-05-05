import Navigation from "./navigation/Navigation";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";

const Layout = ({ children }) => {
  const bg = useColorModeValue("white", "black");
  return (
    <Flex bg={bg} w={"full"} h={"full"} gap={3}>
      <Navigation />
      <Box my={3} mr={3}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
