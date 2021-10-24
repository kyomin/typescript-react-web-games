import * as React from 'react';
import { useEffect, useReducer, createContext, useMemo, Dispatch } from 'react';
import Table from './Table';
import Form from './Form';
import {
	ReducerActions,
	START_GAME,
	OPEN_CELL,
	CLICK_MINE,
	FLAG_CELL,
	QUESTION_CELL,
	NORMALIZE_CELL,
	INCREMENT_TIMER,
	incrementTimer,
} from './action';

// table의 상수의 의미를 코드로 정리
export const CODE = {
	MINE: -7,
	NORMAL: -1,
	QUESTION: -2,
	FLAG: -3,
	QUESTION_MINE: -4,
	FLAG_MINE: -5,
	CLICKED_MINE: -6,
	OPENED: 0, // 0 이상이면 다 opened
} as const; // 속성이 바뀔 일이 없는 코드라면 as const로 모두 readonly
export type Codes = typeof CODE[keyof typeof CODE];

// 리듀서가 관리하는 state 변수들을 인터페이스 타입으로 정의
interface ReducerState {
	tableData: typeof CODE[keyof typeof CODE][][];
	data: {
		row: number;
		cell: number;
		mine: number;
	};
	timer: number;
	result: string;
	halted: boolean;
	openedCount: number;
}

const initialState: ReducerState = {
	tableData: [],
	data: {
		row: 0,
		cell: 0,
		mine: 0,
	},
	timer: 0,
	result: '',
	halted: true,
	openedCount: 0,
};

const plantMine = (row: number, cell: number, mine: number): Codes[][] => {
	console.log(row, cell, mine);

	// 0 <= x < (row*cell)의 정수 채우기
	const size = row * cell;
	const candidate = Array(size)
		.fill(null)
		.map((arr, i) => {
			return i;
		});
	const shuffle = [];
	while (candidate.length > row * cell - mine) {
		const chosen = candidate.splice(
			Math.floor(Math.random() * candidate.length),
			1
		)[0];
		shuffle.push(chosen);
	}

	// code.NORMAL로 셋팅된 2차원 배열 만들기
	const data: Codes[][] = [];
	for (let i = 0; i < row; i++) {
		const rowData: Codes[] = [];
		data.push(rowData);

		for (let j = 0; j < cell; j++) {
			rowData.push(CODE.NORMAL);
		}
	}

	// shuffle에 랜덤으로 뽑은 위치에 지뢰 심기
	for (let k = 0; k < shuffle.length; k++) {
		const r = Math.floor(shuffle[k] / cell);
		const c = shuffle[k] % cell;

		data[r][c] = CODE.MINE;
	}

	console.log(data);
	return data;
};

/* 리듀서 정의 */
const reducer = (
	state = initialState,
	action: ReducerActions
): ReducerState => {
	switch (action.type) {
		case START_GAME: {
			return {
				...state,
				data: {
					row: action.row,
					cell: action.cell,
					mine: action.mine,
				},
				openedCount: 0,
				tableData: plantMine(action.row, action.cell, action.mine),
				halted: false,
				timer: 0,
			};
		}
		case OPEN_CELL: {
			// 불변성 유지를 위해 Array 데이터를 깊은 복사해준다.
			const tableData = [...state.tableData];
			tableData.forEach((row, i) => {
				tableData[i] = [...state.tableData[i]];
			});

			const checked: string[] = []; // 탐색 기록들 캐싱
			let openedCount = 0;
			const checkArround = (row: number, cell: number) => {
				console.log('checkArround ', row, cell);
				/*
          더 이상 탐색을 안 하는 조건

          as Codes[]로 강제 형변환을 하지 않는다면,
          개수가 맞지 않아 타입이 맞지 않는다고 판단해버린다.
          그래서 컴파일러가 해석할 수 있도록 상위 타입으로 강제 형변환을 한다.
        */
				if (
					([CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE] as Codes[]).includes(
						tableData[row][cell]
					)
				) {
					return;
				}
				if (
					row < 0 ||
					row >= tableData.length ||
					cell < 0 ||
					cell >= tableData[0].length
				) {
					return;
				}

				if (checked.includes(row + '/' + cell)) {
					// 이미 탐색한 곳이면
					return;
				} else {
					checked.push(row + '/' + cell);
				}

				openedCount += 1;
				// 상하좌우 및 대각선 지뢰 개수 검사 후 표시 작업
				let around: Codes[] = [];
				if (tableData[row - 1]) {
					// 윗 칸이 존재하는 경우
					around = around.concat(
						tableData[row - 1][cell - 1],
						tableData[row - 1][cell],
						tableData[row - 1][cell + 1]
					);
				}

				around = around.concat(
					// 자기 행의 좌우 칸
					tableData[row][cell - 1],
					tableData[row][cell + 1]
				);

				if (tableData[row + 1]) {
					// 아랫 칸이 존재하는 경우
					around = around.concat(
						tableData[row + 1][cell - 1],
						tableData[row + 1][cell],
						tableData[row + 1][cell + 1]
					);
				}

				const count = around.filter((v) =>
					([CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE] as Codes[]).includes(
						v
					)
				).length as Codes;
				tableData[row][cell] = count;

				// 주변 모든 칸이 빈 칸이면 재귀적으로 열어주기
				if (count === 0) {
					const near = [];
					if (row - 1 > -1) {
						near.push([row - 1, cell - 1]);
						near.push([row - 1, cell]);
						near.push([row - 1, cell + 1]);
					}
					near.push([row, cell - 1]);
					near.push([row, cell + 1]);
					if (row + 1 < tableData.length) {
						near.push([row + 1, cell - 1]);
						near.push([row + 1, cell]);
						near.push([row + 1, cell + 1]);
					}

					near.forEach((n) => {
						// 빈 칸이면서 아직 열지 않은 칸이면 탐색 대상이다.
						if (tableData[n[0]][n[1]] < CODE.OPENED) {
							checkArround(n[0], n[1]);
						}
					});
				}
			};

			checkArround(action.row, action.cell);

			// 승리 조건 체크
			let halted = false;
			let result = '';
			if (
				state.data.row * state.data.cell - state.data.mine ===
				state.openedCount + openedCount
			) {
				halted = true;
				result = `${state.timer}초만에 승리하셨습니다`;
			}

			return {
				...state,
				tableData,
				openedCount: state.openedCount + openedCount,
				halted,
				result,
			};
		}
		case CLICK_MINE: {
			const tableData = [...state.tableData];
			tableData[action.row] = [...state.tableData[action.row]];
			tableData[action.row][action.cell] = CODE.CLICKED_MINE;

			return {
				...state,
				tableData,
				halted: true,
			};
		}
		case FLAG_CELL: {
			const tableData = [...state.tableData];
			tableData[action.row] = [...state.tableData[action.row]];

			if (tableData[action.row][action.cell] === CODE.MINE) {
				tableData[action.row][action.cell] = CODE.FLAG_MINE;
			} else {
				tableData[action.row][action.cell] = CODE.FLAG;
			}

			return {
				...state,
				tableData,
			};
		}
		case QUESTION_CELL: {
			const tableData = [...state.tableData];
			tableData[action.row] = [...state.tableData[action.row]];

			if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
				tableData[action.row][action.cell] = CODE.QUESTION_MINE;
			} else {
				tableData[action.row][action.cell] = CODE.QUESTION;
			}

			return {
				...state,
				tableData,
			};
		}
		case NORMALIZE_CELL: {
			const tableData = [...state.tableData];
			tableData[action.row] = [...state.tableData[action.row]];

			if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
				tableData[action.row][action.cell] = CODE.MINE;
			} else {
				tableData[action.row][action.cell] = CODE.NORMAL;
			}

			return {
				...state,
				tableData,
			};
		}
		case INCREMENT_TIMER: {
			return {
				...state,
				timer: state.timer + 1,
			};
		}
		default: {
			return state;
		}
	}
};

/*
  컨텍스트 정의 
  컴포넌트 간에 공유할 데이터를 명시한다.
  리듀서 state에서 관리하는 데이터 중 일부를 추려서
  자식으로 한방에 보내줄 데이터들을 명시한다.
*/
interface Context {
	tableData: Codes[][];
	halted: boolean;
	dispatch: Dispatch<ReducerActions>; // 제네릭으로 리듀서 액션 타입 넣어주기
}
export const TableContext = createContext<Context>({
	tableData: [],
	halted: true,
	dispatch: () => {},
});
const MineSweeper = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { tableData, halted, timer, result } = state;

	/* 
    context value 최적화하기.
    state가 변경될 때마다 리렌더링 되면서 context value 객체가 새로 생성되고,
    그러면 자식 컴포넌트도 자동으로 리렌더링 된다.
    그래서 useMemo로 값을 캐싱해둔다.
    아래에서는 state.tableData와 state.halted가 바뀔 때에 갱신해 준다.
    dispatch는 바뀔 일이 없어서 안 넣어줘도 된다.
  */
	const value = useMemo(
		() => ({ tableData, halted, dispatch }),
		[tableData, halted]
	);

	useEffect(() => {
		let timer: number;
		if (halted === false) {
			/*
        setInterval 함수가 브라우저 환경에서 실행되는지,
        노드 환경에서 실행되는지 모르기 때문에
        window. 으로 확실한 실행 환경을 명시한다.
      */
			timer = window.setInterval(() => {
				dispatch(incrementTimer());
			}, 1000);
		} else {
			clearInterval(timer);
		}

		// componentWillUnmount
		return () => {
			clearInterval(timer);
		};
	}, [halted]);

	return (
		// 이 안에 묶인 자식 컴포넌트에서 다이렉트로 현 컴포넌트의 데이터에 접근할 수 있게 된다(복잡한 props 전달의 단점 해결).
		<TableContext.Provider value={value}>
			<Form />
			<div>{timer}</div>
			<Table />
			<div>{result}</div>
		</TableContext.Provider>
	);
};

export default MineSweeper;
