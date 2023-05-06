import { Divider, Flex, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import GradientBlock from "../ui/GradientBlock/GradientBlock";
import { MdCalendarMonth, MdLocationPin, MdSearch } from "react-icons/md";
import { setIsOpen } from "../../store/search-modal/SearchModalSlice";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { weatherApi } from "../../api/weatherApi";
import { weatherCodes } from "../../utils/weatherCodes";
import { getCurrentDate, getCurrentTime } from "../../utils/time";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const onOpen = () => dispatch(setIsOpen(true));
  const { data } = useQuery(["current weather"], () => weatherApi.currentWeather(47.49, 14.99), {
    select({ data }) {
      return data.current_weather;
    }
  });
  if (!data) {
    return null;
  }
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
          mt={-7}
          w={32}
          h={32}
          src={weatherCodes[data.weathercode].imgSrc}
        />
        <Flex mt={-4} pl={7} flexDirection={"column"}>
          <Text fontSize="5xl" color={"white"}>
            {data.temperature}°С
          </Text>
          <Flex ml={-2} alignItems={"center"} gap={1}>
            <Image display={"block"} w={10} h={10} src={weatherCodes[data.weathercode].imgSrc} />
            <Text color={"white"}>{weatherCodes[data.weathercode].title}</Text>
          </Flex>
          <Divider mt={2} />
          <Flex mt={4} alignItems={"center"} gap={2}>
            <Icon color={"white"} w={6} h={6} as={MdLocationPin} />
            <Text fontSize={"sm"} color={"white"}>
              Vordernberg, Austria
            </Text>
          </Flex>
          <Flex mt={4} alignItems={"center"} gap={2}>
            <Icon color={"white"} w={6} h={6} as={MdCalendarMonth} />
            <Text fontSize={"sm"} color={"white"}>
              {getCurrentDate(data.time)} | {getCurrentTime(data.time)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </GradientBlock>
  );
};

export default CurrentWeather;
