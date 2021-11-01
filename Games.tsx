import * as React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import GameMatcher from './GameMatcher';

const Games = () => {
	return (
		<BrowserRouter>
			<div>
				<Link to='/game/number-baseball'>숫자야구</Link>
				&nbsp;
				<Link to='/game/rock-scissors-paper'>가위바위보</Link>
				&nbsp;
				<Link to='/game/lotto-generator'>로또생성기</Link>
				&nbsp;
        <Link to='/game/response-check'>반응속도체크</Link>
				&nbsp;
        <Link to='/game/tic-tac-toe'>틱택토</Link>
				&nbsp;
        <Link to='/game/mine-sweeper'>지뢰찾기</Link>
				&nbsp;
				<Link to='/game/index'>게임 매쳐</Link>
			</div>
			<div>
				<Switch>
					<Route exact path='/' render={() => <GameMatcher />} />
					<Route path='/game/:name' render={() => <GameMatcher />} />
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default Games;
