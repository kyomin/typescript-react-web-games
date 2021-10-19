import * as React from 'react';
import { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
	console.log('Td rendered');

	const onClickTd = useCallback(() => {
		// 이미 클릭된 cellData라면
		if (cellData) {
			return;
		}

		dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
	}, [cellData]);

	return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
