/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {VoiceControlDecorator} from '@enact/webos/speech';

const VoiceButton = VoiceControlDecorator(Button);

class DataWebosVoiceDisabled extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: ''
		};
	}

	showResult = (msg) => {
		this.setState({result: msg});
		setTimeout(() => (this.setState({result: ''})), 1500);
	};

	handleVoice = (e) => {
		// document.querySelectorAll('[data-webos-voice-intent="Select Delete"]')[0].dispatchEvent(new CustomEvent('webOSVoice', {detail: {intent: 'Delete', value: 'cat'}}));
		let {intent, value} = e.detail;
		this.showResult('handleVoice>' + intent + ' | ' + value);
		e.preventDefault();
	};

	render () {
		return (
			<Panel>
				<Header title="voice-label" subtitle={this.state.result} />
				<Scroller>
					<Heading>default</Heading>
					<Button onClick={() => this.showResult('handleClicked> 사진')}>사진</Button>
					<Heading>disabled (data-webos-voice-disabled)</Heading>
					<VoiceButton
						data-webos-voice-disabled
						data-webos-voice-intent="Select Delete"
						onVoice={this.handleVoice}
						onClick={() => this.showResult('handleClicked> 사과')}
					>
						사과
					</VoiceButton>
					<Heading>disabled (disabled)</Heading>
					<Button disabled onClick={() => this.showResult('handleClicked> 필터')}>필터</Button>
				</Scroller>
			</Panel>
		);
	}
}

export default DataWebosVoiceDisabled;
