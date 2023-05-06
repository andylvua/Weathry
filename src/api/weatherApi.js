import axios from "axios";

export const instanceGeocoding = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1"
});
export const instanceOpenMeteo = axios.create({
  baseURL: "https://api.open-meteo.com/v1"
});

export const weatherApi = {
  searchCity(cityName, count = 10) {
    return instanceGeocoding.get(`/search?name=${cityName}&count=${count}`);
  },
  currentWeather(latitude, longitude) {
    return instanceOpenMeteo.get(
      `/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
  }
};
