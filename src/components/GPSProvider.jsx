import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import { weatherApi } from "../api/weatherApi";
import {
  setCityName,
  setCountryCode,
  setCountryName,
  setLatitude,
  setLongitude,
  setTimezone
} from "../store/location/LocationSlice";

const GPSProvider = ({ children }) => {
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
    if (localStorage.getItem("autoGps") === "on") {
      navigator.geolocation.getCurrentPosition(
        (result) => {
          setLatitudeGps(result.coords.latitude);
          setLongitudeGps(result.coords.longitude);
        },
        (error) => {
          console.log("Error", error);
        }
      );
    }
  }, []);

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
      const GPSCity = {
        cityName: data.locality,
        countryCode: data.countryCode,
        countryName: data.countryName,
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: ""
      };
      data.localityInfo.informative.forEach((infoBlock) => {
        if (infoBlock.description === "time zone") {
          GPSCity.timezone = infoBlock.name;
        }
      });
      localStorage.setItem("GPSCity", JSON.stringify(GPSCity));
    }
  }, [data]);

  return <>{children}</>;
};

export default GPSProvider;
