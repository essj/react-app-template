import * as React from 'react';
import {
	Redirect,
	Route,
	Router as ReactRouter,
	Switch,
} from 'react-router';

import './services/inversify';

import App from './app';
import {
	Container,
	HistoryService,
	Service,
} from './services';

const history = Container.get<HistoryService>(Service.History);

class Router extends React.PureComponent {
	public render() {
		return (
			<ReactRouter history={history.history}>
				<Switch>
					<Route path="/" component={App} />
					<Route component={() => <Redirect to="/" />} />
				</Switch>
			</ReactRouter>
		);
	}
}

export default Router;
