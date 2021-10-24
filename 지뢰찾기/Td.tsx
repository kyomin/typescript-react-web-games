import * as React from 'react';
import { useMemo, useCallback, useContext, memo } from 'react';
import {
	TableContext,
	CODE,
	OPEN_CELL,
	CLICK_MINE,
	FLAG_CELL,
	QUESTION_CELL,
	NORMALIZE_CELL,
} from './MineSweeper';

const getTdStyle = (code) => {
	switch (code) {
		case CODE.NORMAL:
		case CODE.MINE: {
			return {
				background: '#444',
			};
		}
		case CODE.CLICKED_MINE:
		case CODE.OPENED: {
			return {
				background: 'white',
			};
		}
		case CODE.QUESTION_MINE:
		case CODE.QUESTION: {
			return {
				background: 'yellow',
			};
		}
		case CODE.FLAG_MINE:
		case CODE.FLAG: {
			return {
				background: 'red',
			};
		}
		default: {
			return {
				background: 'white',
			};
		}
	}
};

const getTdText = (code) => {
	switch (code) {
		case CODE.NORMAL:
		case CODE.MINE: {
			return '';
		}
		case CODE.CLICKED_MINE: {
			return '펑!';
		}
		case CODE.FLAG_MINE:
		case CODE.FLAG: {
			return '!';
		}
		case CODE.QUESTION_MINE:
		case CODE.QUESTION: {
			return '?';
		}
		default: {
			return code || '';
		}
	}
};

const Td = memo(({ rowIndex, cellIndex }) => {
	const { tableData, dispatch, halted } = useContext(TableContext);

	const onClickTd = useCallback(() => {
		if (halted) {
			return;
		}

		switch (tableData[rowIndex][cellIndex]) {
			case CODE.OPENED:
			case CODE.FLAG_MINE:
			case CODE.FLAG:
			case CODE.QUESTION_MINE:
			case CODE.QUESTION: {
				return;
			}
			case CODE.NORMAL: {
				dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
				return;
			}
			case CODE.MINE: {
				dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
				return;
			}
			default: {
				return;
			}
		}
	}, [tableData[rowIndex][cellIndex], halted]);

	const onRightClickTd = useCallback(
		(e) => {
			e.preventDefault();

			if (halted) {
				return;
			}

			switch (tableData[rowIndex][cellIndex]) {
				case CODE.NORMAL:
				case CODE.MINE: {
					dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
					return;
				}
				case CODE.FLAG_MINE:
				case CODE.FLAG: {
					dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
					return;
				}
				case CODE.QUESTION_MINE:
				case CODE.QUESTION: {
					dispatch({ type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex });
					return;
				}
				default: {
					return;
				}
			}
		},
		[tableData[rowIndex][cellIndex], halted]
	);

	/* 
    Context API를 사용하게 되면 Td 함수가 다시 실행되는 것은 어쩔 수 없다.
    그래서 이 내부에서 렌더링 부분만 useMemo로 따로 캐싱해서 방지한다.
  */
	return useMemo(
		() => (
			<td
				style={getTdStyle(tableData[rowIndex][cellIndex])}
				onClick={onClickTd}
				onContextMenu={onRightClickTd}>
				{getTdText(tableData[rowIndex][cellIndex])}
			</td>
		),
		[tableData[rowIndex][cellIndex]]
	);
});

export default Td;
