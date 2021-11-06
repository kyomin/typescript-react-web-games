import * as React from 'react';
import { Component } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import NumberBaseball from './숫자야구/NumberBaseball';
import RockScissorsPaper from './가위바위보/RockScissorsPaper';
import LottoGenerator from './로또추첨기/LottoGenerator';

interface Props extends RouteChildrenProps<{ name: string }> {
	/*
    서드 파티 Props 타입을 확장하여 커스터마이징 한다.
    RouteComponentProps에는 라우터의 match, location, history에 대한 정보가 들어가있다.
    이 안에서는 이 외에 우리가 사용할 Props 타입을 정의하면 된다.
  */
}

class GameMatcherClass extends Component<Props> {
	render() {
		if (!this.props.match) {
			return <div>일치하는 게임이 없습니다.</div>;
		}

		// 쿼리스트링 가져오기
		let urlSearchParams = new URLSearchParams(
			this.props.location.search.slice(1)
		);
		console.log(urlSearchParams.get('hello'));

		// param에 따른 컴포넌트 분기 처리
		if (this.props.match.params.name === 'number-baseball') {
			return <NumberBaseball />;
		} else if (this.props.match.params.name === 'rock-scissors-paper') {
			return <RockScissorsPaper />;
		} else if (this.props.match.params.name === 'lotto-generator') {
			return <LottoGenerator />;
		} else {
			return <div>일치하는 게임이 없습니다.</div>;
		}
	}
}

export default GameMatcherClass;
