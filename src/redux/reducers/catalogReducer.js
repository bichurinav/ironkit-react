import { createSlice } from '@reduxjs/toolkit';

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        cards: [],
        count: null,
        menu: [],
    },
    reducers: {
        setCards: (state, action) => {
            state.cards = action.payload.components;
            state.count = action.payload.count;
        },
        setMenu: (state, action) => {
            state.menu = action.payload;
        },
    },
});

export const { setCards, setMenu } = catalogSlice.actions;
export default catalogSlice.reducer;
