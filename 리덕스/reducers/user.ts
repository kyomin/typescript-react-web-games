import { produce } from 'immer';
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
	return produce(prevState, (draft) => {
		switch (action.type) {
			case LOGIN_REQUEST: {
				draft.data = null;
				draft.isLoggingIn = true;
				break;
			}
			case LOGIN_SUCCESS: {
				draft.data = action.data;
				draft.isLoggingIn = false;
				break;
			}
			case LOGIN_FAILURE: {
				draft.data = null;
				draft.isLoggingIn = false;
				break;
			}
			case LOGOUT: {
				draft.data = null;
				break;
			}
			default: {
				break;
			}
		}
	});
};

export default userReducer;
