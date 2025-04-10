import { createSlice } from '@reduxjs/toolkit';
import { User } from '../lib/types';

interface UserState {
    loggedInUser: User | null;
}

const initialState: UserState = {
    loggedInUser: null,
};


const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setLoggedInUser: (state, action) => {
            state.loggedInUser = action.payload;
            console.log(state.loggedInUser);
        }
    }
});

export const { setLoggedInUser } = userSlice.actions;
export const userReducer = userSlice.reducer;