import {
  Box,
  Button,
  Flex,
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
            weatherCode: data.daily["weathercode"][index]
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
      <Flex>
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
      <GradientBlock overflow={"hidden"} mt={4} withoutPaddings={true}>
        <List display={"flex"} flexDirection={"column"} gap={5} p={3} pb={5}>
          <ListItem>
            <Flex
              left={"50%"}
              borderRadius={20}
              bg={"#15161A"}
              py={3}
              px={2}
              boxShadow={"-1px -1px 58px 0px rgba(255,255,255,0.3)"}
            >
              <Image mr={2} w={20} h={20} src={weatherCodes[tomorrowDay.weatherCode].imgSrc} />
              <Box>
                <Text>Tomorrow</Text>
                <Text lineHeight={1.2} color={"white"} fontSize={"2xl"}>
                  {tomorrowDay.temperatureMax}°
                </Text>
                <Text>{weatherCodes[tomorrowDay.weatherCode].title}</Text>
              </Box>
            </Flex>
          </ListItem>
          {days.slice(2, daysCount + 1).map((day) => (
            <ListItem
              key={day.time}
              pr={4}
              gap={4}
              display={"grid"}
              gridTemplateColumns={"5fr 2fr 2fr"}
              alignItems={"center"}
            >
              <Flex alignItems={"center"} gap={3}>
                <Image w={12} h={12} src={weatherCodes[day.weatherCode].imgSrc} />
                <Flex alignItems={"end"}>
                  <Text lineHeight={1} color={"white"} fontSize={"3xl"}>
                    +{day.temperatureMax}°/
                  </Text>
                  <Text lineHeight={1.5} fontSize={"xl"}>
                    +{day.temperatureMin}
                  </Text>
                </Flex>
              </Flex>
              <Text>
                {getDayNumberFromString(day.time)} {getMonthNameFromString(day.time)}
              </Text>
              <Text>{getDayNameFromString(day.time)}</Text>
            </ListItem>
          ))}
        </List>
      </GradientBlock>
    </Box>
  );
};

export default Forecast;
