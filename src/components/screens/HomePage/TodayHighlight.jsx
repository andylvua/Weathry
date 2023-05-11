import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { Box, Flex, Grid, GridItem, Icon, Spacer, Text } from "@chakra-ui/react";
import { getCurrentHour } from "../../../utils/time";
import {
  MdAir,
  MdCompress,
  MdLightMode,
  MdOpacity,
  MdThermostat,
  MdVisibility
} from "react-icons/md";

const TodayHighlight = () => {
  const { latitude, longitude, timezone } = useSelector((state) => state.location);
  const { data: hourlyWeatherData } = useQuery(
    ["hourly weather", latitude, longitude],
    () => weatherApi.hourlyWeather(latitude, longitude),
    {
      select({ data }) {
        return data;
      }
    }
  );

  const { data: dailyWeatherData } = useQuery(
    ["daily weather", latitude, longitude],
    () => weatherApi.dailyWeather(latitude, longitude, timezone),
    {
      select({ data }) {
        return data;
      }
    }
  );

  if (!hourlyWeatherData || !dailyWeatherData) {
    return null;
  }

  return (
    <GradientBlock h={"full"} withoutPaddings={true}>
      <Box p={5}>
        <Text fontSize={"xl"} color={"white"}>
          Today's Highlight
        </Text>
        <Grid
          mt={8}
          gridColumnGap={3}
          gridRowGap={6}
          gridTemplateColumns={"1fr 1fr 1fr"}
          w={"full"}
        >
          <GridItem borderRadius={10} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text>Wind Status</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={3}>
                <Text lineHeight={1} color={"white"} fontSize={"4xl"}>
                  {hourlyWeatherData.hourly["windspeed_10m"][getCurrentHour()]}
                </Text>
                <Text>km/h</Text>
              </Flex>
              <Spacer />
              <Icon w={6} h={6} as={MdAir} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={10} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text>UV Index</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={3}>
                <Text lineHeight={1} color={"white"} fontSize={"4xl"}>
                  {dailyWeatherData.daily["uv_index_max"][0]}
                </Text>
                <Text>uv</Text>
              </Flex>
              <Spacer />
              <Icon w={6} h={6} as={MdLightMode} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={10} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text>Humidity</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={3}>
                <Text lineHeight={1} color={"white"} fontSize={"4xl"}>
                  {hourlyWeatherData.hourly["relativehumidity_2m"][getCurrentHour()]}
                </Text>
                <Text>%</Text>
              </Flex>
              <Spacer />
              <Icon w={6} h={6} as={MdOpacity} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={10} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text>Visibility</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={3}>
                <Text lineHeight={1} color={"white"} fontSize={"4xl"}>
                  {hourlyWeatherData.hourly["visibility"][getCurrentHour()] / 1000}
                </Text>
                <Text>km</Text>
              </Flex>
              <Spacer />
              <Icon w={6} h={6} as={MdVisibility} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={10} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text>Feels like</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={3}>
                <Text lineHeight={1} color={"white"} fontSize={"4xl"}>
                  {hourlyWeatherData.hourly["apparent_temperature"][getCurrentHour()]}°
                </Text>
              </Flex>
              <Spacer />
              <Icon w={6} h={6} as={MdThermostat} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={10} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text>Pressure</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={3}>
                <Text lineHeight={1} color={"white"} fontSize={"4xl"}>
                  {hourlyWeatherData.hourly["pressure_msl"][getCurrentHour()]}
                </Text>
                <Text>hPa</Text>
              </Flex>
              <Spacer />
              <Icon w={6} h={6} as={MdCompress} />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </GradientBlock>
  );
};

export default TodayHighlight;
