import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { Box, Divider, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { getCurrentHour, getHourFromString } from "../../../utils/time";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { useSelector } from "react-redux";
import { weatherCodes } from "../../../utils/weatherCodes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import SlideNavigationButton from "./SlideNavigationButton";
import { MdAir, MdCompress } from "react-icons/md";

const HourlyForecast = () => {
  const { latitude, longitude } = useSelector((state) => state.location);
  const { temperatureUnit, windSpeedUnit } = useSelector((state) => state.units);
  const { data: hourlyWeatherData } = useQuery(
    ["hourly weather", latitude, longitude],
    () => weatherApi.hourlyWeather(latitude, longitude, { temperatureUnit, windSpeedUnit }),
    {
      select({ data }) {
        const hourlyData = [];

        for (let index = getCurrentHour(); index < getCurrentHour() + 24; index++) {
          hourlyData.push({
            temperature: data.hourly["temperature_2m"][index],
            time: data.hourly["time"][index],
            weatherCode: data.hourly["weathercode"][index],
            windSpeed: data.hourly["windspeed_10m"][index].toFixed(1),
            pressure: data.hourly["pressure_msl"][index],
            temperatureUnit: data["hourly_units"]["temperature_2m"],
            windSpeedUnit: data["hourly_units"]["windspeed_10m"]
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
    <Box maxW={"full"}>
      <Flex>
        <Text fontSize={"xl"} color={"white"}>
          Hourly Forecast
        </Text>
      </Flex>
      <GradientBlock withoutPaddings={true} p={2} mt={6}>
        <Swiper modules={[Navigation, Pagination, Scrollbar]} spaceBetween={5} slidesPerView={8}>
          {hourlyWeatherData.map((el) => (
            <SwiperSlide>
              <Flex
                borderRadius={10}
                flexDirection={"column"}
                alignItems={"center"}
                py={5}
                px={1}
                bg={"rgba(29,31,32,0.44)"}
              >
                <Text>{getHourFromString(el.time)}</Text>
                <Image mt={4} w={14} h={14} src={weatherCodes[el.weatherCode].imgSrc} />
                <Flex gap={2} mt={3} flexDirection={"column"} alignItems={"center"}>
                  <Text lineHeight={1} color={"white"} fontSize={"2xl"}>
                    {el.temperature}
                    {el.temperatureUnit}
                  </Text>
                </Flex>
                <Divider bg={"white"} mt={5} />
                <Flex gap={2} mt={8} flexDirection={"column"} alignItems={"center"}>
                  <Icon w={5} h={5} fill="white" as={MdAir} />
                  <Flex alignItems={"end"} gap={1}>
                    <Text lineHeight={1} color={"white"} fontSize={"xl"}>
                      {el.windSpeed}
                    </Text>
                    <Text>{el.windSpeedUnit}</Text>
                  </Flex>
                </Flex>
                <Flex gap={2} mt={6} flexDirection={"column"} alignItems={"center"}>
                  <Icon w={5} h={5} fill="white" as={MdCompress} />
                  <Flex alignItems={"end"} gap={1}>
                    <Text lineHeight={1} color={"white"} fontSize={"xl"}>
                      {el.pressure}
                    </Text>
                    <Text>hPa</Text>
                  </Flex>
                </Flex>
              </Flex>
            </SwiperSlide>
          ))}
          <span slot="container-start">
            <Flex mb={3} gap={5} justifyContent={"end"}>
              <SlideNavigationButton type={"prev"} />
              <SlideNavigationButton type={"next"} />
            </Flex>
          </span>
        </Swiper>
      </GradientBlock>
    </Box>
  );
};

export default HourlyForecast;
