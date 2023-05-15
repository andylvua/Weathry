import axios from "axios";

export const instanceGeocoding = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1"
});
export const instanceOpenMeteo = axios.create({
  baseURL: "https://api.open-meteo.com/v1"
});
export const instanceReverseGeocoding = axios.create({
  baseURL: "https://api.bigdatacloud.net/data/reverse-geocode-client"
});

const getUnitsString = (tempUnit = "celsius", windUnit = "km", precipUnit = "millimeter") => {
  const temperatureUnitString = `temperature_unit=${tempUnit ? tempUnit : "celsius"}`;
  const windSpeedUnitString = windUnit !== "km" && windUnit ? `&windspeed_unit=${windUnit}` : "";
  const precipitationUnitString =
    precipUnit !== "millimeter" && precipUnit ? `&precipitation_unit=${precipUnit}` : "";

  return temperatureUnitString + windSpeedUnitString + precipitationUnitString;
};

export const weatherApi = {
  searchCity(cityName, count = 10) {
    return instanceGeocoding.get(`/search?name=${cityName}&count=${count}`);
  },
  currentWeather(latitude, longitude, units = {}) {
    return instanceOpenMeteo.get(
      `/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&${getUnitsString(
        units.temperatureUnit,
        units.windSpeedUnit,
        units.precipitationUnit
      )}`
    );
  },
  hourlyWeather(latitude, longitude, units = {}) {
    return instanceOpenMeteo.get(
      `/forecast?latitude=${latitude}&longitude=${longitude}&hourly=precipitation_probability,temperature_2m,relativehumidity_2m,visibility,apparent_temperature,windspeed_10m,pressure_msl,weathercode,windspeed_10m&${getUnitsString(
        units.temperatureUnit,
        units.windSpeedUnit,
        units.precipitationUnit
      )}`
    );
  },
  dailyWeather(latitude, longitude, timezone, units = {}) {
    return instanceOpenMeteo.get(
      `/forecast?latitude=${latitude}&longitude=${longitude}&daily=precipitation_probability_max,temperature_2m_max,temperature_2m_min,uv_index_max,windspeed_10m_max,weathercode&forecast_days=14&timezone=${timezone}&${getUnitsString(
        units.temperatureUnit,
        units.windSpeedUnit,
        units.precipitationUnit
      )}`
    );
  },
  reverseGeocoding(latitude, longitude) {
    return instanceReverseGeocoding.get(`?latitude=${latitude}&longitude=${longitude}`);
  }
};
