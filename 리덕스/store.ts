import {
	createStore,
	MiddlewareAPI,
	Dispatch,
	AnyAction,
	applyMiddleware,
	compose,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';

const initialState = {
	user: {
		isLoggingIn: false,
		data: null,
	},
	posts: [],
};

const firstMiddleware =
	(store: MiddlewareAPI) =>
	(next: Dispatch<AnyAction>) =>
	(action: AnyAction) => {
		console.log('logging action : ', action);
		next(action);
	};

const thunkMiddleware =
	(store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
		if (typeof action === 'function') {
			// 비동기
			return action(store.dispatch, store.getState);
		}

		return next(action); // 동기
	};

// 미들웨어 장착!
const enhancer =
	process.env.NODE_ENV === 'production'
		? compose(applyMiddleware(firstMiddleware, thunkMiddleware))
		: composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware));

const store = createStore(reducer, initialState, enhancer);

export default store;
