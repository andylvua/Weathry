import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import Menu from "./Menu";
import { Divider, Text } from "@chakra-ui/react";
import { Center, Flex, Image } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";

const Navigation = () => {
  return (
    <GradientBlock withoutPaddings={true} my={3} ml={{ sm: 3, usm: 1 }}>
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        flexBasis={{ sm: 10, usm: 8 }}
        py={6}
        gap={4}
      >
        <Center w={"full"} pb={2} gap={2}>
          <Flex
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            gap={1}
          >
            <Image w={6} h={6} src={logo} />
            <Text fontSize={12} color={"white"} fontWeight={"medium"}>
              Weathry
            </Text>
          </Flex>
        </Center>
        <Divider orientation={"horizontal"} width={"100%"} />
        <Menu />
      </Flex>
    </GradientBlock>
  );
};

export default Navigation;
