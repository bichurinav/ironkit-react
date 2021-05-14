import { createSlice } from '@reduxjs/toolkit';

export const builderSlice = createSlice({
    name: 'builder',
    initialState: {
        count: 0,
        cards: [],
        ram: {
            count: 1,
            value: null,
            price: 0,
        },
        totalPrice: 0,
        list: [],
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
        setRAM: (state, action) => {
            state.ram = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        setList: (state, action) => {
            state.list = action.payload;
        },
    },
});

export const {
    setCount,
    setCards,
    setActiveMore,
    setTotalPrice,
    setRAM,
    setList,
} = builderSlice.actions;
export default builderSlice.reducer;
