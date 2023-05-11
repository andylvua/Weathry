import {
  Icon,
  List,
  ListItem,
  Spacer,
  Text,
  Image,
  Stack,
  Skeleton,
  IconButton
} from "@chakra-ui/react";
import { MdFavorite, MdFavoriteBorder, MdLocationCity } from "react-icons/md";
import React, { useEffect, useState } from "react";
import {
  setCityName,
  setCountryCode,
  setCountryName,
  setLatitude,
  setLongitude,
  setTimezone
} from "../../../store/location/LocationSlice";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../../../store/search-modal/SearchModalSlice";

const CityList = (data, isLoading) => {
  const dispatch = useDispatch();
  const cities = data?.cities?.results;
  const onChoseCity = (city) => {
    dispatch(setCityName(city.name));
    dispatch(setCountryName(city.country));
    dispatch(setCountryCode(city.country_code));
    dispatch(setLatitude(city.latitude));
    dispatch(setLongitude(city.longitude));
    dispatch(setTimezone(city.timezone));

    dispatch(setIsOpen(false));
  };
  const [favoriteCities, setFavoriteCities] = useState(null);

  const checkIsAlreadyFavorite = (cityId) => {
    return !!favoriteCities.find((el) => el.id === cityId);
  };

  const addToFavoriteList = (city) => {
    const favoriteCity = {
      cityName: city.name,
      countryName: city.country,
      countryCode: city.country_code,
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone,
      id: city.id
    };

    if (!checkIsAlreadyFavorite(city.id)) {
      setFavoriteCities((prev) => [favoriteCity, ...prev]);
    }
  };

  const deleteFromFavoriteList = (cityId) => {
    setFavoriteCities((prev) => prev.filter((el) => el.id !== cityId));
  };

  useEffect(() => {
    const data = localStorage.getItem("favoriteCities");
    if (data) {
      setFavoriteCities(JSON.parse(data));
    } else {
      setFavoriteCities([]);
    }
  }, []);

  useEffect(() => {
    if (favoriteCities) {
      localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
    }
  }, [favoriteCities]);

  if (!isLoading) {
    return (
      <Stack mt={5}>
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
        <Skeleton height={10} />
      </Stack>
    );
  }
  if (!cities || !favoriteCities) {
    return (
      <Text mt={5} fontSize={"2xl"} textAlign={"center"}>
        No data...
      </Text>
    );
  }

  return (
    <List mt={3} display={"flex"} flexDirection={"column"} gap={3}>
      {cities.map((city) => (
        <ListItem
          onClick={() => onChoseCity(city)}
          gap={3}
          key={city.id}
          alignItems={"center"}
          cursor={"pointer"}
          px={4}
          py={2}
          borderRadius={15}
          display={"flex"}
          bg={"gray.600"}
          transition={"all .2s ease"}
          _hover={{
            bg: "gray.800"
          }}
        >
          <Icon color={"white"} w={8} h={8} as={MdLocationCity} />
          <Text color={"white"} fontSize={"2xl"}>
            {city.name}, {city.country}
          </Text>
          <Spacer />
          <IconButton
            onClick={(event) => {
              event.stopPropagation();
              if (checkIsAlreadyFavorite(city.id)) {
                deleteFromFavoriteList(city.id);
              } else {
                addToFavoriteList(city);
              }
            }}
            position={"relative"}
            zIndex={10}
            aria-label={""}
          >
            <Icon
              fill={"red.500"}
              w={8}
              h={8}
              as={checkIsAlreadyFavorite(city.id) ? MdFavorite : MdFavoriteBorder}
            />
          </IconButton>
          <Image w={10} h={10} src={`https://flagsapi.com/${city.country_code}/flat/32.png`} />
        </ListItem>
      ))}
    </List>
  );
};

export default CityList;
