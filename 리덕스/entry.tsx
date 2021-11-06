import * as React from 'react';
import * as ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import store from './store';
import App from './App';

const Hot = hot(App); // HOC

ReactDom.render(
  /*
    Provider 아래에 있는 모든 컴포넌트에서
    리덕스 store에 접근할 수 있게 된다.
  */
	<Provider store={store}>
		<Hot />
	</Provider>,
	document.querySelector('#root')
);
