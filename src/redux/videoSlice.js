import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currVideo: null,
    loading: true,
    error: false
};

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currVideo = action.payload;
        },
        fetchFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        like: (state, action) => {
            if (!state.currVideo.likes.includes(action.payload)) {
                state.currVideo.likes.push(action.payload);
                state.currVideo.dislikes.splice(
                    state.currVideo.dislikes.findIndex(
                        (p) => p === action.payload
                    ),
                    1
                );
            }
        },
        dislike: (state, action) => {
            if (!state.currVideo.dislikes.includes(action.payload)) {
                state.currVideo.dislikes.push(action.payload);
                state.currVideo.likes.splice(
                    state.currVideo.likes.findIndex(
                        (p) => p === action.payload
                    ),
                    1
                );
            }
        }
    }
});

export const { fetchStart, fetchSuccess, fetchFailure,like,dislike } = videoSlice.actions;

export default videoSlice.reducer;
