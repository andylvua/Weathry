import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import Menu from "./Menu";
import { Flex } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <GradientBlock withoutPaddings={true} my={3} ml={3}>
      <Flex flexDirection={"column"} alignItems={"center"} flexBasis={10} py={6}>
        <Menu />
      </Flex>
    </GradientBlock>
  );
};

export default Navigation;
