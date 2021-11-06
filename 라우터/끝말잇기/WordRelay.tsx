import * as React from 'react';
import { useState, useRef, useCallback } from 'react';

const WordRelay = () => {
	const [word, setWord] = useState('교민');
	const [value, setValue] = useState('');
	const [result, setResult] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);

	const onSubmitForm = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const input = inputRef.current;
			
      if (word[word.length - 1] === value[0]) {
				setResult('딩동댕');
				setWord(value);
				setValue('');
			} else {
				setResult('땡');
				setValue('');
			}

			if (input) {
				input.focus();
			}
		},
		[value]
	);

	const onChangeInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setValue(e.target.value);
		},
		[]
	);

	return (
		<>
			<div>{word}</div>
			<form onSubmit={onSubmitForm}>
				<label htmlFor='wordInput'>글자를 입력하세요.</label>
				<input
					id='wordInput'
					className='wordInput'
					ref={inputRef}
					value={value}
					onChange={onChangeInput}
				/>
				<button>클릭!!!</button>
			</form>
			<div>{result}</div>
		</>
	);
};

export default WordRelay;
