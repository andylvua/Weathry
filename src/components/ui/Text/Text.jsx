import { useColorModeValue } from "@chakra-ui/react";
import { Text as ChakraText } from "@chakra-ui/react";

export const Text = ({ anotherColor, children, ...rest }) => {
  const defaultColor = useColorModeValue("black", "#989a9b");
  return (
    <ChakraText color={anotherColor ? anotherColor : defaultColor} {...rest}>
      {children}
    </ChakraText>
  );
};
