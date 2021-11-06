import { addPost } from './post';

export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;
export const LOGOUT = 'LOGOUT' as const;

export interface LoginRequestAction {
	type: typeof LOGIN_REQUEST;
	data: { id: number; password: string };
}
export const loginRequest = (data: {
	id: number;
	password: string;
}): LoginRequestAction => {
	return {
		type: LOGIN_REQUEST,
		data,
	};
};

export interface LoginSuccessAction {
	type: typeof LOGIN_SUCCESS;
	data: { userId: number; nickname: string };
}
export const loginSuccess = (data: {
	userId: number;
	nickname: string;
}): LoginSuccessAction => {
	return {
		type: LOGIN_SUCCESS,
		data,
	};
};

export interface LoginFailureAction {
	type: typeof LOGIN_FAILURE;
	error: unknown;
}
export const loginFailure = (error: unknown): LoginFailureAction => {
	return {
		type: LOGIN_FAILURE,
		error,
	};
};

export interface ThunkDispatch {
	(thunkAction: ThunckAction): void;
	<A>(action: A): A;
	<TAction>(action: TAction | ThunckAction): TAction;
}
type ThunckAction = (dispatch: ThunkDispatch) => void;
export const login = (data: { id: number; password: string }): ThunckAction => {
	// 하나의 액션에 대한 dispatch를 수행하며 동시에 여러 액션의 dispatch를 수행한다. => thunk를 만든 이유
	return (dispatch) => {
		try {
			dispatch(loginRequest(data));
			setTimeout(() => {
				dispatch(
					loginSuccess({
						userId: 1,
						nickname: 'kyomin',
					})
				);
				dispatch(addPost(''));
			}, 1000);
		} catch (err) {
			dispatch(loginFailure(err));
		}
	};
};

export interface LogoutAction {
	type: typeof LOGOUT;
}
export const logout = () => {
	return {
		type: LOGOUT,
	};
};
