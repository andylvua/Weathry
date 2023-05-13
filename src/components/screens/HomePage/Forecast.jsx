import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { useSelector } from "react-redux";
import {
  getDayNameFromString,
  getDayNumberFromString,
  getMonthNameFromString
} from "../../../utils/time";
import { weatherCodes } from "../../../utils/weatherCodes";
import { MdGrain } from "react-icons/md";

const Forecast = () => {
  const [daysCount, setDaysCount] = useState(5);
  const { latitude, longitude, timezone } = useSelector((state) => state.location);
  const { temperatureUnit, windSpeedUnit } = useSelector((state) => state.units);
  const { data: days } = useQuery(
    ["daily weather", latitude, longitude],
    () =>
      weatherApi.dailyWeather(latitude, longitude, timezone, { temperatureUnit, windSpeedUnit }),
    {
      select({ data }) {
        const days = [];
        for (let index = 0; index < 8; index++) {
          days.push({
            temperatureMax: data.daily["temperature_2m_max"][index],
            temperatureMin: data.daily["temperature_2m_min"][index],
            time: data.daily["time"][index],
            weatherCode: data.daily["weathercode"][index],
            precipitationProbability: data.daily["precipitation_probability_max"][index]
          });
        }

        return days;
      }
    }
  );

  if (!days) {
    return null;
  }
  const tomorrowDay = days[1];
  return (
    <Box position={"relative"} overflow={"hidden"}>
      <Flex alignItems={"center"}>
        <Text fontSize={"xl"} color={"white"}>
          {daysCount === 5 ? "5 days Forecast" : "7 days Forecast"}
        </Text>
        <Spacer />
        <Menu zIndex={20} size={"sm"}>
          <MenuButton py={1} as={Button} rightIcon={<ChevronDownIcon />}>
            {daysCount === 5 ? "5d" : "7d"}
          </MenuButton>
          <MenuList zIndex={20}>
            <MenuItem onClick={() => setDaysCount(5)}>5d</MenuItem>
            <MenuItem onClick={() => setDaysCount(7)}>7d</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <GradientBlock overflow={"hidden"} mt={6} withoutPaddings={true}>
        <List display={"flex"} flexDirection={"column"} gap={{ xl: 5, usm: 8 }} p={3} pb={5}>
          <ListItem>
            <Flex
              alignItems={"center"}
              borderRadius={20}
              bg={"#15161A"}
              py={3}
              px={2}
              pr={5}
              boxShadow={"-1px -1px 58px 0px rgba(255,255,255,0.3)"}
            >
              <Image
                mr={2}
                w={{ xl: 20, usm: 14 }}
                h={{ xl: 20, usm: 14 }}
                src={weatherCodes[tomorrowDay.weatherCode].imgSrc}
              />
              <Box>
                <Text fontSize={{ usm: "sm", xl: "lg" }}>Tomorrow</Text>
                <Text lineHeight={1.2} color={"white"} fontSize={{ usm: "xl", xl: "2xl" }}>
                  {tomorrowDay.temperatureMax}°
                </Text>
                <Text fontSize={{ usm: "sm", xl: "lg" }}>
                  {weatherCodes[tomorrowDay.weatherCode].title}
                </Text>
              </Box>
              <Spacer />
              <Flex gap={2} flexDirection={"column"} alignItems={"center"}>
                <Icon w={5} h={5} fill="white" as={MdGrain} />
                <Flex alignItems={"end"} gap={1}>
                  <Text lineHeight={1} color={"white"} fontSize={"xl"}>
                    {tomorrowDay.precipitationProbability}
                  </Text>
                  <Text>%</Text>
                </Flex>
              </Flex>
            </Flex>
          </ListItem>
          {days.slice(2, daysCount + 1).map((day) => (
            <ListItem
              key={day.time}
              pr={{ lg: 4, usm: 0 }}
              gap={4}
              display={{ lg: "grid", md: "flex", usm: "grid" }}
              gridTemplateColumns={"5fr 2fr 2fr"}
              alignItems={"center"}
            >
              <Flex alignItems={"center"} gap={3}>
                <Image
                  w={{ xl: 12, md: 8, usm: 8 }}
                  h={{ xl: 12, md: 8, usm: 8 }}
                  src={weatherCodes[day.weatherCode].imgSrc}
                />
                <Flex
                  flexDirection={{ sm: "row", usm: "column" }}
                  alignItems={{ "2xl": "end", "xl": "center" }}
                >
                  <Text
                    lineHeight={1}
                    color={"white"}
                    fontSize={{ "2xl": "3xl", "sm": "xl", "usm": "sm" }}
                  >
                    +{day.temperatureMax}°/
                  </Text>
                  <Text
                    lineHeight={{ xl: 1.5, lg: 1 }}
                    fontSize={{ "2xl": "xl", "sm": "md", "usm": "sm" }}
                  >
                    +{day.temperatureMin}
                  </Text>
                </Flex>
              </Flex>
              <Text fontSize={{ lg: "lg", usm: "xs" }}>
                {getDayNumberFromString(day.time)} {getMonthNameFromString(day.time)}
              </Text>
              <Text fontSize={{ lg: "lg", usm: "xs" }}>{getDayNameFromString(day.time)}</Text>
            </ListItem>
          ))}
        </List>
      </GradientBlock>
    </Box>
  );
};

export default Forecast;
