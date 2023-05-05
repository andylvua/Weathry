import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import Menu from "./Menu";
import { Center, Flex, Image } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";

const Navigation = () => {
  return (
    <GradientBlock withoutPaddings={true} my={3} ml={3}>
      <Flex flexDirection={"column"} alignItems={"center"} flexBasis={10} py={6} gap={4}>
        <Center w={"full"} pb={5} borderBottomWidth={1} borderBottomColor={"text.100"}>
          <Image w={6} h={6} src={logo} />
        </Center>
        <Menu />
      </Flex>
    </GradientBlock>
  );
};

export default Navigation;
