import { configureStore } from '@reduxjs/toolkit';

import { loginApiSlice } from './login/apiSlice.tsx';
import { appreciationSlice } from './appreciations/apiSlice';
import loginReducer from './login/slice';
import sidebarReducer  from './sideBar/slice.tsx';


export const store = configureStore({

  reducer: {

    loginStore: loginReducer,
    sidebarStore: sidebarReducer,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,
    [appreciationSlice.reducerPath]: appreciationSlice.reducer,

  },

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(loginApiSlice.middleware).concat(appreciationSlice.middleware)

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;