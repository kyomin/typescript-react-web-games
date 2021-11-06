import * as React from 'react';
import { FunctionComponent, memo } from 'react';
import { TryInfo } from './types';

/*
  hooks는 함수형 컴포넌트이므로 FunctionComponent라는 타입을 가진다.
  또한 memo를 사용하면, state나 props가 이전 상태와 달라졌을 때에만 다시 렌더링 한다.

  hooks에서 state는 useState가 대체해서 제네릭에서는 따로 타이핑이 없다.
  그래서 Props 타입만 신경쓰면 된다.
*/
const Try: FunctionComponent<{ tryInfo: TryInfo }> = memo(({ tryInfo }) => {
	return (
		<li>
			<div>{tryInfo.try}</div>
			<div>{tryInfo.result}</div>
		</li>
	);
});

export default Try;
