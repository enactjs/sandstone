import Item from '@enact/sandstone/Item';
import Repeater from '@enact/ui/Repeater';
import {VoiceControlDecorator} from '@enact/webos/speech';
import React from 'react';

import CommonView from '../../components/CommonView';


const VoiceItem = VoiceControlDecorator(Item);

class IntentPlayContent extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: '',
			itemList: ['스파이더맨', '영화', '사진']
		};
	}

	showResult = (msg) => {
		this.setState({result: msg});
	};

	handleVoice = (e) => {
		let {index} = e.currentTarget.dataset;
		let {intent, value} = e.detail;
		this.showResult('handleVoice > ' + index + ' | ' + intent + ' | ' + value);
		e.preventDefault();
	};

	render () {
		return (
			<CommonView title="Intent to play content" subtitle={this.state.result}>
				<Repeater
					childComponent={VoiceItem}
					itemProps={{
						'data-webos-voice-intent': 'Select PlayContent',
						onVoice: this.handleVoice
					}}
				>
					{this.state.itemList}
				</Repeater>
			</CommonView>
		);
	}
}

export default IntentPlayContent;
