import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SidebarStoreState {
  route: string;
}

const initialStateValue: SidebarStoreState = {
  route: "/",
};

export const sidebarSlice = createSlice({
  name: "sidebarStore",
  initialState: initialStateValue,
  reducers: {
    getRoute: (state, action: PayloadAction<string>) => {
      state.route = action.payload;
    },
  },
});

export const { getRoute } = sidebarSlice.actions;

export default sidebarSlice.reducer;