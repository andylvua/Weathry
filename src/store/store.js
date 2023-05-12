import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchModalReducer } from "./search-modal/SearchModalSlice";
import { locationReducer } from "./location/LocationSlice";
import { unitsReducer } from "./units/UnitsSlice";

export const store = configureStore({
  reducer: combineReducers({
    searchModal: searchModalReducer,
    location: locationReducer,
    units: unitsReducer
  })
});
