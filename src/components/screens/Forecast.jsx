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
import GradientBlock from "../ui/GradientBlock/GradientBlock";
import { useQuery } from "react-query";
import { weatherApi } from "../../api/weatherApi";
import { useSelector } from "react-redux";
import {
  getDayNameFromString,
  getDayNumberFromString,
  getMonthNameFromString
} from "../../utils/time";
import { weatherCodes } from "../../utils/weatherCodes";

const Forecast = () => {
  const [daysCount, setDaysCount] = useState(5);
  const { latitude, longitude, timezone } = useSelector((state) => state.location);
  const { data: days } = useQuery(
    ["daily weather", latitude, longitude],
    () => weatherApi.dailyWeather(latitude, longitude, timezone),
    {
      select({ data }) {
        const days = [];
        for (let index = 0; index < 7; index++) {
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

  return (
    <Box>
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
      <GradientBlock mt={4} withoutPaddings={true}>
        <List display={"flex"} flexDirection={"column"} gap={5} p={3}>
          {days.slice(0, daysCount).map((day) => (
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
