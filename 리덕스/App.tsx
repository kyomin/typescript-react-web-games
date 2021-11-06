import * as React from 'react';
import { FC } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { login, logout, ThunkDispatch } from './actions/user';
import { RootState } from './reducers';
import { UserState } from './reducers/user';

const App: FC = () => {
	const { isLoggingIn, data } = useSelector<RootState, UserState>(
		(state) => state.user
	);
	const dispatch = useDispatch();

	const onLogin = () => {
		dispatch(
			login({
				id: 1,
				password: '1234',
			})
		);
	};

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<div>
			{isLoggingIn ? (
				<div>로그인 중</div>
			) : data ? (
				<div>{data.nickname}</div>
			) : (
				'로그인 해주세요.'
			)}
			{!data ? (
				<button onClick={onLogin}>로그인</button>
			) : (
				<button onClick={onLogout}>로그아웃</button>
			)}
		</div>
	);
};

// // 성격에 따라 Props 인터페이스를 나눠서 정의할 수 있다.
// interface StateToProps {
// 	user: UserState;
// }

// interface DispatchToProps {
// 	dispatchLogin: ({ id, password }: { id: number; password: string }) => void;
// 	dispatchLogout: () => void;
// }

// class App extends Component<StateToProps & DispatchToProps> {
// 	onLogin = () => {
// 		this.props.dispatchLogin({
// 			id: 1,
// 			password: '1234',
// 		});
// 	};

// 	onLogout = () => {
// 		this.props.dispatchLogout();
// 	};

// 	render() {
// 		const { user } = this.props;
// 		console.log(user);
// 		return (
// 			<div>
// 				{user.isLoggingIn ? (
// 					<div>로그인 중</div>
// 				) : user.data ? (
// 					<div>{user.data.nickname}</div>
// 				) : (
// 					'로그인 해주세요.'
// 				)}
// 				{!user.data ? (
// 					<button onClick={this.onLogin}>로그인</button>
// 				) : (
// 					<button onClick={this.onLogout}>로그아웃</button>
// 				)}
// 			</div>
// 		);
// 	}
// }

const mapStateToProps = (state: RootState) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch) => ({
	dispatchLogin: (data: { id: number; password: string }) =>
		dispatch(login(data)),
	dispatchLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
