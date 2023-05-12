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

const temperatureUnit = localStorage.getItem("temperatureUnit")
  ? localStorage.getItem("temperatureUnit")
  : "celsius";
const windSpeedUnit = localStorage.getItem("windSpeedUnit")
  ? localStorage.getItem("windSpeedUnit")
  : "km";
const precipitationUnit = localStorage.getItem("precipitationUnit")
  ? localStorage.getItem("precipitationUnit")
  : "millimeter";

const temperatureUnitString = `temperature_unit=${temperatureUnit}`;
const windSpeedUnitString = windSpeedUnit !== "km" ? `&windspeed_unit=${windSpeedUnit}` : "";
const precipitationUnitString =
  precipitationUnit !== "millimeter" ? `&precipitation_unit=${precipitationUnit}` : "";

const unitsString = temperatureUnitString + windSpeedUnitString + precipitationUnitString;

export const weatherApi = {
  searchCity(cityName, count = 10) {
    return instanceGeocoding.get(`/search?name=${cityName}&count=${count}`);
  },
  currentWeather(latitude, longitude) {
    return instanceOpenMeteo.get(
      `/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&${unitsString}`
    );
  },
  hourlyWeather(latitude, longitude) {
    return instanceOpenMeteo.get(
      `/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,visibility,apparent_temperature,windspeed_10m,pressure_msl,weathercode,windspeed_10m&${unitsString}`
    );
  },
  dailyWeather(latitude, longitude, timezone) {
    return instanceOpenMeteo.get(
      `/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,uv_index_max,windspeed_10m_max,weathercode&timezone=${timezone}&${unitsString}`
    );
  },
  reverseGeocoding(latitude, longitude) {
    return instanceReverseGeocoding.get(`?latitude=${latitude}&longitude=${longitude}`);
  }
};
