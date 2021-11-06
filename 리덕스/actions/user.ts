export const LOGIN_REQUEST = 'LOGIN_REQUEST' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;
export const LOGIN_FAILURE = 'LOGIN_FAILURE' as const;
export const LOGOUT = 'LOGOUT' as const;

export interface LoginRequestAction {
	type: typeof LOGIN_REQUEST;
	data: { id: string; password: string };
}

export interface LoginSuccessAction {
	type: typeof LOGIN_SUCCESS;
	data: { userId: string; nickname: string };
}

export interface LoginFailureAction {
	type: typeof LOGIN_FAILURE;
	error: Error;
}

export const login = (data: { id: string; password: string }) => {};

export interface LogoutAction {
	type: typeof LOGOUT;
}

export const logout = () => {
	return {
		type: LOGOUT,
	};
};
