import * as React from 'react';
import { Component } from 'react';

interface State {
	first: number;
	second: number;
	value: string;
	result: string;
}

/* 
  클래스 컴포넌트에서는 제네릭으로 다음과 같이 받을 수 있다.
  첫 번째는 props에 대한 기술이고,
  두 번째는 state 타입에 대한 기술이다.
*/
class Gugudan extends Component<{}, State> {
	state = {
		first: Math.ceil(Math.random() * 9),
		second: Math.ceil(Math.random() * 9),
		value: '',
		result: '',
	};

	onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (parseInt(this.state.value) === this.state.first * this.state.second) {
			// 다음과 같이 이전 상태 값을 이용해 새로운 state 상태 값을 리턴하도록 함수를 정의할 수도 있다.
			this.setState((prevState) => {
				return {
					result: '정답: ' + prevState.value,
					first: Math.ceil(Math.random() * 9),
					second: Math.ceil(Math.random() * 9),
					value: '',
				};
			});
		} else {
			this.setState({
				result: '땡',
				value: '',
			});
		}

		if (this.input) {
			this.input.focus();
		}
	};

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			value: e.target.value,
		});
	};

	input: HTMLInputElement | null = null;
	onRefInput = (c: HTMLInputElement) => {
		this.input = c;
	};

	render() {
		console.log('class component render');
		return (
			<>
				<div>
					{this.state.first} 곱하기 {this.state.second}는?
				</div>
				<form onSubmit={this.onSubmit}>
					<input
						ref={this.onRefInput}
						type='number'
						value={this.state.value}
						onChange={this.onChange}
					/>
					<button>입력</button>
				</form>
				<div>{this.state.result}</div>
			</>
		);
	}
}

export default Gugudan;
