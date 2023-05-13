import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { weatherCodes } from "../../../utils/weatherCodes";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Skeleton,
  Spacer,
  Text
} from "@chakra-ui/react";
import React from "react";
import { getCurrentTime } from "../../../utils/time";
import { useDispatch, useSelector } from "react-redux";
import {
  setCityName,
  setCountryCode,
  setCountryName,
  setLatitude,
  setLongitude,
  setTimezone
} from "../../../store/location/LocationSlice";
import { useNavigate } from "react-router-dom";
import { MdClose, MdLocationOn } from "react-icons/md";

const FavoriteCity = ({ favoriteCity, deleteFromFavoriteList, isGeolocated = false }) => {
  const { temperatureUnit } = useSelector((state) => state.units);
  const { data: favoriteCityCurrentWeather } = useQuery(
    ["current weather", favoriteCity.latitude, favoriteCity.longitude],
    () =>
      weatherApi.currentWeather(favoriteCity.latitude, favoriteCity.longitude, { temperatureUnit }),
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

  if (!favoriteCityCurrentWeather) {
    return <Skeleton height="80px" />;
  }

  return (
    <GradientBlock
      onClick={handleClick}
      position={"relative"}
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
          src={weatherCodes[favoriteCityCurrentWeather.weathercode].imgSrc}
        />
        <Box mt={4}>
          <HStack>
            <Text color={"white"} fontSize={"3xl"}>
              {favoriteCity.cityName}
            </Text>
            {isGeolocated && <Icon color={"white"} fill={"white"} w={7} h={7} as={MdLocationOn} />}
            <Image
              w={5}
              h={5}
              src={`https://flagsapi.com/${favoriteCity.countryCode}/flat/32.png`}
            />
          </HStack>
          <Text>{getCurrentTime(favoriteCity.timezone)}</Text>
        </Box>
        <Spacer />
        <Text mt={!isGeolocated ? 12 : 4} mr={-2} color={"white"} fontSize={"3xl"}>
          {favoriteCityCurrentWeather.temperature}
          {temperatureUnit === "celsius" ? "°С" : "°F"}
        </Text>
        {!isGeolocated && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              deleteFromFavoriteList(favoriteCity.id);
            }}
            mt={4}
            aria-label={""}
            position={"absolute"}
            top={-4}
            right={-4}
          >
            <Icon fill={"red.500"} as={MdClose} w={7} h={7} />
          </IconButton>
        )}
      </Flex>
    </GradientBlock>
  );
};

export default FavoriteCity;
