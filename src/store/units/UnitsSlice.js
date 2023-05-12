import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temperatureUnit: localStorage.getItem("temperatureUnit"),
  windSpeedUnit: localStorage.getItem("windSpeedUnit"),
  precipitationUnit: localStorage.getItem("precipitationUnit")
};

export const unitsSlice = createSlice({
  name: "units",
  initialState,

  reducers: {
    setTemperatureUnit(state, action) {
      state.temperatureUnit = action.payload;
    },
    setWindSpeedUnit(state, action) {
      state.windSpeedUnit = action.payload;
    },
    setPrecipitationUnit(state, action) {
      state.precipitationUnit = action.payload;
    }
  }
});

export const { setTemperatureUnit, setWindSpeedUnit, setPrecipitationUnit } = unitsSlice.actions;
export const unitsReducer = unitsSlice.reducer;
