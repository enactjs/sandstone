import Item from '@enact/sandstone/Item';
import {Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import Repeater from '@enact/ui/Repeater';
import {VoiceControlDecorator} from '@enact/webos/speech';
import React from 'react';

const VoiceItem = VoiceControlDecorator(Item);

class IntentDelete extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: '',
			itemList: ['사진', '노래', '라디오 스타']
		};
	}

	showResult = (msg) => {
		this.setState({result: msg});
		setTimeout(() => (this.setState({result: ''})), 1500);
	};

	handleVoice = (e) => {
		let {index} = e.currentTarget.dataset;
		let {intent, value} = e.detail;
		this.showResult('handleVoice > ' + index + ' | ' + intent + ' | ' + value);
		e.preventDefault();
	};

	render () {
		return (
			<>
				<Header title="Intent to delete" subtitle={this.state.result} />
				<Scroller>
					<VoiceItem
						data-webos-voice-intent="Delete"
						data-webos-voice-label="비디오 스타"
						onVoice={this.handleVoice}
					>
						비디오 스타
					</VoiceItem>
					<Repeater
						childComponent={VoiceItem}
						itemProps={{
							'data-webos-voice-intent': 'Select Delete',
							onVoice: this.handleVoice
						}}
					>
						{this.state.itemList}
					</Repeater>
				</Scroller>
			</>
		);
	}
}

export default IntentDelete;
