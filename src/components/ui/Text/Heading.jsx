import { useColorModeValue } from "@chakra-ui/react";
import { Heading as ChakraHeading } from "@chakra-ui/react";

export const Heading = ({ anotherColor, children, ...rest }) => {
  const color = useColorModeValue("black", "#989a9b");
  return (
    <ChakraHeading color={anotherColor ? anotherColor : color} {...rest}>
      {children}
    </ChakraHeading>
  );
};
