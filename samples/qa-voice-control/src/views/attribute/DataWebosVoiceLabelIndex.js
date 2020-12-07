import Item from '@enact/sandstone/Item';
import VirtualList from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import {VoiceControlDecorator} from '@enact/webos/speech';
import React from 'react';

import CommonView from '../../components/CommonView';

const VoiceItem = VoiceControlDecorator(Item);

let itemList = [];
for (let i = 0; i < 30; i++) {
	itemList.push('item' + i);
}

const itemSize = ri.scale(96);

class DataWebosVoiceLabelIndex extends React.Component {
	constructor (props) {
		super(props);
		this.firstVisibleIndex = 0;
		this.lastVisibleIndex = 0;
		this.state = {
			result: ''
		};
	}

	componentDidMount = () => {
		this.scrollTo({index: 0});
	};

	getScrollTo = (fn) => (this.scrollTo = fn);

	updateResult = (msg) => {
		this.setState({result: msg});
	};

	handleClick = (e) => {
		let {index} = e.currentTarget.dataset;
		this.updateResult(`Selected > ${index}`);
	};

	handleVoice = (e) => {
		let {index} = e.currentTarget.dataset;
		let {intent, value} = e.detail;
		this.updateResult('handleVoice > ' + index + ' | ' + intent + ' | ' + value);
		e.preventDefault();
	};

	renderItem = ({index, ...rest}) => {
		let screenIndex = (index >= this.firstVisibleIndex && index <= this.lastVisibleIndex) ? index - this.firstVisibleIndex + 1 : null;
		return (
			<VoiceItem
				key={index}
				data-webos-voice-intent="Select PlayContent Delete"
				onClick={this.clicked}
				onVoice={this.handleVoice}
				data-webos-voice-label-index={screenIndex}
				style={{height: itemSize + 'px'}}
				{...rest}
			>
				{itemList[index]}
			</VoiceItem>
		);
	};

	handleScrollStop = ({moreInfo: {firstVisibleIndex, lastVisibleIndex}}) => {
		this.firstVisibleIndex = firstVisibleIndex;
		this.lastVisibleIndex = lastVisibleIndex;

		setTimeout(() => {
			this.forceUpdate();
		}, 1);
	};

	render () {
		return (
			<CommonView noScroller title="data-webos-voice-label-index" subtitle={this.state.result}>
				<VirtualList
					cbScrollTo={this.getScrollTo}
					dataSize={itemList.length}
					direction="vertical"
					itemRenderer={this.renderItem}
					itemSize={itemSize}
					onScrollStop={this.handleScrollStop}
					spacing={0}
				/>
			</CommonView>
		);
	}
}

export default DataWebosVoiceLabelIndex;
