import * as React from 'react';
import { memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
	console.log('Tr rendered');

	return (
		<tr>
			{Array(rowData.length)
				.fill()
				.map((td, i) => (
					<Td
						key={i}
						rowIndex={rowIndex}
						cellIndex={i}
						cellData={rowData[i]}
						dispatch={dispatch}
					/>
				))}
		</tr>
	);
});

export default Tr;
