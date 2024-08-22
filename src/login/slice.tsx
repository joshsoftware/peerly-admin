import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TheStoreState {
  authToken: string;
}

const initialStateValue: TheStoreState = {
  authToken: "",
};

export const loginSlice = createSlice({
  name: "loginStore",
  initialState: initialStateValue,
  reducers: {
    getAuthToken: (state, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },
  },
});

export const { getAuthToken } = loginSlice.actions;

export default loginSlice.reducer;