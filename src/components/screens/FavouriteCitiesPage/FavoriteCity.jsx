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
            flexDirection={{ sm: "row", usm: "column" }}
            alignItems={{ sm: "center", usm: "start" }}
            gap={{ sm: 3, usm: 1 }}
          >
            <Text color={"white"} fontSize={{ md: "3xl", usm: "xl" }} fontWeight={"medium"}>
              {favoriteCity.cityName}
            </Text>
            <Flex alignItems={"center"} gap={1}>
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
                  w={6}
                  h={6}
                  src={`https://flagsapi.com/${favoriteCity.countryCode}/flat/32.png`}
                />
              )}
            </Flex>
          </Flex>
          <Text>{getCurrentTime(favoriteCity.timezone)}</Text>
        </Box>
        <Spacer />
        <Text mr={20} color={"white"} fontWeight={"medium"} fontSize={{ lg: "3xl", usm: "xl" }}>
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
          >
            <Icon fill={"red.500"} as={CiCircleRemove} w={7} h={7} />
          </IconButton>
        )}
      </Flex>
    </GradientBlock>
  );
};

export default FavoriteCity;
