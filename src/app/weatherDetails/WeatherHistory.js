import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { Header } from './Header';
import { getHistory } from './store/weatherDetailsSlice';

export const WeatherHistory = () => {
	const { country } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getHistory(country));
		// eslint-disable-next-line
	}, []);

	return (
		<div>
			<Header />
		</div>
	);
};
