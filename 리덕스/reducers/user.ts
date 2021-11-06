import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT,
	LoginRequestAction,
	LoginSuccessAction,
	LoginFailureAction,
	LogoutAction,
} from '../actions/user';

export interface UserState {
	isLoggingIn: boolean;
	data: {
		nickname: string;
	} | null;
}

const initialState: UserState = {
	isLoggingIn: false,
	data: null,
};

type UserReducerActions =
	| LoginRequestAction
	| LoginSuccessAction
	| LoginFailureAction
	| LogoutAction;

// 액션을 통해서 새로운 state로 반환해주는 함수
const userReducer = (prevState = initialState, action: UserReducerActions) => {
	switch (action.type) {
		case LOGIN_REQUEST: {
		}
		case LOGIN_SUCCESS: {
		}
		case LOGIN_FAILURE: {
		}
		case LOGOUT: {
			return {
				...prevState,
				data: null,
			};
		}
		default: {
			return prevState;
		}
	}
};

export default userReducer;
