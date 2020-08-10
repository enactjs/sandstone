import React from 'react';
import {Panel, Header} from '@enact/sandstone/Panels';
import Heading from '@enact/sandstone/Heading';
import Input from '@enact/sandstone/Input';
import Item from '@enact/sandstone/Item';

class UseCaseInput extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			text: ''
		};
	}

	handleChange = (e) => {
		this.setState({
			text: e.value
		});
	};

	render () {
		return (
			<Panel>
				<Header title="Use Case Input" />
				<Heading>주소</Heading>
				<Input
					type="passwordnumber"
					value="ggg"
					placeholder="empty"
					data-webos-voice-intent="Select"
					data-webos-voice-group-label="국가"
					data-webos-voice-label="주소"
					onChange={this.handleChange}
					title="title"
					subtitle="subtitle"
				/>
				<Item>dummy</Item>
			</Panel>
		);
	}
}

export default UseCaseInput;
