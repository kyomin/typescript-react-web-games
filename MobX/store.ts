import { observable, action } from 'mobx';

/* 
  observable로 store 데이터의 변경을 감지해 알아서 리렌더링 처리를 해주고,
  데이터를 변경하는 함수는 action으로 감싸서 안전하게 변경시킨다.
*/
const userStore = observable({
	isLoggingIn: false,
	data: null,
	login: action((data) => {
		userStore.isLoggingIn = true;
		setTimeout(
			action(() => {
				userStore.data = data;
				userStore.isLoggingIn = false;
				postStore.addPost('hello');
			}),
			2000
		);
	}),
	logout: action(() => {
		userStore.data = null;
	}),
});

const postStore = observable({
	data: [],
	addPost: action((data) => {
		postStore.data.push(data);
	}),
});

export { userStore, postStore };
