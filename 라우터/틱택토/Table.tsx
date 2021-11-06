import * as React from 'react';
import { FC, Dispatch } from 'react';
import Tr from './Tr';

/*
  자식 컴포넌트는 FC를 통해 함수형 컴포넌트 타입임을 명시하고(FunctionComponent 안 사용해도 됨),
  제네릭을 통해 props의 타입을 명시한다.

  또한, 자식 컴포넌트에서 props의 구조를 명시하지 않으면
  부모에서 자식을 return하는 부분에서 props를 넘겨주는 부분에서 에러가 난다.
*/
interface Props {
	tableData: string[][];
	dispatch: Dispatch<any>;
}

const Table: FC<Props> = ({ tableData, dispatch }) => {
	return (
		<table>
			{Array(tableData.length)
				.fill(null) // 기존에는 빈 값도 됐는데, 타입스크립트에서는 어떤 타입으로 채울지 명시해야 한다.
				.map((tr, i) => (
					<Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch={dispatch} />
				))}
		</table>
	);
};

export default Table;
