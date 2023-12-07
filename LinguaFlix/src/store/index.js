import 'bootstrap/dist/css/bootstrap.min.css';
import { configureStore } from "@reduxjs/toolkit";
import { permissionsSlice, userSlice } from "./userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        permissions: permissionsSlice.reducer,
    }
});

export const userActions = userSlice.actions;

export default store;