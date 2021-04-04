import { createSlice } from '@reduxjs/toolkit';

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        cards: [],
        menu: [],
    },
    reducers: {
        setCards: (state, action) => {
            state.cards = action.payload;
        },
        setMenu: (state, action) => {
            state.menu = action.payload;
        },
    },
});

export const { setCards, setMenu } = catalogSlice.actions;
export default catalogSlice.reducer;
