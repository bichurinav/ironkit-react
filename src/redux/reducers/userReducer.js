import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		admin: true,
		login: 'Artem',
	},
	reducers: {
		setAdmin: (state, action) => {
			state.admin = action.payload;
		},
	},
});

export const { setAdmin } = userSlice.actions;
export default userSlice.reducer;
