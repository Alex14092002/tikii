import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        newMessage: {},
    },

    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setNewMessage: (state, action) => {
            state.newMessage = action.payload;
        },
    },
});

export const { addMessage, setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
