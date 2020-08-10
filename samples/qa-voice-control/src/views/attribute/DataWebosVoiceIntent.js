/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import {VoiceControlDecorator} from '@enact/webos/speech';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';

const VoiceButton = VoiceControlDecorator(Button);

class DataWebosVoiceIntent extends React.Component {
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
		let {intent, value} = e.detail;
		this.showResult('handleVoice> ' + intent + ' | ' + value);
		e.preventDefault();
	};

	render () {
		return (
			<Panel>
				<Header title="voice-intent" subtitle={this.state.result} />
				<Scroller>
					<Heading>default | Select</Heading>
					<Button onClick={() => this.showResult('handleClick>안녕')}>안녕</Button>
					<Heading>{'override | Select -> Select PlayContent Delete'}</Heading>
					<VoiceButton
						data-webos-voice-intent="Select PlayContent Delete"
						onClick={() => this.showResult('handleClick>필터')}
						onVoice={this.handleVoice}
					>
						필터
					</VoiceButton>
				</Scroller>
			</Panel>
		);
	}
}

export default DataWebosVoiceIntent;
