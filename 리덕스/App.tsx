import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
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

const mapStateToProps = (state) => ({
	user: state.user,
	posts: state.posts,
});

const mapDispatchToProps = (dispatch) => ({
	dispatchLogin: (data) => dispatch(login(data)),
	dispatchLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
