import { createSlice } from '@reduxjs/toolkit';

export const builderSlice = createSlice({
    name: 'builder',
    initialState: {
        count: 0,
    },
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        },
    },
});

export const { setCount } = builderSlice.actions;
export default builderSlice.reducer;
