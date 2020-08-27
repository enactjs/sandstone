import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import React from 'react';

import CommonView from '../../components/CommonView';


class IntentSelect extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: ''
		};
		this.petList = ['강아지', '고양이', '치킨'];
		this.nameList = ['철수', '길동', '현수'];
	}

	handleClick = (msg) => () => {
		this.updateResult(msg);
	};

	updateResult = (msg) => {
		this.setState({result: msg});
	};

	handleExpandableList = (ev) => {
		this.updateResult('handleExpandableList > ' + this.petList[ev.selected]);
	};

	handleExpandableItem = (value) => {
		this.updateResult('handleExpandableItem > ' + value);
	};

	render () {
		return (
			<CommonView title="Intent to select" subtitle={this.state.result}>
				<Heading showLine>Button</Heading>
				<Button onClick={this.handleClick('Button | 사진 필터')}>사진 필터</Button>
				<Heading showLine>IconButton</Heading>
				<Button data-webos-voice-label="별" tooltipText="별" onClick={this.handleClick('IconButton | 별')} icon="star" />
				<Heading showLine>Item</Heading>
				<Item onClick={this.handleClick('Item | 다크 나이트')}>다크 나이트</Item>
			</CommonView>
		);
	}
}

export default IntentSelect;
