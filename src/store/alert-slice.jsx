import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "notes",
  initialState: { showAlert: false, alertMessage: "" },
  reducers: {
    showAlert: (state, action) => {
      state.showAlert = true;
      state.alertMessage = action.payload;
    },
    hideAlert: (state) => {
      state.showAlert = false;
      state.alertMessage = "";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
