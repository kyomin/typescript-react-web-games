import * as React from 'react';
import { FC, memo, Dispatch } from 'react';
import Td from './Td';

interface Props {
	rowData: string[];
	rowIndex: number;
	dispatch: Dispatch<any>;
}

const Tr: FC<Props> = memo(({ rowData, rowIndex, dispatch }) => {
	console.log('Tr rendered');

	return (
		<tr>
			{Array(rowData.length)
				.fill(null)
				.map((td, i) => (
					<Td
						key={i}
						rowIndex={rowIndex}
						cellIndex={i}
						cellData={rowData[i]}
						dispatch={dispatch}>
						{/* children 자리이다. */}
						{''}
					</Td>
				))}
		</tr>
	);
});

export default Tr;
