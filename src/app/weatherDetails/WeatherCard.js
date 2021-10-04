import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import _ from 'lodash';

import { setList, deleteList } from './store/weatherDetailsSlice';

export default function WeatherCard() {
	const dispatch = useDispatch();
	const { weatherList, details } = useSelector(({ weather }) => weather);

	useEffect(() => {
		!_.isEmpty(details) && dispatch(setList(details));
		// eslint-disable-next-line
	}, [details]);

	if (_.isEmpty(details)) {
		return (
			<div className='flex flex-col flex-1 items-center justify-center p-16'>
				<div className='max-w-512 text-center'>
					<Typography variant='h5' color='textSecondary' className='mb-16'>
						No Data Found !
					</Typography>
				</div>
			</div>
		);
	}
	return (
		<div className='flex flex-wrap py-24'>
			{weatherList &&
				weatherList.map((item, index) => {
					return (
						<div className='w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16' key={index}>
							<Card className='flex flex-col h-256 rounded-8'>
								<CardMedia
									component='img'
									alt='green iguana'
									height='140'
									image={
										item.current.temp_c < 20
											? 'assets/images/winter.jpg'
											: item.current.temp_c > 20 && item.current.temp_c < 30
											? 'assets/images/autumn.jpg'
											: 'assets/images/summer.jpg'
									}
								/>
								<CardContent className='flex flex-col flex-auto items-center justify-center'>
									<Typography className='text-center text-16 font-400'>
										Region - {item.location.name}
									</Typography>
									<Typography className='text-center text-16 font-400 mt-2'>
										Country - {item.location.country}
									</Typography>
									<Typography
										className='text-center text-13 font-600 mt-4'
										color='textSecondary'>
										{item.current.temp_c} deg celcius
									</Typography>
								</CardContent>
								<Divider />
								<CardActions className='justify-center '>
									<Button
										to={`/weather-history/${item.location.country}`}
										component={Link}
										className='justify-start px-32'
										color='info'>
										More
									</Button>
									<IconButton
										color='default'
										component='span'
										onClick={() => dispatch(deleteList(item.location.country))}>
										<DeleteIcon />
									</IconButton>
								</CardActions>
							</Card>
						</div>
					);
				})}
		</div>
	);
}
