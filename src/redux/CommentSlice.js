import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currComments: []
};

export const CommentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        initComments: (state, action) => {
            state.currComments = action.payload;
        },
        addComments: (state, action) => {
            if (action.payload != '') {
                state.currComments.push(action.payload);
                state.currComments = state.currComments.reverse();
            }
        }
    }
});

export const { addComments, initComments } = CommentSlice.actions;

export default CommentSlice.reducer;
