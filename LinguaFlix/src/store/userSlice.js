import { createSlice } from "@reduxjs/toolkit";
import { DB_URL } from "./firebase";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        name: '',
        email: '',
        userId: '',
        movies: [],
        books: []
    },
    reducers: {
        setActiveUser(state, action) {
            state.isLoggedIn = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.movies = action.payload.movies;
            state.books = action.payload.books;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.name = '';
            state.email = '';
            state.userId = '';
            state.movies = '';
            state.books = '';
        }
    }
});
export const getUserFromDB = (userId) => {
    return async (dispatch) => {
        const sendRequest = async () => {
            const response = await fetch(DB_URL + '/users/' + userId + '.json');

            if (!response.ok) {
                throw new Error('Cant get user from DB');
            }

            const data = await response.json();
            return data;
        }

        try {
            const userFromDB = await sendRequest();
            dispatch(userSlice.actions.setActiveUser({
                name: userFromDB.name,
                email: userFromDB.email,
                userId: userId,
                movies: userFromDB.movies || [],
                books: userFromDB.books || []
            }));
        } catch (error) {
            console.log(error);
        }
    }
}

export const saveUserToFirebase = (user) => {
    return async (dispatch) => {
        const userRef = database.ref(`users/${user.userId}`);
        userRef.set(user);

        dispatch(userSlice.actions.setActiveUser(user));
    };
}

export const permissionsSlice = createSlice({
    name: 'permissions',
    initialState: {
        role: 'guest', // Роль "гостя" за замовчуванням
    },
    reducers: {
        setRole(state, action) {
            state.role = action.payload;
        },
    },
});
// export const { setRole } = permissionsSlice.actions;
// export default permissionsSlice.reducer;