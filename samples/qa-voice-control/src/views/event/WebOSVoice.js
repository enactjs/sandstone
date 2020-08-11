import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import {Header} from '@enact/sandstone/Panels';
import {VoiceControlDecorator} from '@enact/webos/speech';
import React from 'react';

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
		setTimeout(() => (this.setState({result: ''})), 1500);
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
			<>
				<Header title="webOSVoice" subtitle={this.state.result} />
				<Heading>Custom Intent | Select PlayContent Delete</Heading>
				<VoiceButton data-webos-voice-intent="Select PlayContent Delete" onVoice={this.handleVoice} onClick={this.handleClick}>hello</VoiceButton>
			</>
		);
	}
}

export default Sample;
