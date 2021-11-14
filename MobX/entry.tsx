import * as React from 'react';
import * as ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import App from './App';
import { StoreProvider } from './Context';

const Hot = hot(App); // HOC

ReactDom.render(
	<StoreProvider>
		<Hot />
	</StoreProvider>,
	document.querySelector('#root')
);
