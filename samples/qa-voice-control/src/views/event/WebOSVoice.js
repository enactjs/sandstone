import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {VoiceControlDecorator} from '@enact/webos/speech';
import React from 'react';

import CommonView from '../../components/CommonView';

const VoiceButton = VoiceControlDecorator(Button);


class Sample extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: ''
		};
	}

	showResult = (msg) => {
		this.setState({result: msg});
	};

	handleClick = () => {
		this.showResult('handleClick> hello');
	};

	handleVoice = (e) => {
		let {intent, value} = e.detail;
		this.showResult('handleVoice > ' + intent + ' | ' + value);
		e.preventDefault();
	};

	render () {
		return (
			<CommonView title="webOSVoice" subtitle={this.state.result}>
				<Heading>Customized Intent | Select PlayContent Delete</Heading>
				<VoiceButton data-webos-voice-intent="Select PlayContent Delete" onVoice={this.handleVoice} onClick={this.handleClick}>hello</VoiceButton>
			</CommonView>
		);
	}
}

export default Sample;
