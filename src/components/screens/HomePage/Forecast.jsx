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
import { WiRain } from "react-icons/wi";

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
      <Flex alignItems={"center"} mx={2}>
        <Text fontSize={"xl"} color={"white"} fontWeight={"bold"}>
          {daysCount === 5 ? "5 days Forecast" : "7 days Forecast"}
        </Text>
        <Spacer />
        <Menu zIndex={20} size={"sm"}>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} borderRadius={20} height={7}>
            {daysCount === 5 ? "5 Days" : "7 Days"}
          </MenuButton>
          <MenuList zIndex={20}>
            <MenuItem onClick={() => setDaysCount(5)}>5 Days</MenuItem>
            <MenuItem onClick={() => setDaysCount(7)}>7 Days</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <GradientBlock overflow={"hidden"} mt={3} withoutPaddings={true}>
        <List display={"flex"} flexDirection={"column"} gap={{ xl: 5, usm: 8 }} p={3} pb={5}>
          <ListItem>
            <Flex
              alignItems={"center"}
              borderRadius={13}
              bg={"rgba(29,31,32,0.24)"}
              py={3}
              px={2}
              pr={5}
              boxShadow={"0px 0px 30px 0px rgba(255,255,255,0.15)"}
            >
              <Image
                mr={2}
                w={{ xl: 20, usm: 14 }}
                h={{ xl: 20, usm: 14 }}
                src={weatherCodes[tomorrowDay.weatherCode].imgSrc}
              />
              <Box>
                <Text fontWeight={"medium"} fontSize={{ usm: "sm", xl: "lg" }}>
                  Tomorrow
                </Text>
                <Text lineHeight={1.2} color={"white"} fontSize={{ usm: "xl", xl: "2xl" }}>
                  {tomorrowDay.temperatureMax}°
                </Text>
                <Text fontSize={{ usm: "xs", xl: "sm" }}>
                  {weatherCodes[tomorrowDay.weatherCode].title}
                </Text>
              </Box>
              <Spacer />
              <Flex gap={2} flexDirection={"column"} alignItems={"center"}>
                <Icon w={6} h={6} fill="white" as={WiRain} />
                <Flex alignItems={"start"} gap={1}>
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
              gap={{ lg: 5, usm: 0 }}
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
                  flexDirection={"row"}
                  alignItems={"center"}
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
              <Text fontSize={{ lg: "md", usm: "xs" }}>
                {getDayNumberFromString(day.time)} {getMonthNameFromString(day.time)}
              </Text>
              <Text fontSize={{ lg: "md", usm: "xs" }}>{getDayNameFromString(day.time)}</Text>
            </ListItem>
          ))}
        </List>
      </GradientBlock>
    </Box>
  );
};

export default Forecast;
