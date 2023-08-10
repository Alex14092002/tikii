import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './reducer/messageSlice';
import userSlice from './reducer/userSlice';
export const store = configureStore({
    reducer: {
        message: messageSlice,
        user: userSlice
    },
});
