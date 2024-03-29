import GradientBlock from "../../ui/GradientBlock/GradientBlock";
import { useQuery } from "react-query";
import { weatherApi } from "../../../api/weatherApi";
import { weatherCodes } from "../../../utils/weatherCodes";
import { Box, Flex, Icon, IconButton, Image, Skeleton, Spacer, Text } from "@chakra-ui/react";
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
import { CiCircleRemove, CiLocationArrow1 } from "react-icons/ci";

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
      p={{ sm: 3, usm: 1 }}
      w={"full"}
    >
      <Flex alignItems={{ sm: "", usm: "center" }} gap={{ lg: 5, usm: 1 }}>
        <Image
          display={"block"}
          mt={{ sm: 0, usm: 2 }}
          w={{ md: 28, sm: 20, usm: 10 }}
          h={{ md: 28, sm: 20, usm: 10 }}
          src={weatherCodes[favoriteCityCurrentWeather.weathercode].imgSrc}
        />
        <Box>
          <Flex
            alignItems={{ sm: "center", usm: "start" }}
            gap={{ sm: 3, usm: 1 }}
          >
            <Text color={"white"} fontSize={{ md: "3xl", usm: "lg" }} fontWeight={"medium"}>
              {favoriteCity.cityName}
            </Text>
            <Flex alignItems={"center"} gap={1} mt={{ sm: 0, usm: 1 }}>
              {isGeolocated && (
                <Icon
                  color={"white"}
                  fill={"whatsapp.100"}
                  w={{ sm: 7, usm: 4 }}
                  h={{ sm: 7, usm: 4 }}
                  as={CiLocationArrow1}
                />
              )}
              {!isGeolocated && (
                <Image
                  mt={1}
                  w={{ sm: 6, usm: 4 }}
                  h={{ sm: 6, usm: 4 }}
                  src={`https://flagsapi.com/${favoriteCity.countryCode}/flat/32.png`}
                />
              )}
            </Flex>
          </Flex>
          <Text fontSize={{ md: "2xl", usm: "xs" }}>
            {getCurrentTime(favoriteCity.timezone)}
          </Text>
        </Box>
        <Spacer />
        <Text mr={{sm: 20, usm: 10}} color={"white"} fontWeight={"medium"} fontSize={{ lg: "3xl", usm: "lg" }}>
          {favoriteCityCurrentWeather.temperature}
          {temperatureUnit === "fahrenheit" ? "°F" : "°С"}
        </Text>
        {!isGeolocated && (
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              deleteFromFavoriteList(favoriteCity.id);
            }}
            aria-label={""}
            position={"absolute"}
            top={-1}
            right={-1}
            borderRadius={7}
            borderTopRightRadius={13}
            bg={"transparent"}
            _hover={{ bg: "transparent" }}
          >
            <Icon
              fill={"gray.300"}
              as={CiCircleRemove}
              w={{ sm: 7, usm: 5 }}
              h={{ sm: 7, usm: 5 }}
              _hover={{ fill: "red.500" }}
              transition={"all 0.2s ease-in-out"}
            />
          </IconButton>
        )}
      </Flex>
    </GradientBlock>
  );
};

export default FavoriteCity;
