import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import Item from '@enact/sandstone/Item';
import {Panel, Header} from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';

import React from 'react';

class IntentSelect extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: ''
		};
		this.petList = ['강아지', '고양이', '치킨'];
		this.nameList = ['철수', '길동', '현수'];
	}

	handleClick = (msg) => {
		this.showResult(msg);
	};

	showResult = (msg) => {
		this.setState({result: msg});
		setTimeout(() => {
			this.setState({result: ''});
		}, 1500);
	};

	handleExpandableList = (e) => {
		this.showResult('handleExpandableList>' + this.petList[e.selected]);
	};

	handleExpandableItem = (value) => {
		this.showResult('handleExpandableItem>' + value);
	};

	render () {
		return (
			<Panel>
				<Header title="Intent to select" subtitle={this.state.result} />
				<Scroller>
					<Heading>Button</Heading>
					<Button onClick={this.handleClick('Button | 사진 필터')}>사진 필터</Button>
					<Heading>IconButton</Heading>
					<Button data-webos-voice-label="별" tooltipText="별" onClick={this.handleClick('IconButton | 별')} icon={'star'} />
					<Heading>Item</Heading>
					<Item onClick={this.handleClick('Item | 다크 나이트')}>다크 나이트</Item>
				</Scroller>
			</Panel>
		);
	}
}

export default IntentSelect;
