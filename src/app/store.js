import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherDetails/store/weatherDetailsSlice';

export const store = configureStore({
	reducer: {
		weather: weatherReducer,
	},
});
