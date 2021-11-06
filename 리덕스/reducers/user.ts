const initialState = {
	isLoggingIn: false,
	data: null,
};

// 액션을 통해서 새로운 state로 반환해주는 함수
const userReducer = (prevState, action) => {
	switch (action.type) {
		default: {
			return prevState;
		}
	}
};

export default userReducer;
