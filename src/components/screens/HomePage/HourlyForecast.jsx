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
import { swiperProps } from "./SlideNavigationButton"
import { MdAir } from "react-icons/md";
import { WiRain } from "react-icons/wi";
import { useState } from "react";

const HourlyForecast = () => {
  const { latitude, longitude } = useSelector((state) => state.location);
  const { temperatureUnit, windSpeedUnit } = useSelector((state) => state.units);
  const [swiperInstance, setSwiperInstance] = useState();
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
            windSpeedUnit: data["hourly_units"]["windspeed_10m"],
            precipitationProbability: data.hourly["precipitation_probability"][index]
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
    <Box maxW={"full"} postion={"relative"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} mx={2}>
        <Text fontSize={"xl"} color={"white"} fontWeight={"bold"}>
          Hourly Forecast
        </Text>
        <Flex gap={4} justifyContent={"end"}>
          <SlideNavigationButton type={"prev"} swiper={swiperInstance} size={7} />
          <SlideNavigationButton type={"next"} swiper={swiperInstance} height={7} />
        </Flex>
      </Flex>
      <GradientBlock withoutPaddings={true} p={2} mt={3}>
        <Swiper
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          modules={[Navigation, Pagination, Scrollbar]}
          {...swiperProps}
        >
          {hourlyWeatherData.map((el) => (
            <SwiperSlide key={el.time} style={{ height: "auto" }}>
              <Flex
                borderRadius={13}
                flexDirection={"column"}
                alignItems={"center"}
                py={5}
                px={1}
                bg={"rgba(29,31,32,0.24)"}
                h={"full"}
              >
                <Text>{getHourFromString(el.time)}</Text>
                <Image
                  mt={{ xl: 4, usm: 1 }}
                  w={{ lg: 14, md: 10 }}
                  h={{ lg: 14, md: 10 }}
                  src={weatherCodes[el.weatherCode].imgSrc}
                />
                <Flex gap={2} mt={3} flexDirection={"column"} alignItems={"center"}>
                  <Text lineHeight={1} color={"white"} fontSize={{ lg: "2xl", usm: "xl" }}>
                    {el.temperature}
                    {el.temperatureUnit}
                  </Text>
                </Flex>
                <Text
                  textAlign={"center"}
                  fontSize={{ lg: "sm", usm: "xs" }}
                  mt={{ lg: 5, usm: 3 }}
                >
                  {weatherCodes[el.weatherCode].title}
                </Text>
                <Divider mt={{ lg: 7, usm: 5 }} />
                <Flex gap={2} mt={{ lg: 8, usm: 4 }} flexDirection={"column"} alignItems={"center"}>
                  <Icon w={5} h={5} as={MdAir} />
                  <Flex alignItems={"end"} gap={1}>
                    <Text lineHeight={1} color={"white"} fontSize={{ lg: "xl", usm: "md" }}>
                      {el.windSpeed}
                    </Text>
                    <Text lineHeight={1.2}>{el.windSpeedUnit}</Text>
                  </Flex>
                </Flex>
                <Flex gap={2} mt={5} flexDirection={"column"} alignItems={"center"}>
                  <Icon w={6} h={6} as={WiRain} />
                  <Flex alignItems={"end"} gap={1}>
                    <Text fontSize={{ lg: "xl", usm: "md" }} lineHeight={1} color={"white"}>
                      {el.precipitationProbability}
                    </Text>
                    <Text lineHeight={1.2}>%</Text>
                  </Flex>
                </Flex>
              </Flex>
            </SwiperSlide>
          ))}
          <span slot="container-start"></span>
        </Swiper>
      </GradientBlock>
    </Box>
  );
};

export default HourlyForecast;
