import { configureStore } from '@reduxjs/toolkit';

import { loginSlice } from './login/apiSlice.tsx';
import { appreciationSlice } from './appreciations/apiSlice.tsx';


export const store = configureStore({

  reducer: {

    [loginSlice.reducerPath]: loginSlice.reducer,
    [appreciationSlice.reducerPath]: appreciationSlice.reducer,

  },

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(loginSlice.middleware).concat(appreciationSlice.middleware),

});