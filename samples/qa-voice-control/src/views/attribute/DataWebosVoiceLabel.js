/* eslint-disable react/jsx-no-bind */
import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import Button from '@enact/sandstone/Button';
import Heading from '@enact/sandstone/Heading';

class DataWebosVoiceLabel extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			result: ''
		};
		this.voiceLabels = JSON.stringify(['호랑이', '고양이']);
	}

	showResult = (msg) => {
		this.setState({result: msg});
		setTimeout(() => (this.setState({result: ''})), 1500);
	};

	render () {
		return (
			<Panel>
				<Header title="voice-label" subtitle={this.state.result} />
				<Scroller>
					<Heading>default | innerHTML</Heading>
					<Button onClick={() => this.showResult('handleClicked> hello')}>필터</Button>
					<Heading>{'override(label) | 사과 -> 바나나)'}</Heading>
					<Button data-webos-voice-label="바나나" onClick={() => this.showResult('handleClicked> 사과 -> 바나나')}>사과</Button>
					<Heading>{'override(labels) | 원숭이 -> 호랑이, 고양이'}</Heading>
					<Button
						data-webos-voice-labels={this.voiceLabels}
						onClick={() => this.showResult('handleClicked> 원숭이 -> 호랑이, 고양이')}
					>
						원숭이
					</Button>
				</Scroller>
			</Panel>
		);
	}
}

export default DataWebosVoiceLabel;
