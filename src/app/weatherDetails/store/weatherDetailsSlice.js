import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import _ from 'lodash';

//get weather details
export const getWeatherDetails = (state) => async (dispatch) => {
	dispatch(setLoading(true));
	const response = await axios.get(
		`https://api.weatherapi.com/v1/forecast.json?key=${
			process.env.REACT_APP_API_KEY
		}&q=${state.country || state.city}`
	);
	response && dispatch(setLoading(false));
	return response.status
		? dispatch(getDetails(response.data))
		: dispatch(showErr({ flag: true, message: response.message }));
};

//set weather list
export const setList = (data) => async (dispatch, getState) => {
	const List = getState().weather.weatherList;
	return List.some((list) => list.location.name === data.location.name)
		? dispatch(
				showErr({
					message: 'Weather of this place has already been added!',
					flag: true,
				})
		  )
		: dispatch(updateList(_.isEmpty(List) ? [data] : [...List, data]));
};

//delete a record from weather list
export const deleteList = (country) => async (dispatch, getState) => {
	const List = getState().weather.weatherList;

	return dispatch(
		updateList(
			_.filter(List, function (o) {
				return o.location.country !== country;
			})
		)
	);
};

//get history of the country
export const getHistory = (country) => async (dispatch, getState) => {
	dispatch(setLoading(true));
	const response = await axios.get(
		`https://api.weatherapi.com/v1/history.json?key=${
			process.env.REACT_APP_API_KEY
		}&q=${country}&dt=${'2021-01-01'}`
	);
	response && dispatch(setLoading(false));

	response.status
		? dispatch(setHistory(response.data))
		: dispatch(showErr({ flag: true, message: response.message }));
};

const weatherSlice = createSlice({
	name: 'weather',
	initialState: { isLoading: false, details: {}, weatherList: [] },
	reducers: {
		getDetails: (state, action) => {
			state.details = action.payload;
		},
		showErr: (state, action) => {
			state.isError = action.payload.flag;
			state.errMessage = action.payload.message;
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		updateList: (state, action) => {
			state.weatherList = action.payload;
		},
		setHistory: (state, action) => {
			state.history = action.payload;
		},
	},
});
export const { getDetails, showErr, setLoading, updateList, setHistory } =
	weatherSlice.actions;

export default weatherSlice.reducer;
