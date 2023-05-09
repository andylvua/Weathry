import Navigation from "./navigation/Navigation";
import { Box, Flex, useColorMode } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { weatherApi } from "../../api/weatherApi";
import {
  setCityName,
  setCountryCode,
  setCountryName,
  setLatitude,
  setLongitude,
  setTimezone
} from "../../store/location/LocationSlice";

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [latitudeGps, setLatitudeGps] = useState(50.066279);
  const [longitudeGps, setLongitudeGps] = useState(14.434908);
  const dispatch = useDispatch();

  const { data } = useQuery(
    ["reverse geocoding", latitudeGps, longitudeGps],
    () => weatherApi.reverseGeocoding(latitudeGps, longitudeGps),
    {
      select({ data }) {
        return data;
      }
    }
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (result) => {
        setLatitudeGps(result.coords.latitude);
        setLongitudeGps(result.coords.longitude);
      },
      (error) => {
        console.log("Error", error);
      }
    );
  }, []);

  if (colorMode === "light") {
    toggleColorMode();
  }
  useEffect(() => {
    if (data) {
      dispatch(setCityName(data.locality));
      dispatch(setCountryName(data.countryName));
      dispatch(setCountryCode(data.countryCode));
      dispatch(setLatitude(data.latitude));
      dispatch(setLongitude(data.longitude));
      data.localityInfo.informative.forEach((infoBlock) => {
        if (infoBlock.description === "time zone") {
          dispatch(setTimezone(infoBlock.name));
        }
      });
    }
  }, [data]);

  return (
    <Flex bg={"black"} w={"full"} minH={"100vh"} gap={6}>
      <Navigation />
      <Box w={"full"} my={3} mr={3}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
