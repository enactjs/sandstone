import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {VoiceControlDecorator} from '@enact/webos/speech';
import React from 'react';

import CommonView from '../../components/CommonView';

const VoiceButton = VoiceControlDecorator(Button);

class DataWebosVoiceDisabled extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: ''
		};
	}

	updateResult = (msg) => () => {
		this.setState({result: msg});
		setTimeout(() => (this.setState({result: ''})), 1500);
	};

	handleVoice = (e) => {
		let {intent, value} = e.detail;
		this.updateResult('handleVoice > ' + intent + ' | ' + value);
		e.preventDefault();
	};

	render () {
		return (
			<CommonView title="data-webos-voice-disabled" subtitle={this.state.result}>
				<Heading>Default</Heading>
				<Button onClick={this.updateResult('사진 is clicked')}>사진</Button>
				<Heading>data-webos-voice-disabled</Heading>
				<VoiceButton
					data-webos-voice-disabled
					data-webos-voice-intent="Select Delete"
					onClick={this.updateResult('사과 is clicked')}
					onVoice={this.handleVoice}
				>
					사과
				</VoiceButton>
				<Heading>Disabled Button</Heading>
				<Button disabled onClick={this.updateResult('필터 is clicked')}>필터</Button>
			</CommonView>
		);
	}
}

export default DataWebosVoiceDisabled;
