import * as React from 'react';
import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

// state 안 쓰는 함수는 외부로 뺀다.
function getWinNumbers() {
	console.log('getWinNumbers');
	const candidates = Array(45)
		.fill(null)
		.map((v, i) => i + 1);
	const shuffle = [];

	// 셔플
	while (candidates.length > 0) {
		shuffle.push(
			candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]
		);
	}
	const bonusNumber = shuffle[shuffle.length - 1];
	const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
	return [...winNumbers, bonusNumber];
}

const LottoGenerator = () => {
	/* 
    useMemo를 이용해 잠시 캐싱을 한다.
    이를 이용하면 hooks가 getWinNumbers의 리턴 값을 기억한다.
    2번째 배열에 넣어준 요소의 값이 바뀌어야지 함수를 다시 실행한다.
    그래서 state가 변경되어 다시 이 내부가 실행되어도 getWinNumbers 함수는 다시 실행되지 않는다.
    만일 2번째 배열의 요소가 state로서 변하게 되면 그때서야 다시 실행한다.
  */
	const lottoNumbers = useMemo(() => getWinNumbers(), []);
	const [winNumbers, setWinNumbers] = useState(lottoNumbers);
	const [winBalls, setWinBalls] = useState<number[]>([]); // 빈 배열은 타입 추론을 못하므로 제네릭 명시 주의!
	const [bonus, setBonus] = useState<number | null>(null);
	const [redo, setRedo] = useState(false);
	const timeouts = useRef<number[]>([]);

	useEffect(() => {
		for (let i = 0; i < winNumbers.length - 1; i++) {
			timeouts.current[i] = window.setTimeout(() => {
				setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
			}, (i + 1) * 1000);
		}

		timeouts.current[6] = window.setTimeout(() => {
			setBonus(winNumbers[6]);
			setRedo(true);
		}, 7000);

		// componentWillUnmount
		return () => {
			timeouts.current.forEach((v) => {
				clearTimeout(v);
			});
		};
	}, [timeouts.current]); // 2번째 인자가 빈 배열이면 componentDidMount와 동일. 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행
	// 만일 componentDidUpdate용으로 쓸 state가 여러 개이면 useEffect를 여러 개 실행해도 된다.

	/* 
    useCallback을 이용해 함수가 다시 정의되는 것을 막는다.
    hooks에서 state가 변하게 되면 위에서부터 hooks 함수 내부가 다시 실행 되는데,
    useCallback을 이용하면 다시 정의되는 것을 막을 수 있다(함수 자체를 기억한다).
    그래서 props로 이 함수를 넘길 때 유용하다.
    만일 이를 사용하지 않고서 자식에게 props로 넘기게 되면
    부모의 state가 변해서 해당 함수를 다시 정의하게 되면 props를 받는 자식 입장에서도
    같은 함수 내용인데도 새로운 props를 받았다고 인지해 버린다.
    하지만 이 내부에서 state를 사용할 시에는 2번째 인자로 해당 state를 넣어준다.
    안 그러면 처음의 state를 계속 기억하고 있어서
    해당 함수가 호출되면 state가 변한 state가 아니라 처음의 state만 기억하고 있는다.
  */
	const onClickRedo = useCallback(() => {
		// 초기화
		console.log('onClickRedo');
		console.log('winNumbers : ', winNumbers);
		setWinNumbers(getWinNumbers());
		setWinBalls([]);
		setBonus(null);
		setRedo(false);
		timeouts.current = [];
	}, [winNumbers]);

	return (
		<>
			<div>당첨 숫자</div>
			<div id='결과창'>
				{winBalls.map((v) => (
					<Ball key={v} number={v} />
				))}
			</div>
			<div>보너스</div>
			{bonus && <Ball number={bonus} />}
			{redo && <button onClick={onClickRedo}>한 번 더!</button>}
		</>
	);
};

export default LottoGenerator;
