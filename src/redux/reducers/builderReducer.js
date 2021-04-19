import { createSlice } from '@reduxjs/toolkit';

export const builderSlice = createSlice({
    name: 'builder',
    initialState: {
        count: 0,
        cards: [],
        activeMore: false,
    },
    reducers: {
        setCount: (state, action) => {
            state.count = action.payload;
        },
        setCards: (state, action) => {
            state.cards = action.payload;
        },
        setActiveMore: (state, action) => {
            state.activeMore = action.payload;
        },
    },
});

export const { setCount, setCards, setActiveMore } = builderSlice.actions;
export default builderSlice.reducer;
