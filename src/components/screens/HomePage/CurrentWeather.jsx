import { Divider, Flex, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { MdCalendarMonth, MdGrain, MdLocationPin, MdSearch } from "react-icons/md";
import { setIsOpen } from "../../../store/search-modal/SearchModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { weatherCodes } from "../../../utils/weatherCodes";
import { getCurrentDate, getCurrentTime } from "../../../utils/time";
import React from "react";

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const { latitude, longitude, cityName, countryName, countryCode, timezone } = useSelector(
    (state) => state.location
  );
  const { temperatureUnit, windSpeedUnit } = useSelector((state) => state.units);
  const onOpen = () => dispatch(setIsOpen(true));
  const { data } = useQuery(
    ["current weather", latitude, longitude, temperatureUnit],
    () => weatherApi.currentWeather(latitude, longitude, { temperatureUnit }),
    {
      select({ data }) {
        return data.current_weather;
      }
    }
  );
  const { data: dailyForecast } = useQuery(
    ["daily weather", latitude, longitude],
    () =>
      weatherApi.dailyWeather(latitude, longitude, timezone, { temperatureUnit, windSpeedUnit }),
    {
      select({ data }) {
        return data;
      }
    }
  );

  if (!data || !dailyForecast) {
    return null;
  }
  return (
    <GradientBlock withoutPaddings={true} py={7} pr={7}>
      <Flex flexDirection={"column"} position={"relative"}>
        <IconButton
          position={"absolute"}
          top={{ sm: 0, usm: -4 }}
          right={{ sm: 0, usm: -4 }}
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
          mt={{ sm: -7, usm: -10 }}
          w={{ sm: 32, usm: 24 }}
          h={{ sm: 32, usm: 24 }}
          src={weatherCodes[data.weathercode].imgSrc}
        />
        <Flex mt={-4} pl={{ sm: 7, usm: 4 }} flexDirection={"column"}>
          <Text fontSize={{ sm: "5xl", usm: "3xl" }} color={"white"}>
            {data.temperature}
            {temperatureUnit === "celsius" ? "°С" : "°F"}
          </Text>
          <Flex ml={-2} alignItems={"center"} gap={1}>
            <Image display={"block"} w={10} h={10} src={weatherCodes[data.weathercode].imgSrc} />
            <Text color={"white"}>{weatherCodes[data.weathercode].title}</Text>
            |
            <Icon w={5} h={5} as={MdGrain} />{" "}
            <Text color={"white"}>{dailyForecast.daily["precipitation_probability_max"][0]}</Text>%
          </Flex>
          <Divider mt={2} />
          <Flex mt={4} alignItems={"center"} gap={2}>
            <Icon color={"white"} w={6} h={6} as={MdLocationPin} />
            <Flex gap={3} alignItems={"center"}>
              <Text fontSize={"sm"} color={"white"}>
                {cityName}, {countryName}
              </Text>
              <Image w={5} h={5} src={`https://flagsapi.com/${countryCode}/flat/32.png`} />
            </Flex>
          </Flex>
          <Flex mt={4} alignItems={"center"} gap={2}>
            <Icon color={"white"} w={6} h={6} as={MdCalendarMonth} />
            <Text fontSize={"sm"} color={"white"}>
              {getCurrentDate()} | {getCurrentTime(timezone)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </GradientBlock>
  );
};

export default CurrentWeather;
