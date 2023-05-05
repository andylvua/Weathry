import axios from "axios";

export const baseApiUrl = "https://geocoding-api.open-meteo.com/v1";
export const instance = axios.create({
  baseURL: baseApiUrl
});

export const weatherApi = {
  searchCity(cityName, count = 10) {
    return instance.get(`/search?name=${cityName}&count=${count}`);
  }
};
