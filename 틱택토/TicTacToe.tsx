import * as React from 'react';
import { useEffect, useReducer, useCallback, Reducer } from 'react';
import Table from './Table';

interface ReducerState {
	winner: 'O' | 'X' | '';
	turn: 'O' | 'X';
	tableData: string[][];
	recentCell: [number, number]; // 배열 타입과 개수를 제한하는 '튜플' 타입
}

const initialState: ReducerState = {
	winner: '',
	turn: 'O',
	tableData: [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	],
	recentCell: [-1, -1],
};

export const SET_WINNER = 'SET_WINNER' as const;
export const CLICK_CELL = 'CLICK_CELL' as const;
export const CHANGE_TURN = 'CHANGE_TURN' as const;
export const RESET_GAME = 'RESET_GAME' as const;

interface SetWinnerAction {
	type: typeof SET_WINNER;
	winner: 'O' | 'X';
}

// action creator
const setWinner = (winner: 'O' | 'X'): SetWinnerAction => {
	return { type: SET_WINNER, winner };
};

interface ClickCellAction {
	type: typeof CLICK_CELL;
	row: number;
	cell: number;
}

const clickCell = (row: number, cell: number): ClickCellAction => {
	return { type: CLICK_CELL, row, cell };
};

interface ChangeTurnAction {
	type: typeof CHANGE_TURN;
}

interface ResetGameAction {
	type: typeof RESET_GAME;
}

const reducer = (
	state: ReducerState,
	action: SetWinnerAction | ClickCellAction | ChangeTurnAction | ResetGameAction
): ReducerState => {
	switch (action.type) {
		case SET_WINNER: {
			return {
				...state, // 기존 state를 복사해주고
				winner: action.winner, // 기존 state 속성에서 바꿀 부분만 명시
			};
		}
		case CLICK_CELL: {
			const tableData = [...state.tableData]; // 기존의 2차원 배열 tableData를 깊은 복사해준다.
			tableData[action.row] = [...state.tableData[action.row]]; // 1차원 배열인 tableData의 행을 깊은 복사해준다.
			tableData[action.row][action.cell] = state.turn; // 새로운 값을 할당한다.

			// 이렇게 되면 기존 tableData가 가리키고 있는 배열이 아니라 새로운 배열로 할당해 state를 다시 셋팅하게 된다. => 불변성을 지킨다.
			return {
				...state,
				tableData,
				recentCell: [action.row, action.cell],
			};
		}
		case CHANGE_TURN: {
			return {
				...state,
				turn: state.turn === 'O' ? 'X' : 'O',
			};
		}
		case RESET_GAME: {
			return {
				...state,
				turn: 'O',
				tableData: [
					['', '', ''],
					['', '', ''],
					['', '', ''],
				],
				recentCell: [-1, -1],
			};
		}
		default: {
			return state;
		}
	}
};

const TicTacToe = () => {
	/* 
    useReducer로 hooks에서의 여러 state들을 관리한다.
    
    dispatch로 실제 변경시킬 state를 명시하고,
    reducer로 어떻게 변경시킬지 기술한다.
  */
	const [state, dispatch] = useReducer(reducer, initialState);
	const { tableData, turn, winner, recentCell } = state;

	useEffect(() => {
		// tableData가 바뀔 때마다 승리 조건 체크하기
		const [row, cell] = recentCell;

		if (row < 0) {
			return;
		}

		let win = false;
		if (
			tableData[row][0] === turn &&
			tableData[row][1] === turn &&
			tableData[row][2] === turn
		) {
			win = true;
		}
		if (
			tableData[0][cell] === turn &&
			tableData[1][cell] === turn &&
			tableData[2][cell] === turn
		) {
			win = true;
		}
		if (
			tableData[0][0] === turn &&
			tableData[1][1] === turn &&
			tableData[2][2] === turn
		) {
			win = true;
		}
		if (
			tableData[0][2] === turn &&
			tableData[1][1] === turn &&
			tableData[2][0] === turn
		) {
			win = true;
		}

		if (win) {
			dispatch({ type: SET_WINNER, winner: turn });
			dispatch({ type: RESET_GAME });
		} else {
			// 무승부 검사를 한다. 테이블이 다 찼는데 승부가 안 났으면 무승부이다.
			let all = true;
			tableData.forEach((row) => {
				row.forEach((cell) => {
					if (!cell) {
						all = false;
					}
				});
			});

			if (all) {
				dispatch({ type: RESET_GAME });
			} else {
				// 승부가 안 났으면 턴을 바꾼다.
				dispatch({ type: CHANGE_TURN });
			}
		}
	}, [recentCell]);

	return (
		<>
			<Table tableData={tableData} dispatch={dispatch} />
			{winner && <div>{winner}님의 승리</div>}
		</>
	);
};

export default TicTacToe;
