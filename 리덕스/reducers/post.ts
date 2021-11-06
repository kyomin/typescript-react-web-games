import { produce } from 'immer';
import { ADD_POST, AddPostAction } from '../actions/post';

const initialState: string[] = [];

// 액션을 통해서 새로운 state로 반환해주는 함수
const postReducer = (
	prevState = initialState,
	action: AddPostAction
): string[] => {
	return produce(prevState, (draft) => {
		switch (action.type) {
			case ADD_POST: {
				draft.push(action.data);
				break;
			}
			default: {
				break;
			}
		}
	});
};

export default postReducer;
