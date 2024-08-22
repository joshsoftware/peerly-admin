import { configureStore } from '@reduxjs/toolkit';
import { loginApiSlice } from './login/apiSlice.tsx';
import loginReducer from './login/slice';
import sidebarReducer  from './permanentSidebar/slice.tsx';


export const store = configureStore({

  reducer: {

    loginStore: loginReducer,
    sidebarStore: sidebarReducer,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,

  },

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(loginApiSlice.middleware),

});