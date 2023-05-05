import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false
};

export const searchModalSlice = createSlice({
  name: "search-modal",
  initialState,

  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    }
  }
});

export const { setIsOpen } = searchModalSlice.actions;
export const searchModalReducer = searchModalSlice.reducer;
