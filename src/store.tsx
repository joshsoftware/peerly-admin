import { configureStore } from '@reduxjs/toolkit';
import { loginApiSlice } from './login/apiSlice.tsx';
import loginReducer from './login/slice';


export const store = configureStore({

  reducer: {

    loginStore: loginReducer,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,

  },

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(loginApiSlice.middleware),

});