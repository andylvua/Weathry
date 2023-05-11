import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { weatherCodes } from "../../../utils/weatherCodes";
import { Box, Flex, Image, Skeleton, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { getCurrentTime } from "../../../utils/time";
import { useDispatch } from "react-redux";
import {
  setCityName,
  setCountryCode,
  setCountryName,
  setLatitude,
  setLongitude,
  setTimezone
} from "../../../store/location/LocationSlice";
import { useNavigate } from "react-router-dom";

const FavouriteCity = ({ favouriteCity: favoriteCity }) => {
  const { data: favouriteCityCurrentWeather } = useQuery(
    ["current weather", favoriteCity.latitude, favoriteCity.longitude],
    () => weatherApi.currentWeather(favoriteCity.latitude, favoriteCity.longitude),
    {
      select({ data }) {
        return data.current_weather;
      }
    }
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCityName(favoriteCity.cityName));
    dispatch(setCountryName(favoriteCity.countryName));
    dispatch(setCountryCode(favoriteCity.countryCode));
    dispatch(setLatitude(favoriteCity.latitude));
    dispatch(setLongitude(favoriteCity.longitude));
    dispatch(setTimezone(favoriteCity.timezone));

    navigate("/");
  };

  if (!favouriteCityCurrentWeather) {
    return <Skeleton height="80px" />;
  }

  return (
    <GradientBlock
      onClick={handleClick}
      cursor={"pointer"}
      withoutPaddings={true}
      pr={10}
      p={3}
      w={"full"}
    >
      <Flex gap={5}>
        <Image
          display={"block"}
          w={28}
          h={28}
          src={weatherCodes[favouriteCityCurrentWeather.weathercode].imgSrc}
        />
        <Box mt={4}>
          <Text color={"white"} fontSize={"3xl"}>
            {favoriteCity.cityName}
          </Text>
          <Text>{getCurrentTime(favoriteCity.timezone)}</Text>
        </Box>
        <Spacer />
        <Text color={"white"} fontSize={"3xl"} mt={4}>
          {favouriteCityCurrentWeather.temperature}°С
        </Text>
      </Flex>
    </GradientBlock>
  );
};

export default FavouriteCity;
