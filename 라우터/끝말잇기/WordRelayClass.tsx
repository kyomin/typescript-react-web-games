import * as React from 'react';
import { Component } from 'react';

interface State {
	word: string;
	value: string;
	result: string;
}

class WordRelay extends Component<{}, State> {
	state = {
		word: '교민',
		value: '',
		result: '',
	};

	onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const input = this.input;
		
		if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
			this.setState({
				result: '딩동댕',
				word: this.state.value,
				value: '',
			});
		} else {
			this.setState({
				result: '땡',
				value: '',
			});
		}

		if (input) {
			input.focus();
		}
	};

	onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ value: e.target.value });
	};

	input: HTMLInputElement | null = null;
	onRefInput = (c: HTMLInputElement) => {
		this.input = c;
	};

	render() {
		return (
			<>
				<div>{this.state.word}</div>
				<form onSubmit={this.onSubmitForm}>
					<label htmlFor='wordInput'>글자를 입력하세요.</label>
					<input
						id='wordInput'
						className='wordInput'
						ref={this.onRefInput}
						value={this.state.value}
						onChange={this.onChangeInput}
					/>
					<button>클릭!!!</button>
				</form>
				<div>{this.state.result}</div>
			</>
		);
	}
}

export default WordRelay;
