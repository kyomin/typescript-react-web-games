import * as React from 'react';
import { useState, useCallback, useContext, memo } from 'react';
import { TableContext } from './MineSweeper';
import { startGame } from './action';

/*
  props를 받는 자식 컴포넌트는 보통 props 자체는 안 바뀌어도
  부모에서 state가 바뀌어 재렌더링될 때 강제적으로 자식도 바뀌는 것을 방지하기 위해
  memo로 감싸준다.
  그래야 props를 캐싱해둬서 여기서 사용하는 props가 바뀔 때만 렌더링하게 해준다.

  하지만 여기서는 따로 props를 받지 않으므로 memo로 감쌀 필요는 없다.
*/
const Form = memo(() => {
	const [row, setRow] = useState(10);
	const [cell, setCell] = useState(10);
	const [mine, setMine] = useState(20);
	const { dispatch } = useContext(TableContext);

	const onChangeRow = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setRow(Number(e.target.value));
	}, []);

	const onChangeCell = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setCell(Number(e.target.value));
	}, []);

	const onChangeMine = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setMine(Number(e.target.value));
	}, []);

	const onClickBtn = useCallback(() => {
		// 지뢰 개수가 배열 전체 칸의 개수보다 많은 예외 처리
		if (mine > row * cell) {
			alert('지뢰 개수가 칸의 개수보다 많을 수 없습니다!');
			return;
		}

		dispatch(startGame(row, cell, mine));
	}, [row, cell, mine]);

	return (
		<div>
			<input
				type='number'
				placeholder='세로'
				value={row}
				onChange={onChangeRow}
			/>
			<input
				type='number'
				placeholder='가로'
				value={cell}
				onChange={onChangeCell}
			/>
			<input
				type='number'
				placeholder='지뢰'
				value={mine}
				onChange={onChangeMine}
			/>
			<button onClick={onClickBtn}>시작</button>
		</div>
	);
});

export default Form;
