import Heading from '@enact/sandstone/Heading';
import {Header} from '@enact/sandstone/Panels';
import {Scroller} from '@enact/sandstone/Scroller';
import React from 'react';


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
			<>
				<Header title="voice-checked" subtitle={this.state.result} />
				<Scroller>
					<Heading>Custom Checkbox</Heading>
					<div style={{fontSize: '30px'}}>
						<input
							data-webos-voice-checked={this.state.isChecked}
							data-webos-voice-intent="SelectCheckItem"
							data-webos-voice-label="고양이"
							id="myCheckbox"
							onClick={this.handleClick}
							type="checkbox"
						/>
						고양이
						<br />
					</div>
				</Scroller>
			</>
		);
	}
}

export default DataWebosVoiceChecked;
