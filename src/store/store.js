import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchModalReducer } from "./search-modal/SearchModalSlice";

export const store = configureStore({
  reducer: combineReducers({
    searchModal: searchModalReducer
  })
});
