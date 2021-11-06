import * as React from 'react';
import { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { login, logout } from './actions/user';
import { RootState } from './reducers';
import { UserState } from './reducers/user';

// 성격에 따라 Props 인터페이스를 나눠서 정의할 수 있다.
interface StateToProps {
	user: UserState;
}

interface DispatchToProps {
	dispatchLogin: ({ id, password }: { id: string; password: string }) => void;
	dispatchLogout: () => void;
}

class App extends Component<StateToProps & DispatchToProps> {
	onLogin = () => {
		this.props.dispatchLogin({
			id: 'kyomin',
			password: '1234',
		});
	};

	onLogout = () => {
		this.props.dispatchLogout();
	};

	render() {
		const { user } = this.props;
		return (
			<div>
				{user.isLoggingIn ? (
					<div>로그인 중</div>
				) : user.data ? (
					<div>{user.data.nickname}</div>
				) : (
					'로그인 해주세요.'
				)}
				{!user.data ? (
					<button onClick={this.onLogin}>로그인</button>
				) : (
					<button onClick={this.onLogout}>로그아웃</button>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state: RootState) => ({
	user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	dispatchLogin: (data: { id: string; password: string }) =>
		dispatch(login(data)),
	dispatchLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
