import * as React from 'react';
import { useCallback, FC } from 'react';
import { useLocalStore, useObserver } from 'mobx-react';
import { action } from 'mobx';
import { userStore, postStore } from './store';

interface LocalStore {
	name: string;
	password: string;
	onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const App: FC = () => {
	const state = useLocalStore<LocalStore>(() => ({
		name: '',
		password: '',
		onChangeName: action(function (
			this: LocalStore,
			e: React.ChangeEvent<HTMLInputElement>
		) {
			this.name = e.target.value;
		}),
		onChangePassword: action(function (
			this: LocalStore,
			e: React.ChangeEvent<HTMLInputElement>
		) {
			this.password = e.target.value;
		}),
	}));

	const onLogin = useCallback(() => {
		userStore.login({
			nickname: state.name,
			password: state.password,
		});
	}, [state.name, state.password]);

	const onLogout = useCallback(() => {
		userStore.logout();
	}, []);

	return useObserver(() => (
		<div>
			{userStore.isLoggingIn ? (
				<div>로그인 중</div>
			) : userStore.data ? (
				<div>{userStore.data.nickname}</div>
			) : (
				'로그인 해주세요.'
			)}
			{!userStore.data ? (
				<button onClick={onLogin}>로그인</button>
			) : (
				<button onClick={onLogout}>로그아웃</button>
			)}
			{!userStore.data ? (
				<div>
					<label htmlFor='name'>이름</label>
					<input id='name' value={state.name} onChange={state.onChangeName} />

					<label htmlFor='password'>비밀번호</label>
					<input
						id='password'
						value={state.password}
						onChange={state.onChangePassword}
					/>
				</div>
			) : (
				''
			)}
		</div>
	));
};

export default App;
