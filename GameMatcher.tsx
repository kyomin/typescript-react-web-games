import * as React from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import ResponseCheck from './반응속도체크/ResponseCheck';
import NumberBaseball from './숫자야구/NumberBaseball';
import RockScissorsPaper from './가위바위보/RockScissorsPaper';
import LottoGenerator from './로또추첨기/LottoGenerator';
import TicTacToe from './틱택토/TicTacToe';
import MineSweeper from './지뢰찾기/MineSweeper';

const GameMatcher = () => {
	const match = useRouteMatch<{ name: string }>();
	const location = useLocation();
	const history = useHistory();

	if (!match) {
		return <div>일치하는 게임이 없습니다.</div>;
	}

	// 쿼리스트링 가져오기
	let urlSearchParams = new URLSearchParams(location.search.slice(1));
	console.log(urlSearchParams.get('hello'));

	// param에 따른 컴포넌트 분기 처리
	if (match.params.name === 'number-baseball') {
		return <NumberBaseball />;
	} else if (match.params.name === 'rock-scissors-paper') {
		return <RockScissorsPaper />;
	} else if (match.params.name === 'lotto-generator') {
		return <LottoGenerator />;
	} else if (match.params.name === 'response-check') {
    return <ResponseCheck />
  } else if (match.params.name === 'tic-tac-toe') {
    return <TicTacToe />
  } else if (match.params.name === 'mine-sweeper') {
    return <MineSweeper />
  } else {
		return <div>일치하는 게임이 없습니다.</div>;
	}
};

export default GameMatcher;
