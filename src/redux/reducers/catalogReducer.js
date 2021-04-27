import { createSlice } from '@reduxjs/toolkit';

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: {
        cards: [],
        count: null,
        menu: [],
        menuActive: false,
    },
    reducers: {
        setCards: (state, action) => {
            state.cards = action.payload.components;
            state.count = action.payload.count;
        },
        setMenu: (state, action) => {
            state.menu = action.payload;
        },
        setMenuActive: (state, action) => {
            state.menuActive = !state.menuActive;
        },
    },
});

export const { setCards, setMenu, setMenuActive } = catalogSlice.actions;
export default catalogSlice.reducer;
