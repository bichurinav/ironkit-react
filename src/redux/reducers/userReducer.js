import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        form: false,
        user: {
            login: '',
            name: '',
            contacts: '',
            admin: false,
        },
    },
    reducers: {
        setAuth: (state, action) => {
            state.user = action.payload;
        },
        setForm: (state, action) => {
            state.form = action.payload;
        },
    },
});

export const { setAuth, setForm } = userSlice.actions;
export default userSlice.reducer;
