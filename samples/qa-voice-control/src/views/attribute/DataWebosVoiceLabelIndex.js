import React from 'react';
import ri from '@enact/ui/resolution';
import {Panel, Header} from '@enact/sandstone/Panels';
import VirtualList from '@enact/sandstone/VirtualList';
import Item from '@enact/sandstone/Item';
import {VoiceControlDecorator} from '@enact/webos/speech';

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
		this.scrollTo({index: 0}); // temporary
	};

	getScrollTo = (fn) => (this.scrollTo = fn);

	showResult = (msg) => {
		this.setState({result: msg});
		setTimeout(() => (this.setState({result: ''})), 1500);
	};

	handleClick = (e) => {
		let {index} = e.currentTarget.dataset;
		this.showResult('handleClick>' + index);
	};

	handleVoice = (e) => {
		// document.querySelectorAll('[data-webos-voice-intent="Select PlayContent Delete"]')[6].dispatchEvent(new CustomEvent('webOSVoice', {detail: {intent: 'PlayContent', value: 'hello'}}));
		let {index} = e.currentTarget.dataset;
		let {intent, value} = e.detail;
		this.showResult('handleVoice>' + index + ' | ' + intent + ' | ' + value);
		e.preventDefault();
	};

	renderItem = ({index, ...rest}) => {
		let screenIndex = (index >= this.firstVisibleIndex && index <= this.lastVisibleIndex) ? index - this.firstVisibleIndex + 1 : null;
		return (
			<VoiceItem
				key={index}
				data-webos-voice-intent="Select PlayContent Delete"
				onClick={this.handleClick}
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
			<Panel>
				<Header title="voice-label-index" subtitle={this.state.result} />
				<VirtualList
					dataSize={itemList.length}
					itemRenderer={this.renderItem}
					itemSize={itemSize}
					direction="vertical"
					spacing={ri.scale(0)}
					onScrollStop={this.handleScrollStop}
					cbScrollTo={this.getScrollTo}
				/>
			</Panel>
		);
	}
}

export default DataWebosVoiceLabelIndex;
