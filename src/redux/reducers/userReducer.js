import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        admin: false,
        auth: false,
        form: false,
        login: null,
    },
    reducers: {
        setAdmin: (state, action) => {
            state.admin = action.payload;
        },
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
        setForm: (state, action) => {
            state.form = action.payload;
        },
    },
});

export const { setAdmin, setForm } = userSlice.actions;
export default userSlice.reducer;
