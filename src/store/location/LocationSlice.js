import { createSlice } from "@reduxjs/toolkit";

// todo make from local storage at first time
const initialState = {
  cityName: "Vordernberg",
  countryName: "Austria",
  countryCode: "AT",
  latitude: 47.49,
  longitude: 14.99
};

export const locationSlice = createSlice({
  name: "location",
  initialState,

  reducers: {
    setCityName(state, action) {
      state.cityName = action.payload;
    },
    setCountryName(state, action) {
      state.countryName = action.payload;
    },
    setCountryCode(state, action) {
      state.countryCode = action.payload;
    },
    setLatitude(state, action) {
      state.latitude = action.payload;
    },
    setLongitude(state, action) {
      state.longitude = action.payload;
    }
  }
});

export const { setCityName, setCountryName, setCountryCode, setLatitude, setLongitude } =
  locationSlice.actions;
export const locationReducer = locationSlice.reducer;
