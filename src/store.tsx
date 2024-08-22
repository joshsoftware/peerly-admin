import { configureStore } from '@reduxjs/toolkit';
import { loginApiSlice } from './login/apiSlice.tsx';
import loginReducer from './login/slice';
import sidebarReducer  from './permanentSidebar/slice.tsx';
import { appreciationSlice } from './appreciations/apiSlice';
import { configSlice } from './config/apiSlice.tsx';
import { badgesSlice } from './badges/apiSlice.tsx';


export const store = configureStore({

  reducer: {

    loginStore: loginReducer,
    sidebarStore: sidebarReducer,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,
    [appreciationSlice.reducerPath]: appreciationSlice.reducer,
    [configSlice.reducerPath]: configSlice.reducer,
    [badgesSlice.reducerPath]: badgesSlice.reducer,

  },

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(loginApiSlice.middleware).concat(appreciationSlice.middleware).concat(configSlice.middleware).concat(badgesSlice.middleware),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;