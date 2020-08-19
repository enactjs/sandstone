import Heading from '@enact/sandstone/Heading';
import React from 'react';

import CommonView from '../../components/CommonView';


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
		const {isChecked} = this.state;
		return (
			<CommonView title="data-webos-voice-checked">
				<Heading>Customized Checkbox</Heading>
				<input
					data-webos-voice-checked={isChecked}
					data-webos-voice-intent="SelectCheckItem"
					data-webos-voice-label="고양이"
					id="myCheckbox"
					onClick={this.handleClick}
					type="checkbox"
				/>
				고양이
			</CommonView>
		);
	}
}

export default DataWebosVoiceChecked;
