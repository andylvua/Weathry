import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { getHourFromString } from "../../../utils/time";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { useSelector } from "react-redux";
import { weatherCodes } from "../../../utils/weatherCodes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import SlideNavigationButton from "./SlideNavigationButton";

const HourlyForecast = () => {
  const { latitude, longitude } = useSelector((state) => state.location);
  const { data: hourlyWeatherData } = useQuery(
    ["hourly weather", latitude, longitude],
    () => weatherApi.hourlyWeather(latitude, longitude),
    {
      select({ data }) {
        const hourlyData = [];

        for (let index = 0; index < 24; index++) {
          hourlyData.push({
            temperature: data.hourly["temperature_2m"][index],
            time: data.hourly["time"][index],
            weatherCode: data.hourly["weathercode"][index],
            windSpeed: data.hourly["windspeed_10m"][index].toFixed(1)
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
            </SwiperSlide>
          ))}
          <span slot="container-end">
            <Flex mt={5} mb={2} gap={5} justifyContent={"center"}>
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
