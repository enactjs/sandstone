import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';
import React from 'react';

import CommonView from '../../components/CommonView';


class DataWebosVoiceLabel extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: ''
		};
		this.voiceLabels = JSON.stringify(['호랑이', '고양이']);
	}

	updateResult = (msg) => () => {
		this.setState({result: msg});
		setTimeout(() => (this.setState({result: ''})), 1500);
	};

	render () {
		return (
			<CommonView title="data-webos-voice-label" subtitle={this.state.result}>
				<Heading>Default | innerHTML</Heading>
				<Button
					onClick={this.updateResult('hello is clicked')}
				>
					필터
				</Button>
				<Heading>{'Override(label) | 사과 -> 바나나)'}</Heading>
				<Button
					data-webos-voice-label="바나나"
					onClick={this.updateResult('사과 -> 바나나 is clicked')}
				>
					사과
				</Button>
				<Heading>{'Override(labels) | 원숭이 -> 호랑이, 고양이'}</Heading>
				<Button
					data-webos-voice-labels={this.voiceLabels}
					onClick={this.updateResult('원숭이 -> 호랑이, 고양이 is clicked')}
				>
					원숭이
				</Button>
			</CommonView>
		);
	}
}

export default DataWebosVoiceLabel;
