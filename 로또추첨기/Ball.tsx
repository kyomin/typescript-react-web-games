import * as React from 'react';
import { FunctionComponent } from 'react';

/*
  자식 컴포넌트는 FunctionComponent를 통해 함수형 컴포넌트 타입임을 명시하고,
  제네릭을 통해 props의 타입을 명시한다.
*/
const Ball: FunctionComponent<{ number: number }> = ({ number }) => {
	let background;
	if (number <= 10) background = 'red';
	else if (number <= 20) background = 'orange';
	else if (number <= 30) background = 'yellow';
	else if (number <= 40) background = 'blue';
	else background = 'green';

	return (
		<div className='ball' style={{ background }}>
			{number}
		</div>
	);
};

export default Ball;
