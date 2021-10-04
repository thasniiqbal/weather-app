import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { WeatherApp } from './app/weatherDetails/WeatherApp';
import { WeatherHistory } from './app/weatherDetails/WeatherHistory';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' component={WeatherApp} exact />
				<Route path='/weather-history/:country' component={WeatherHistory} />
			</Switch>
		</Router>
	);
}

export default App;
