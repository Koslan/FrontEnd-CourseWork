import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        name: '',
        email: '',
        userId: '',
    },
    reducers: {
        setActiveUser(state, action) {
            state.isLoggedIn = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.name = '';
            state.email = '';
            state.userId = '';
        }
    }
});