import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import Menu from "./Menu";
import { Divider, Text } from "@chakra-ui/react";
import { Center, Flex, Image } from "@chakra-ui/react";
import logo from "../../../assets/logo.png";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <GradientBlock
      withoutPaddings={true}
      my={3}
      ml={{ sm: 3, usm: 1 }}
      position={"sticky"}
      top={3}
      alignSelf={"flex-start"}
      height={"97vh"}
    >
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        flexBasis={{ sm: 10, usm: 8 }}
        py={6}
        gap={4}
      >
        <Center w={"full"} pb={2} gap={2}>
          <NavLink to={"/"}>
            <Flex
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
              gap={1}
            >
              <Image w={6} h={6} src={logo} to={"/"} />
              <Text color={"white"} fontWeight={"medium"} fontSize={{ sm: 12, usm: 9 }}>
                Weathry
              </Text>
            </Flex>
          </NavLink>
        </Center>
        <Divider orientation={"horizontal"} width={"100%"} />
        <Menu />
      </Flex>
    </GradientBlock>
  );
};

export default Navigation;
