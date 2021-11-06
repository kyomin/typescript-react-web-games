import { ADD_POST, AddPostAction } from '../actions/post';

const initialState: string[] = [];

// 액션을 통해서 새로운 state로 반환해주는 함수
const postReducer = (
	prevState = initialState,
	action: AddPostAction
): string[] => {
	switch (action.type) {
		case ADD_POST: {
			return [...prevState, action.data];
		}
		default: {
			return prevState;
		}
	}
};

export default postReducer;
