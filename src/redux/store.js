import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './reducers/catalogReducer';
import userReducer from './reducers/userReducer';

export const store = configureStore({
	reducer: {
		catalog: catalogReducer,
		user: userReducer,
	},
});
