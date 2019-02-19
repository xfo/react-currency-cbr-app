import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';
import './style.css';

const getReduxDevTools = () => {
	if (typeof window !== 'undefined') {
		return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
	}

	return compose;
};

const composeEnhancers = getReduxDevTools() || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware( thunk )));


const rootElement = document.getElementById('root');
ReactDOM.render(<Provider store={store}><App /></Provider>, rootElement);