import { Icon, List, ListItem, Spacer, Text } from "@chakra-ui/react";
import { MdLocationCity } from "react-icons/md";
import React from "react";
import {
  setCityName,
  setCountryCode,
  setCountryName,
  setLatitude,
  setLongitude
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

    dispatch(setIsOpen(false));
  };
  if (!isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!cities) {
    return <Text>No data...</Text>;
  }

  return (
    <List mt={3} display={"flex"} flexDirection={"column"} gap={3}>
      {cities.map((city) => (
        <ListItem
          onClick={() => onChoseCity(city)}
          gap={3}
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
        </ListItem>
      ))}
    </List>
  );
};

export default CityList;
