import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currUser: null,
    loading: true,
    error: false
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currUser = action.payload;
        },
        loginFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currUser = null;
            state.loading = true;
            state.error = false;
        },
        subscription: (state, action) => {
            if (state.currUser.user.subscibedUsers.includes(action.payload)) {
                state.currUser.user.subscibedUsers.splice(
                    state.currUser.user.subscibedUsers.findIndex(
                        (channelId) => channelId === action.payload
                    ),
                    1
                );
            } else {
                state.currUser.user.subscibedUsers.push(action.payload);
            }
        }
    }
});

export const { loginStart, loginSuccess, loginFailure, logout, subscription } =
    userSlice.actions;

export default userSlice.reducer;
