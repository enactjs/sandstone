import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {VoiceControlDecorator} from '@enact/webos/speech';
import React from 'react';

import CommonView from '../../components/CommonView';

const VoiceButton = VoiceControlDecorator(Button);

class DataWebosVoiceIntent extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: ''
		};
	}

	updateResult = (msg) => () => {
		this.setState({result: msg});
	};

	handleVoice = (e) => {
		let {intent, value} = e.detail;
		this.updateResult('handleVoice > ' + intent + ' | ' + value);
		e.preventDefault();
	};

	render () {
		return (
			<CommonView title="data-webos-voice-intent" subtitle={this.state.result}>
				<Heading>default | Select</Heading>
				<Button onClick={this.updateResult('Selected > 안녕')}>안녕</Button>
				<Heading>{'override | Select -> Select PlayContent Delete'}</Heading>
				<VoiceButton
					data-webos-voice-intent="Select PlayContent Delete"
					onClick={this.updateResult('Selected > 필터')}
					onVoice={this.handleVoice}
				>
					필터
				</VoiceButton>
			</CommonView>
		);
	}
}

export default DataWebosVoiceIntent;
