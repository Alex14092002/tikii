import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: null,
        token: ""
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
});

export const { setUser, setToken } = userSlice.actions;

export default userSlice.reducer;
