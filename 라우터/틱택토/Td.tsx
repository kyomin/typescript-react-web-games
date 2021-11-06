import * as React from 'react';
import { FC, useCallback, memo, Dispatch } from 'react';
import { CLICK_CELL } from './TicTacToe';

interface Props {
	rowIndex: number;
	cellIndex: number;
	cellData: string;
	dispatch: Dispatch<any>;
	children: string;
}

const Td: FC<Props> = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
	const onClickTd = useCallback(() => {
		// 이미 클릭된 cellData라면
		if (cellData) {
			return;
		}

		// dispatch를 통해 액션을 발생시키면 reducer의 2번째 인자로 아래 데이터를 받아 처리한다.
		dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
	}, [cellData]);

	return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
