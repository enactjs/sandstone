import {Panel} from '@enact/sandstone/Panels';
import {VoiceControlDecorator} from '@enact/webos/speech';
import React from 'react';

import CommonView from '../../components/CommonView';

const VoicePanel = VoiceControlDecorator(Panel);

class IntentPlayListControl extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: '',
			itemList: ['apple', 'banana', 'orange']
		};
	}

	showResult = (msg) => {
		this.setState({result: msg});
		setTimeout(() => (this.setState({result: ''})), 1500);
	};

	handleVoice = (e) => {
		let direction = e.detail.control;
		this.showResult('handleVoice > ' + direction);
		e.preventDefault();
	};

	render () {
		return (
			<VoicePanel noCloseButton data-webos-voice-intent="PlayListControl" onVoice={this.handleVoice}>
				<CommonView noScroller title="Intent to play list control" subtitle={this.state.result}>
					<div>{'이전 컨텐츠 재생'}</div>
					<div>{'다음 컨텐츠 재생'}</div>
				</CommonView>
			</VoicePanel>
		);
	}
}

export default IntentPlayListControl;
