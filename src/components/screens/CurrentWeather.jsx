import { Divider, Flex, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import GradientBlock from "../ui/GradientBlock/GradientBlock";
import { MdCalendarMonth, MdLocationPin, MdSearch } from "react-icons/md";
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
          w={32}
          h={32}
          src={"https://openweathermap.org/img/wn/10d@4x.png"}
        />
        <Flex mt={-4} pl={7} flexDirection={"column"}>
          <Text fontSize="5xl" color={"white"}>
            28°С
          </Text>
          <Flex ml={-2} alignItems={"center"} gap={1}>
            <Image
              display={"block"}
              w={10}
              h={10}
              src={"https://openweathermap.org/img/wn/10d@4x.png"}
            />
            <Text color={"white"}>Rainy Storm Clouds</Text>
          </Flex>
          <Divider mt={2} />
          <Flex mt={4} alignItems={"center"} gap={2}>
            <Icon color={"white"} w={6} h={6} as={MdLocationPin} />
            <Text fontSize={"sm"} color={"white"}>
              Florida, US
            </Text>
          </Flex>
          <Flex mt={4} alignItems={"center"} gap={2}>
            <Icon color={"white"} w={6} h={6} as={MdCalendarMonth} />
            <Text fontSize={"sm"} color={"white"}>
              24, July, 2022 5:01 AM
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </GradientBlock>
  );
};

export default CurrentWeather;
