import * as React from 'react';
import { useRef, useState, useCallback } from 'react';

const ResponseCheck = () => {
	const [state, setState] = useState('waiting');
	const [message, setMessage] = useState('클릭해서 시작하세요.');
	const [result, setResult] = useState<number[]>([]); // 빈 배열은 never로 타입이 안 잡히므로 제네릭으로 배열 타입 명시

	/*
    useRef를 이용해서 변수를 선언할 수 있다.
    다만, state 변수와 차이가 나는 것은
    state 변수가 변할 때에는 render가 다시 일어나는데,
    아래와 같이 선언한 변수가 변할 때에는 불필요하게 다시 렌더링되지 않는다.
  */
	const timeout = useRef<number | null>(null); // 정의문을 참조하여 오버로딩된 함수 중 MutableRefObject를 반환할 수 있도록 짝 맞추기. timeout.current에 값을 대입하기 위함
	const startTime = useRef(0);
	const endTime = useRef(0);

	const onClickScreen = useCallback(() => {
		if (state === 'waiting') {
			setState('ready');
			setMessage('초록색이 되면 클릭하세요.');

			timeout.current = window.setTimeout(() => {
				setState('now');
				setMessage('지금 클릭');

				startTime.current = new Date().getTime();
			}, Math.floor(Math.random() * 1000) + 2000); // 2 ~ 3초 랜덤
		} else if (state === 'ready') {
			// 성급하게 클릭
			if (timeout.current) {
				clearTimeout(timeout.current);
			}

			setState('waiting');
			setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
		} else if (state === 'now') {
			// 반응속도 체크
			endTime.current = new Date().getTime();
			setState('waiting');
			setMessage('클릭해서 시작하세요.');
			setResult((prevResult) => {
				return [...prevResult, endTime.current - startTime.current];
			});
		}
	}, [state]);

	const onReset = useCallback(() => {
		setResult([]);
	}, []);

	const renderAverage = () => {
		return result.length === 0 ? null : (
			<>
				<div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
				<button onClick={onReset}>리셋</button>
			</>
		);
	};

	return (
		<>
			<div id='screen' className={state} onClick={onClickScreen}>
				{message}
			</div>
			{renderAverage()}
		</>
	);
};

export default ResponseCheck;
