import { configureStore } from '@reduxjs/toolkit';

import { loginSlice } from './login/apiSlice.tsx';


export const store = configureStore({

  reducer: {

    [loginSlice.reducerPath]: loginSlice.reducer,

  },

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(loginSlice.middleware),

});