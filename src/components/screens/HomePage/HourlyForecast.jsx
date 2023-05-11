import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { getHourFromString } from "../../../utils/time";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { useSelector } from "react-redux";
import { weatherCodes } from "../../../utils/weatherCodes";

const HourlyForecast = () => {
  const { latitude, longitude } = useSelector((state) => state.location);
  const { data: hourlyWeatherData } = useQuery(
    ["hourly weather", latitude, longitude],
    () => weatherApi.hourlyWeather(latitude, longitude),
    {
      select({ data }) {
        const hourlyData = [];

        for (let index = 0; index < 25; index += 4) {
          const currentIndex = index === 0 ? 0 : index - 1;
          hourlyData.push({
            temperature: data.hourly["temperature_2m"][currentIndex],
            time: data.hourly["time"][currentIndex],
            weatherCode: data.hourly["weathercode"][currentIndex],
            windSpeed: data.hourly["windspeed_10m"][currentIndex].toFixed(1)
          });
        }

        return hourlyData;
      }
    }
  );

  if (!hourlyWeatherData) {
    return null;
  }

  return (
    <Box>
      <Flex>
        <Text fontSize={"xl"} color={"white"}>
          Hourly Forecast
        </Text>
      </Flex>
      <GradientBlock mt={6}>
        <Grid gap={4} gridTemplateColumns={"repeat(7, 1fr)"}>
          {hourlyWeatherData.map((el) => (
            <GridItem>
              <Flex
                borderRadius={10}
                flexDirection={"column"}
                alignItems={"center"}
                py={5}
                px={2}
                bg={"rgba(29,31,32,0.44)"}
              >
                <Text>{getHourFromString(el.time)}:00</Text>
                <Image mt={4} w={14} h={14} src={weatherCodes[el.weatherCode].imgSrc} />
                <Flex mt={3} flexDirection={"column"} alignItems={"center"}>
                  <Text lineHeight={1} color={"white"} fontSize={"2xl"}>
                    {el.temperature}°
                  </Text>
                </Flex>
                <Flex mt={5} alignItems={"end"} gap={1}>
                  <Text lineHeight={1} color={"white"} fontSize={"xl"}>
                    {el.windSpeed}
                  </Text>
                  <Text>km/h</Text>
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </Grid>
      </GradientBlock>
    </Box>
  );
};

export default HourlyForecast;
