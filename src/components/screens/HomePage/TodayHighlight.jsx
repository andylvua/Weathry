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
  const { temperatureUnit, windSpeedUnit } = useSelector((state) => state.units);

  const { data: hourlyWeatherData } = useQuery(
    ["hourly weather", latitude, longitude],
    () => weatherApi.hourlyWeather(latitude, longitude, { temperatureUnit, windSpeedUnit }),
    {
      select({ data }) {
        return data;
      }
    }
  );

  const { data: dailyWeatherData } = useQuery(
    ["daily weather", latitude, longitude],
    () =>
      weatherApi.dailyWeather(latitude, longitude, timezone, { temperatureUnit, windSpeedUnit }),
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
      <Box p={{ sm: 5, usm: 3 }}>
        <Text fontSize={"xl"} color={"white"} fontWeight={"medium"}>
          Today's Highlight
        </Text>
        <Grid
          mt={{ sm: 8, usm: 3 }}
          gridColumnGap={{ sm: 3, usm: 1 }}
          gridRowGap={{ lg: 6, usm: 1 }}
          gridTemplateColumns={{ lg: "1fr 1fr 1fr", usm: "1fr 1fr" }}
          w={"full"}
        >
          <GridItem borderRadius={13} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text fontSize={{ sm: "xm", usm: "xs", lg: "sm" }}>Wind Status</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={{ xl: 3, usm: 1 }}>
                <Text lineHeight={1} color={"white"} fontSize={{ xl: "4xl", lg: "2xl", md: "xl" }}>
                  {hourlyWeatherData.hourly["windspeed_10m"][getCurrentHour()]}
                </Text>
                <Text lineHeight={{ xl: 1.5, sm: 1 }} fontSize={{ sm: "lg", usm: "xs" }}>
                  {hourlyWeatherData["hourly_units"]["windspeed_10m"]}
                </Text>
              </Flex>
              <Spacer />
              <Icon w={{ sm: 6, usm: 3 }} h={{ sm: 6, usm: 3 }} as={MdAir} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={13} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text fontSize={{ sm: "xm", usm: "xs", lg: "sm" }}>UV Index</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={{ xl: 3, usm: 1 }}>
                <Text lineHeight={1} color={"white"} fontSize={{ xl: "4xl", lg: "2xl", md: "xl" }}>
                  {dailyWeatherData.daily["uv_index_max"][0]}
                </Text>
                <Text lineHeight={{ xl: 1.5, sm: 1 }} fontSize={{ sm: "lg", usm: "xs" }}>
                  uv
                </Text>
              </Flex>
              <Spacer />
              <Icon w={{ sm: 6, usm: 3 }} h={{ sm: 6, usm: 3 }} as={MdLightMode} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={13} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text fontSize={{ sm: "xm", usm: "xs", lg: "sm" }}>Humidity</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={{ xl: 3, usm: 1 }}>
                <Text lineHeight={1} color={"white"} fontSize={{ xl: "4xl", lg: "2xl", md: "xl" }}>
                  {hourlyWeatherData.hourly["relativehumidity_2m"][getCurrentHour()]}
                </Text>
                <Text lineHeight={{ xl: 1.5, sm: 1 }} fontSize={{ sm: "lg", usm: "xs" }}>
                  %
                </Text>
              </Flex>
              <Spacer />
              <Icon w={{ sm: 6, usm: 3 }} h={{ sm: 6, usm: 3 }} as={MdOpacity} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={13} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text fontSize={{ sm: "xm", usm: "xs", lg: "sm" }}>Visibility</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={{ xl: 3, usm: 1 }}>
                <Text lineHeight={1} color={"white"} fontSize={{ xl: "4xl", lg: "2xl", md: "xl" }}>
                  {(hourlyWeatherData.hourly["visibility"][getCurrentHour()] / 1000).toFixed(1)}
                </Text>
                <Text lineHeight={{ xl: 1.5, sm: 1 }} fontSize={{ sm: "lg", usm: "xs" }}>
                  km
                </Text>
              </Flex>
              <Spacer />
              <Icon w={{ sm: 6, usm: 3 }} h={{ sm: 6, usm: 3 }} as={MdVisibility} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={13} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text fontSize={{ sm: "xm", usm: "xs", lg: "sm" }}>Feels like</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={{ xl: 3, usm: 1 }}>
                <Text lineHeight={1} color={"white"} fontSize={{ xl: "4xl", lg: "2xl", md: "xl" }}>
                  {hourlyWeatherData.hourly["apparent_temperature"][getCurrentHour()]}
                  {hourlyWeatherData["hourly_units"]["apparent_temperature"]}
                </Text>
              </Flex>
              <Spacer />
              <Icon w={{ sm: 6, usm: 3 }} h={{ sm: 6, usm: 3 }} as={MdThermostat} />
            </Flex>
          </GridItem>
          <GridItem borderRadius={13} bg={"rgba(29,31,32,0.44)"} p={3}>
            <Text fontSize={{ sm: "xm", usm: "xs", lg: "sm" }}>Pressure</Text>
            <Flex mt={5} alignItems={"end"}>
              <Flex alignItems={"end"} gap={{ xl: 3, usm: 1 }}>
                <Text lineHeight={1} color={"white"} fontSize={{ xl: "4xl", lg: "2xl", md: "xl" }}>
                  {hourlyWeatherData.hourly["pressure_msl"][getCurrentHour()]}
                </Text>
                <Text lineHeight={{ xl: 1.5, sm: 1 }} fontSize={{ sm: "lg", usm: "xs" }}>
                  hPa
                </Text>
              </Flex>
              <Spacer />
              <Icon w={{ sm: 6, usm: 3 }} h={{ sm: 6, usm: 3 }} as={MdCompress} />
            </Flex>
          </GridItem>
        </Grid>
      </Box>
    </GradientBlock>
  );
};

export default TodayHighlight;
