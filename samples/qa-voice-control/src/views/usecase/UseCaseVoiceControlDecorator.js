import Item from '@enact/sandstone/Item';
import {VoiceControlDecorator} from '@enact/webos/speech';
import React from 'react';

import CommonView from '../../components/CommonView';

const VoiceDiv = VoiceControlDecorator('div');
const VoiceItem = VoiceControlDecorator(Item);


class UseCaseVoiceControlDecorator extends React.Component {
	handlePlayListControl = (e) => {
		const {intent, control} = e.detail;
		console.log('handlePlayControl > ', intent, control);	// eslint-disable-line no-console
		e.preventDefault();
	};

	handlePlayContent = (e) => {
		const {intent, value} = e.detail;
		console.log('handlePlayContent > ', intent, value);	// eslint-disable-line no-console
		e.preventDefault();
	};

	render () {
		return (
			<CommonView title="Voice Control Decorator">
				<VoiceDiv
					data-webos-voice-intent="PlayListControl"
					onVoice={this.handlePlayListControl}
				/>
				<VoiceItem
					data-webos-voice-intent="Select PlayContent"
					onVoice={this.handlePlayContent}
				>
					The Dark Knight
				</VoiceItem>
			</CommonView>
		);
	}
}

export default UseCaseVoiceControlDecorator;
