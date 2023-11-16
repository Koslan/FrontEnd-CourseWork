import { createSlice } from "@reduxjs/toolkit";
import { getDatabase, ref, child, push, update } from "firebase/database";
import { DB_URL } from "./firebase";

export const writeNewPost = (uid, username, useremail) => {
    const db = getDatabase();
  
    // A post entry.
    const postData = {
      name: username,
      email: useremail,
      userId: uid,
    };
  
    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return update(ref(db), updates);
  }

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        name: '',
        email: '',
        userId: '',
        movies: []
    },
    reducers: {
        setActiveUser(state, action) {
            state.isLoggedIn = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.movies = action.payload.movies;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.name = '';
            state.email = '';
            state.userId = '';
            state.movies = '';
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
                isLoggedIn: true
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