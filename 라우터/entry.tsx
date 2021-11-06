import * as React from 'react';
import * as ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import Games from './Games';
const Hot = hot(Games); // HOC

ReactDom.render(<Hot />, document.querySelector('#root'));
