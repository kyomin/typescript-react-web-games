import { combineReducers } from 'redux';
import userReducer from './user';
import postReducer from './post';

// 리덕스의 state 타입은 이것으로 봐도 무방하다.
const reducer = combineReducers({
	user: userReducer,
	posts: postReducer,
});
export type RootState = ReturnType<typeof reducer>; // 각 함수의 리턴 타입을 뽑아올 때

export default reducer;
