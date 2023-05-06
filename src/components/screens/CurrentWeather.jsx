import { Divider, Flex, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import GradientBlock from "../ui/GradientBlock/GradientBlock";
import { MdSearch } from "react-icons/md";
import { setIsOpen } from "../../store/search-modal/SearchModalSlice";
import { useDispatch } from "react-redux";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const onOpen = () => dispatch(setIsOpen(true));

  return (
    <GradientBlock withoutPaddings={true} py={7} pr={7}>
      <Flex flexDirection={"column"} position={"relative"}>
        <IconButton
          position={"absolute"}
          top={0}
          right={0}
          borderRadius={"50%"}
          aria-label={"iconBase"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          bg={"gray.900"}
          w={16}
          h={16}
          onClick={onOpen}
        >
          <Icon color={"white"} w={35} h={35} as={MdSearch} />
        </IconButton>
        <Image
          display={"block"}
          w={36}
          h={36}
          src={"https://openweathermap.org/img/wn/10d@4x.png"}
        />
        <Flex mt={-4} pl={7} flexDirection={"column"}>
          <Text fontSize="5xl" color={"white"}>
            28°C
          </Text>
          <Text color={"white"}>Rainy Storm Clouds</Text>
          <Divider mt={4} />
        </Flex>
      </Flex>
    </GradientBlock>
  );
};

export default CurrentWeather;
