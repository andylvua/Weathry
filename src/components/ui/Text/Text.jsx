import { useColorModeValue } from "@chakra-ui/react";
import { Text as ChakraText } from "@chakra-ui/react";

export const Text = ({ anotherColor, children, ...rest }) => {
  const defaultColor = useColorModeValue("black", "text.100");
  return (
    <ChakraText color={anotherColor ? anotherColor : defaultColor} {...rest}>
      {children}
    </ChakraText>
  );
};
