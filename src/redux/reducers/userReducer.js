import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        form: false,
        user: {
            login: '',
            admin: false,
        },
    },
    reducers: {
        setAuth: (state, action) => {
            state.user.login = action.payload.login;
            state.user.admin = action.payload.admin;
        },
        setForm: (state, action) => {
            state.form = action.payload;
        },
    },
});

export const { setAuth, setForm } = userSlice.actions;
export default userSlice.reducer;
