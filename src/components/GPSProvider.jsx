import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const { autoGps } = useSelector((state) => state.units);
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
    const queryString = window.location.href.split("?")[1];
    const params = new URLSearchParams(queryString);

    if (params.get("latitude") && params.get("longitude")) {
      setLatitudeGps(Number(params.get("latitude")));
      setLongitudeGps(Number(params.get("longitude")));
    } else {
      const lastCityData = JSON.parse(localStorage.getItem("lastCity"));
      if (lastCityData?.latitude && lastCityData?.longitude) {
        setLatitudeGps(lastCityData?.latitude);
        setLongitudeGps(lastCityData?.longitude);
      }
    }
  }, []);

  useEffect(() => {
    if (autoGps === "on") {
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
  }, [autoGps]);

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
