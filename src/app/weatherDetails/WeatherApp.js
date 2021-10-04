import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@mui/styles';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';

import { getWeatherDetails, showErr } from './store/weatherDetailsSlice.js';
import CountryList from '../country.json';
import WeatherCard from './WeatherCard';
import { Header } from './Header';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100%',
		position: 'relative',
		flex: '1 0 auto',
		height: 'auto',
		backgroundColor: 'rgb(246, 247, 249)',
		padding: 50,
	},
	inputHeader: {
		width: '50%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignSelf: 'center',
		marginTop: 60,
	},
	content: {
		display: 'flex',
		flexWrap: 'wrap',
		paddingVertical: 24,
	},
}));

export const WeatherApp = () => {
	const classes = useStyles();
	const dispatch = useDispatch();

	const { isLoading, isError, errMessage } = useSelector(
		({ weather }) => weather
	);

	const [state, setState] = useState({
		country: '',
		city: '',
	});

	const handleChange = (event) => {
		const value = event.target.value;
		setState({
			...state,
			[event.target.name]: value,
		});
	};

	return (
		<div className={classes.root}>
			<Header />
			<div className={classes.inputHeader}>
				<Box sx={{ minWidth: 250 }}>
					<FormControl fullWidth>
						<InputLabel>Country</InputLabel>
						<Select
							name='country'
							value={state.country}
							label='Country'
							onChange={handleChange}>
							<MenuItem value=''>None</MenuItem>
							{CountryList.map((item) => {
								return (
									<MenuItem value={item.name} key={item.name}>
										{item.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</Box>
				<TextField
					name='city'
					label='City'
					variant='outlined'
					onChange={handleChange}
					value={state.city}
				/>
				<Button
					variant='contained'
					color='inherit'
					disabled={!state.city && !state.country}
					onClick={() => dispatch(getWeatherDetails(state))}
					startIcon={<AddIcon />}>
					Add Weather
				</Button>
			</div>
			<div className={classes.content}>
				<WeatherCard />
			</div>

			<div className='flex flex-col items-center justify-center p-12'>
				{isLoading && (
					<Typography className='text-20 mb-16' color='textSecondary'>
						Loading...
					</Typography>
				)}
				{isError && (
					<Snackbar
						anchorOrigin={{
							vertical: 'center',
							horizontal: 'center',
						}}
						open={isError}
						autoHideDuration={6000}
						onClose={() => dispatch(showErr({ flag: false, message: '' }))}
						message={errMessage}
					/>
				)}
			</div>
		</div>
	);
};
