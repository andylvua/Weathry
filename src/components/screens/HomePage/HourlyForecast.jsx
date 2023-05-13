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
import { MdAir, MdGrain } from "react-icons/md";
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
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize={"xl"} color={"white"}>
          Hourly Forecast
        </Text>
        <Flex gap={5} justifyContent={"end"}>
          <SlideNavigationButton type={"prev"} swiper={swiperInstance} />
          <SlideNavigationButton type={"next"} swiper={swiperInstance} />
        </Flex>
      </Flex>
      <GradientBlock withoutPaddings={true} p={2} mt={6}>
        <Swiper
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={5}
          slidesPerView={8}
        >
          {hourlyWeatherData.map((el) => (
            <SwiperSlide key={el.time} style={{ height: "auto" }}>
              <Flex
                borderRadius={10}
                flexDirection={"column"}
                alignItems={"center"}
                py={5}
                px={1}
                bg={"rgba(29,31,32,0.44)"}
                h={"full"}
              >
                <Text>{getHourFromString(el.time)}</Text>
                <Image mt={4} w={14} h={14} src={weatherCodes[el.weatherCode].imgSrc} />
                <Flex gap={2} mt={3} flexDirection={"column"} alignItems={"center"}>
                  <Text lineHeight={1} color={"white"} fontSize={"2xl"}>
                    {el.temperature}
                    {el.temperatureUnit}
                  </Text>
                </Flex>
                <Text textAlign={"center"} fontSize={16} mt={5}>
                  {weatherCodes[el.weatherCode].title}
                </Text>
                <Divider bg={"white"} mt={5} />
                <Flex gap={2} mt={8} flexDirection={"column"} alignItems={"center"}>
                  <Icon w={5} h={5} fill="white" as={MdAir} />
                  <Flex alignItems={"end"} gap={1}>
                    <Text lineHeight={1} color={"white"} fontSize={"xl"}>
                      {el.windSpeed}
                    </Text>
                    <Text lineHeight={1.2}>{el.windSpeedUnit}</Text>
                  </Flex>
                </Flex>
                <Flex gap={2} mt={5} flexDirection={"column"} alignItems={"center"}>
                  <Icon w={5} h={5} fill="white" as={MdGrain} />
                  <Flex alignItems={"end"} gap={1}>
                    <Text lineHeight={1} color={"white"} fontSize={"xl"}>
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
