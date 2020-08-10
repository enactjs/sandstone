import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import Heading from '@enact/sandstone/Heading';

class DataWebosVoiceChecked extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			isChecked: false
		};
	}

	handleClick = () => {
		let isChecked = document.getElementById('myCheckbox').checked;
		this.setState({
			isChecked: isChecked
		});
	};

	render () {
		return (
			<Panel>
				<Header title="voice-checked" subtitle={this.state.result} />
				<Scroller>
					<Heading>Custom Checkbox</Heading>
					<div style={{fontSize: '30px'}}>
						<input
							id="myCheckbox"
							type="checkbox"
							data-webos-voice-intent="SelectCheckItem"
							data-webos-voice-label="고양이"
							data-webos-voice-checked={this.state.isChecked}
							onClick={this.handleClick}
						/>
						고양이
						<br />
					</div>
				</Scroller>
			</Panel>
		);
	}
}

export default DataWebosVoiceChecked;
