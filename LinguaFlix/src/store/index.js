import 'bootstrap/dist/css/bootstrap.min.css';
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
    }
});

export const userActions = userSlice.actions;

export default store;
